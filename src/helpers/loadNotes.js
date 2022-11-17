import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid ) => {

    if( !uid ) throw new Error("The user UID doesn't exist");

    const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    const notes = [];
    docs.forEach( doc => notes.push({id: uid, ...doc.data()}));

    return notes;
}