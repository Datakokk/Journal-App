import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'datakokk-courses',
    api_key: '281615675349953',
    api_secret: 'l5x1CNmX2YwTdYcPQgoinRvjyhc',
    secure: true
});

describe('Test on fileUpload', () => { 

    test('must upload the file correctly to cloudinary', async() => { 

        const imgUrl = 'https://cdn.theculturetrip.com/wp-content/uploads/2021/05/jm2bjk-e1621441104862-768x431.jpg';
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'photo.jpg' );

        const url = await fileUpload( file );
        expect( typeof url ).toBe( 'string');

        const segments = url.split('/');
        const imageId = segments[ segments.length-1].replace('.jpg','');
    
        const cloudResp = await cloudinary.api.delete_resources([`journal/${ imageId }`], {
            resource_type: 'image'
        })

        // console.log(cloudResp)
     });

     test('must return null', async() => { 

        const file = new File([], 'something.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'object');
        expect( url ).toBe( null );
      })
 })