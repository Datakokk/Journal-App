import { loginWithEmailPassword, logoutFirebas, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal";
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

        const result = await registerUserWithEmailPassword({ email, password, displayName });

        if( displayName==='' || !result.ok ) return dispatch( logout( result.errorMessage2 ));

        dispatch( login( result ));
    }
};

export const startLoginWithEmailPassword = ({ email, password }) => async( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await loginWithEmailPassword({ email, password })

    if( !result.ok ) return dispatch( logout( result ));

    dispatch( login( result ))
};

export const startLogout = () => async( dispatch) => {

    await logoutFirebas();

    dispatch( clearNotesLogout() );
    dispatch( logout() );

}