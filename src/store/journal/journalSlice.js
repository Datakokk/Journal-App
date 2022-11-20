import { Http, Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
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
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        }, 
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        }, 
        updateNote: ( state, action ) => {
            state.isSaving = false;
            
            state.notes = state.notes.map( note => 
                (note.id === action.payload.id)
                ? action.payload
                : note
            );

            state.messageSaved = `${ action.payload.title} has been updated`;
        },
        setPhotosToActiveNote: (state, action ) => {
            state.active.imagenUrls = [ ...state.active.imagenUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: ( state )=>{
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = []
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            state.notes = state.notes.filter( note => 
                note.id !== action.payload    
            );
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
 } = journalSlice.actions;