import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try{

        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        
    }catch( error ){
        const errorCode = error.code;
        const errorMessage2 = error.message;
        

        return {
            ok: false,
            errorMessage2
        }
    }
};

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
             
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        console.log(resp)
        // TODO: actualizar el displayName en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        const errorMessage2 = error.message;

        return {
            ok: false,
            errorMessage2
        }
    }
};

export const loginWithEmailPassword = async({ email, password } ) => {

    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        console.log(resp.user)

        return{
            ok: true,
            resp
        }
        
    } catch (error) {

        return {
            ok: false,
            errorMessage2: 'no esta entrando',
        }
    }

    //  !signInWithEmailAndPassword

}

