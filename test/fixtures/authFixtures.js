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

export const initialStateJournal = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const activeStateJournal = {
    isSaving: false,
    messageSaved: '',
    notes: [ 
        {id: 'ABC123', title: 'Note 1', body: 'Content note 1', imagenUrls: [] /*https://foto.jpg, https://foto.jpg, https://foto3.jpg*/},
        {id: 'ABC124', title: 'Note 2', body: 'Content note 2', imagenUrls: [] /*https://foto.jpg, https://foto.jpg, https://foto3.jpg*/}
    ],
    active: {id: 'ABC123', title: 'Note 1', body: 'Content note 1', imagenUrls: [] },
}

export const newNote = {
        id: 'ABC123',
        title: 'Note 1',
        body: 'Content note 1',
        imagenUrls: [] //https://foto.jpg, https://foto.jpg, https://foto3.jpg
    };

export const updatedNote = {
        id: 'ABC123',
        title: 'Note 1',
        body: 'Content note 1 and more .........',
        imagenUrls: [] //https://foto.jpg, https://foto.jpg, https://foto3.jpg
    }

export const notes = [
    {
        id: 'ABC123', title: 'Note 1', body: 'Content note 1', imagenUrls: [] //https://foto.jpg, https://foto.jpg, https://foto3.jpg
    },
    {
        id: 'ABC124', title: 'Note 2', body: 'Content note 2', imagenUrls: [] //https://foto.jpg, https://foto.jpg, https://foto3.jpg
    }
]