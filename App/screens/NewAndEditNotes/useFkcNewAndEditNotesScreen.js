import { constants } from 'fsevents';
import moment from 'moment';
import React, {useState} from 'react';
import { Alert } from 'react-native';
import { getNoteDetailsWithId, insertNewNote, noteDoesExist, NoteSchema, updateNoteWithId } from '../../database/NotesSchema';
import { getPrimaryKeyFromDate } from '../../helper/GeneralHelper';

export const useNewAndEditNotes = (route, navigation) => {
  const [noteDetails, setNoteDetails] = useState({
    id: 0,
    noteDateTime: new Date(),
    noteText: ''
  });

  const [noteInputText, setNoteInputText] = useState('');
  var selectedNoteId = route.params.noteId;

  const getNoteDetails = () => {
    if (noteDoesExist(selectedNoteId)) {
      const noteDetailObject = getNoteDetailsWithId(selectedNoteId);
      setNoteDetails(noteDetailObject);
    }
    else {
      var today = new Date();

      const defaultNoteDetail = Object.create(NoteSchema);
      defaultNoteDetail.id = getPrimaryKeyFromDate(today);
      defaultNoteDetail.noteDateTime= today;
      defaultNoteDetail.noteText = '';

      setNoteDetails(defaultNoteDetail);
    }
  };

  const addNewNote = () => {
    let primaryKey = getPrimaryKeyFromDate(noteDetails.noteDateTime);
    if (noteDoesExist(primaryKey)) {
      updateNoteWithId(primaryKey, noteInputText);
    }
    else {
      insertNewNote(noteDetails.noteDateTime, noteInputText);
    }
  };

  const goToPreviousDay = () => {
    var currentSelectedDay = noteDetails.noteDateTime;
    currentSelectedDay.setDate(currentSelectedDay.getDate() - 1);

    switchToDay(currentSelectedDay);
  };

  const goToNextDay = () => {
    var currentSelectedDay = noteDetails.noteDateTime;

    var today = new Date();
    if ((currentSelectedDay.getDate() == today.getDate()) && (currentSelectedDay.getMonth() == today.getMonth()) && (currentSelectedDay.getFullYear() == today.getFullYear())) {
      return;
    }

    currentSelectedDay.setDate(currentSelectedDay.getDate() + 1);
    switchToDay(currentSelectedDay);
  };

  const switchToDay = day => {
    if (noteDoesExist(getPrimaryKeyFromDate(day))) {
      const noteDetailObject = getNoteDetailsWithId(getPrimaryKeyFromDate(day));
      setNoteDetails(noteDetailObject);
    }
    else {
      const defaultNoteDetail = Object.create(NoteSchema);
      defaultNoteDetail.id = getPrimaryKeyFromDate(day);
      defaultNoteDetail.noteDateTime= day;
      defaultNoteDetail.noteText = '';

      setNoteDetails(defaultNoteDetail);
    }
  };

  return {
    noteDetails,
    getNoteDetails,
    addNewNote,
    setNoteInputText,
    goToPreviousDay,
    goToNextDay,
  };
};
