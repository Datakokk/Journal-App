import { authSlice, checkingCredentials, clearDeleteMessage, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Test on the authSlice', () => {

    test('must retunr the state initial and be called "auth"', () => {

        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');

    });

    test('must authenticate', () => {

        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    });

    test('must perform logout() without arguments', () => {

        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });

    test('must perform logout() and display an error message', () => {

        const errorMessage2 = 'Incorrect credentials';


        const state = authSlice.reducer(authenticatedState, logout({ errorMessage2 }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Incorrect credentials'
        })
    });

    test('must change the checking status', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')
    });

    test('must to clean the errorMessage', () => {

        const state = authSlice.reducer( notAuthenticatedState, clearDeleteMessage() );
        expect( state.errorMessage ).toBe( null );
    })
})
