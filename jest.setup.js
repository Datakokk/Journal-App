import 'whatwg-fetch'; // <-- yarn add whatwg-fetch-> comentario
import 'setimmediate';

require('dotenv').config({ 
    path: '.env.test'
})

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })

}))