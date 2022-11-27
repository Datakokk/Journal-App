import { addNewEmptyNote, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, updateNote } from "../../../src/store/journal/journalSlice"
import { initialStateJournal, newNote, activeStateJournal, notes, updatedNote } from "../../fixtures/authFixtures"

describe('Test on journalSlice', () => { 

    test('should return the state initial and be called "journal"', () => { 

        const state = journalSlice.reducer( initialStateJournal, {} );

        expect( state ).toBe( initialStateJournal );
        expect( journalSlice.name ).toBe( 'journal');
        
     });

     test('should change the isSaving', () => {

        const state = journalSlice.reducer( initialStateJournal, savingNewNote() );
        
        expect( state.isSaving ).toBeTruthy();
    });
    
    test('should perform addNewEmptyNote()', () => { 
        
        const state = journalSlice.reducer( initialStateJournal, addNewEmptyNote( newNote ) );

        expect( state.notes.length ).toBeGreaterThanOrEqual( 1 );
    });

    test('should perform setActiveNote()', () => { 
        
        const state = journalSlice.reducer( initialStateJournal, setActiveNote( newNote ) );
        
        expect( state.active ).not.toBeNull()
    });
    
    test('should perform setNotes()', () => { 
        
        const state = journalSlice.reducer( initialStateJournal, setNotes( notes ) );
        
        expect( state.notes.length ).toBeGreaterThanOrEqual( 1 );
    });

    test('should perform updateNote()', () => { 
        
        const state = journalSlice.reducer( activeStateJournal, updateNote( updatedNote ) );

        expect( state.messageSaved ).toBe('Note 1 has been updated')
    
    });
    
    test('should perform setPhotosToActiveNote()', () => { 
        
        const photosUrls = [ 'https://foto.jpg', 'https://foto2.jpg', 'https://foto3.jpg'];

        const state = journalSlice.reducer( activeStateJournal, setPhotosToActiveNote( photosUrls ) );

        expect( state.active.imagenUrls.length ).toBeGreaterThanOrEqual( 1 );
    });

    test('should perform deleteNoteById()', () => { 
        

        const state = journalSlice.reducer( activeStateJournal, {} );
        const noteId = state.notes[0].id;
        
        const deleteNoteState = journalSlice.reducer( activeStateJournal, deleteNoteById( noteId ) );
        
        expect( deleteNoteState.notes.length ).toBe( 1 );
    });
})



