import { singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn } from "../../../src/store/auth/thunks";
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
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ))
    });
    
    test('startGoogleSignIn should be call checkingCredentials and logout - error', async () => {
        
        const loginData = { ok: false, errorMessage: 'A Google error' };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        await startGoogleSignIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenLastCalledWith( logout( loginData ));
    })
})