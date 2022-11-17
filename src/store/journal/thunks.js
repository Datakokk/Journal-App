import { async } from "@firebase/util"
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";

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