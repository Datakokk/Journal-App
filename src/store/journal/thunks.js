import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
       
        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imagenUrls: []
        };

        // const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
        // const setDocResp = await setDoc( newDoc, newNote );
        const newDoc = await addDoc( collection( FirebaseDB, `${ uid }/journal/notes`), newNote );

        newNote.id = newDoc.id;

        dispatch ( addNewEmptyNote( newNote ) );
        dispatch ( setActiveNote( newNote ) );
    }
};

export const startLoadingNotes = () => async ( dispatch, getState ) => {

    const { uid } = getState().auth;
    if( !uid ) throw new Error("The user UID doesn't exist");

    const result = await loadNotes( uid );

    dispatch( setNotes(result))
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

    dispatch( setSaving() );

    const { uid } = getState().auth;
    const { active: note} = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    
    // const docRef = doc(  FirebaseDB, `${ uid }/journal/notes/${ note.id}`);
    // await setDoc( docRef, noteToFireStore, { merge: true });
    const docRef = doc(FirebaseDB, uid, 'journal', 'notes', note.id)
    await setDoc( docRef, noteToFireStore, { merge: true });
        
    console.log(note)
    dispatch( updateNote( note ))
    }
}
