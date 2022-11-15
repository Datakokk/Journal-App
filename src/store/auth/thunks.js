import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    }
};

export const startGoogleSignIn = () => async( dispatch ) => {
    dispatch( checkingCredentials() )

    const result = await singInWithGoogle();
    
    if( !result.ok ) return dispatch( logout( result ))

    dispatch( login( result ))
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { uid, ok, photoURL, errorMessage2 } = await registerUserWithEmailPassword({ email, password, displayName });

        if( displayName==='' || !ok ) return dispatch( logout({ errorMessage2 }));

        dispatch( login( { uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await loginWithEmailPassword({ email, password })

    if( !result.ok ) return dispatch( logout( result ));

    dispatch( login( result ))
}