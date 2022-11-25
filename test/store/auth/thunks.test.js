import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebas, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Test on AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('must invoke the checkingCredentials', async () => {

        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn should be call checkingCredentials and login - success', async () => {

        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    test('startGoogleSignIn should be call checkingCredentials and logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'A Google error' };
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenLastCalledWith(logout(loginData));
    });

    test('startLoginWithEmailPassword should be call checkingCredentials and login - success', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: 123456 };

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    test('startLoginWithEmailPassword should be call checkingCredentials and logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'Authentication error' };
        const formData = { email: demoUser.email, password: 123456 };

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));

    });

    test('startCreatingUserWithEmailPassword should be call checkingCredentials and login - success', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, displayName: demoUser.displayName, password: 123456 };

        await registerUserWithEmailPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startCreatingUserWithEmailPassword should be call checkingCredentials and logout - error', async () => {

        const loginData = { ok: false, errorMessage2: 'An error has occurred'};
        const formData = { email: demoUser.email, displayName: demoUser.displayName, password: 123456 };
        console.log(loginData)

        await registerUserWithEmailPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage2 ));

    });

    test('startLogout should be call logoutFirebase, clearNotes and logout', async() => { 

        await startLogout()( dispatch );

        expect( logoutFirebas ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        
    })
});