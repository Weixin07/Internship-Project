import moment from 'moment';
import React, {Component, useEffect} from 'react';
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNotes} from './useFkcNotesScreen';

export default ({route, navigation}) => {
  const {notesList, getAllNotesList, navigateToNoteDetails} = useNotes(route, navigation);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllNotesList();
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{paddingBottom: 20}}
        data={notesList}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={styles.notes}
            onPress={() => navigateToNoteDetails(item.id)}
          >
            <Text style={styles.date}>{moment(item.noteDateTime).format('dddd, DD MMMM YYYY')}</Text>
            <Text style={styles.name}>{item.noteText}</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  date: {
    fontSize: 20,
    marginTop: 14,
  },
  name: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 14,
    color: 'rgb(163,163,163)',
  },
  notes: {
    marginHorizontal: 10,
  },
});
