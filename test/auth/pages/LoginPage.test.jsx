import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { checkingAuthentication, startLoginWithEmailPassword } from "../../../src/store/auth/thunks"

const mockCheckingAuthentication = jest.fn();
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    checkingAuthentication: () => mockCheckingAuthentication,
    startLoginWithEmailPassword: ( { email, password } ) => () => mockStartLoginWithEmailPassword( { email, password } )
}));

jest.mock('react-redux', () =>({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState,
    }
})

describe('Test on <LoginPage />', () => { 

    beforeEach( () => jest.clearAllMocks());

    test('should display the component correctly', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual( 1 );
     });

     test('google button should call the startGoogleSignIn', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );

        expect( mockCheckingAuthentication ).toHaveBeenCalled();
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

      });

      test('submit should call startLoginWithEmailPassword', () => { 

        const email = 'carlos@carlos.com';
        const password = '222222';
            
        render( 
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Email'});
        fireEvent.change( emailField, { target: { name: 'email', value: email}});

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password }});

        const loginForm = screen.getByLabelText( 'submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password,
        });
        
       })
 })