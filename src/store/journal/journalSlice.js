import { Http } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: 1234567,
        //     imagenUrls: [] https://foto.jpg, https://foto.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        addNewEmptyNote: ( state, action ) => {

        }, 
        setActiveNote: ( state, action ) => {

        },
        setNotes: ( state, action ) => {

        },
        setSaving: ( state ) => {

        }, 
        updateNote: ( state, action ) => {

        },
        deleteNodeById: ( state, action ) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNodeById,
 } = journalSlice.actions;