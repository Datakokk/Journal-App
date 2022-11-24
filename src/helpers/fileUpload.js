
export const fileUpload = async( file ) => {

    // if( !file ) throw new Error('There is not file to upload');
    if( !file ) return null;

    const cloudURL = `https://api.cloudinary.com/v1_1/datakokk-courses/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');

    try {
        
        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData
        })

        if( !resp.ok ) throw new Error("The image can't be uploaded");

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

        
    } catch (error) {
        // console.log(error);
        // throw new Error( error.message );
        return null;
    }


}
