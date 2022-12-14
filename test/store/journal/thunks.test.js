import { async } from "@firebase/util";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, updateNote } from "../../../src/store/journal/journalSlice";
import { startLoadingNotes, startNewNote, startSaveNote } from "../../../src/store/journal/thunks"
import { newNote } from "../../fixtures/authFixtures";


describe('Tests on Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('starNewNote should create a new empty note', async () => {

        const uid = 'Test-uid';
        getState.mockReturnValue({ auth: { uid } });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            imagenUrls: [],
            date: expect.any(Number),
            id: expect.any(String)
        }))

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            imagenUrls: [],
            date: expect.any(Number),
            id: expect.any(String)
        }))

        // Delete from Firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises)

    });

    test('startLoadingNotes should loading notes', async () => {

        const uid = 'Test-uid';
        getState.mockReturnValue({ auth: { uid } });
        
        await startLoadingNotes()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(setNotes([]))
    });


    // test('startSaveNote should save notes', async() => {

    //     const uid = 'Test-uid';
        
    //     getState.mockReturnValue({ auth: { uid } });
    //     getState.mockReturnValue({ journal: { newNote } });

    //     // await startSaveNote()( dispatch, getState );

    //     //expect(dispatch).toHaveBeenCalledWith(updateNote())

    // });
})