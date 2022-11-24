export const initialState = {
    status: 'checking', //'not-authenticated', 'authenticated', 'checking'
    uid: null, 
    email: null, 
    displayName: null, 
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', //'not-authenticated', 'authenticated', 'checking'
    uid: '123456', 
    email: 'demo@demo.com', 
    displayName: 'Demo User', 
    photoURL: 'https://demo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated ', //'not-authenticated', 'authenticated', 'checking'
    uid: null, 
    email: null, 
    displayName: null, 
    photoURL: null,
    errorMessage: 'Incorrect credentials'
}

export const demoUser = {
    uid: 'ABC123', 
    email: 'demo@demo.com', 
    displayName: 'Demo User', 
    photoURL: 'https://demo.jpg',
}