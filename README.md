# Journal App
## MUI Materia UI
Use of own functions of Material UI

## Redux applied in our project
## Firebase
https://firebase.google.com/?gclid=EAIaIQobChMIy7eHuPaw-wIVa0WRBR1PKgeQEAAYASAAEgK7jPD_BwE&gclsrc=aw.ds

import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"

## FireStore
 Lite: https://firebase.google.com/docs/firestore/solutions/firestore-lite

## Redux Devtools
## Thunk
## Form
## Google SingIn
## Asynchronous actions
## Maintain authentication state
## Sweetalert2.github.io
    https://sweetalert2.github.io/#download

    import 'sweetalert2/dist/sweetalert2.css'
## Cloudinary
    https://cloudinary.com/documentation/image_upload_api_reference   

## Jest
### 1.- Installation:
    React + Vite proyects

	yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react 
	yarn add --dev @testing-library/react @types/jest jest-environment-jsdom 

### 2.- Optional: If we use Fetch API in the project:
	yarn add --dev whatwg-fetch

### 3.- Update package.json scripts

	"scripts: {
	  ...
	  "test": "jest --watchAll"

### 4.- Create babel configuration:
    We create a file in the root of the project "babel.config.js" and paste the below

    module.exports = {
    	    presets: [
    		[ '@babel/preset-env', { targets: { esmodules: true } } ],
    		[ '@babel/preset-react', { runtime: 'automatic' } ],
    	    ],
    	};

### 5.- Optional, but eventually necessary, create Jest config and setup config:
    We create two files in the root of the project and they are:

    1)jest.config.js:
    --------------
	module.exports = {
	    testEnvironment: 'jest-environment-jsdom',
	    setupFiles: ['./jest.setup.js']
	}

    2)jest.setup.js:
    -------------
    // In case you need the FetchAPI implementation
    	import 'whatwg-fetch'; // <-- yarn add whatwg-fetch-> comment
    	
