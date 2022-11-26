import { addNewEmptyNote, journalSlice, savingNewNote, setActiveNote, setNotes } from "../../../src/store/journal/journalSlice"
import { initialStateJournal, newNote, notes } from "../../fixtures/authFixtures"

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


})



