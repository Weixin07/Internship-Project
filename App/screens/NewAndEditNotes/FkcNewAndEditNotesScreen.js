import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import {useNewAndEditNotes} from './useFkcNewAndEditNotesScreen';
import {translationString} from '../../assets/translation/Translation';
import moment from 'moment';

export default ({route, navigation}) => {
  const {noteDetails, getNoteDetails, addNewNote, setNoteInputText, goToPreviousDay, goToNextDay} = useNewAndEditNotes(route, navigation);

  useEffect(() => {
    getNoteDetails();
  }, [])

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.box}>
        <Text style={styles.date}>{moment(noteDetails.noteDateTime).format('dddd, DD MMMM YYYY')}</Text>

        <TextInput
          style={styles.name}
          autoCorrect={false}
          multiline={true}
          textAlignVertical="top"
          placeholder={translationString.composePlaceHolder}
          defaultValue={noteDetails.noteText}
          onChangeText={text => setNoteInputText(text)}
          onEndEditing={() => addNewNote()}
        />
      </View>

      <View style={styles.scrollDate}>
        <TouchableOpacity style={styles.previousDateButton} activeOpacity={1} onPress={goToPreviousDay}>
          <Text style={styles.buttonText}> ❮ </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextDateButton} activeOpacity={1} onPress={goToNextDay}>
          <Text style={styles.buttonText}> ❯ </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  entire: {
    backgroundColor: 'white',
    flex: 1,
  },
  box: {
    marginTop: '10%',
    marginHorizontal: '10%',
    flex: 6,
  },
  date: {
    fontSize: 24,
  },
  name: {
    fontSize: 18,
    color: 'rgb(144,144,144)',
    marginTop: '2%',
  },
  scrollDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
  },
  previousDateButton: {
    height: 46,
    width: 46,
    borderRadius: 100,
    backgroundColor: 'rgb(57,142,235)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextDateButton: {
    height: 46,
    width: 46,
    borderRadius: 100,
    backgroundColor: 'rgb(57,142,235)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
