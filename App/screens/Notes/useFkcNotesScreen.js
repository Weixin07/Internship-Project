import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import addIcon from '../../assets/image/add_btn_active.png';
import { getNotesList } from '../../database/NotesSchema';
import { getPrimaryKeyFromDate } from '../../helper/GeneralHelper';

export const useNotes = (route, navigation) => {
  const [notesList, setNotesList] = useState([]);

  //Will set up db in next PR

  const getAllNotesList = () => {
    setNotesList(getNotesList);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.addNotesButton}
          onPress={() => {
            var today = new Date();
            navigateToNoteDetails(getPrimaryKeyFromDate(today));
          }}>
          <Image source={addIcon} style={{tintColor: 'rgb(242,242,242)'}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, notesList]);

  const navigateToNoteDetails = id => {
    navigation.navigate('NewAndEditNotes', {
      noteId: id,
    });
  }

  return {
    notesList,
    getAllNotesList,
    navigateToNoteDetails,
  };
};

const styles = StyleSheet.create({
  addNotesButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
