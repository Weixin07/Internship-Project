import Realm from 'realm';
import { getPrimaryKeyFromDate } from '../helper/GeneralHelper';
import { HISTORY_SCHEMA } from './HistorySchema';
export const NOTE_SCHEMA = "Note";

//Define models and their properties
export const NoteSchema = {
    name: NOTE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        noteDateTime: 'date',
        noteText: 'string',
    }
};

const realm = new Realm ({
    path: NOTE_SCHEMA,
    schema: [NoteSchema],
});

export const noteDoesExist = id => {
    return !(realm.objectForPrimaryKey(NOTE_SCHEMA, id) == null)
}

export const getNotesList = () => {
    try {
        const noteList = realm.objects(NOTE_SCHEMA);

        return noteList.sorted("noteDateTime", true);
    } catch(error) {
        console.error(error.message);
    }
}

export const insertNewNote = (date, noteText) => {
    try {
        let newNote;
        realm.write(() => {
            newNote = realm.create(NOTE_SCHEMA, {id: getPrimaryKeyFromDate(date), noteDateTime: date, noteText: noteText});
        });
    } catch(error) {
        console.error(error.message);
    }
}

export const getNoteDetailsWithId = id => {
    try {
        return realm.objectForPrimaryKey(NOTE_SCHEMA, id);
    } catch(error) {
        console.error(error.message);
    }
}

export const updateNoteWithId = (id, note) => {
    try {
        realm.write(() => {
            const selectedNote = realm.objectForPrimaryKey(NOTE_SCHEMA, id);
            selectedNote.noteText = note;
        });
    } catch(error) {
        console.error(error.message);
    }
}

export const deleteNoteWithId = id => {
    try {
        realm.write(() => {
            const selectedNote = realm.objectForPrimaryKey(NOTE_SCHEMA, id);

            realm.delete(selectedNote);

            selectedNote = null;
        })

    } catch(error) {
        console.error(error.message);
    }
}