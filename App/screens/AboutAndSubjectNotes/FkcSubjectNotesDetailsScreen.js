import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import {translationString} from '../../assets/translation/Translation';

 export default () => {
  return (
  <SafeAreaView>

        <Text style = {styles.content}>{translationString.helpText}</Text>

  </SafeAreaView>
);
  };

const styles = StyleSheet.create({
  content: {
    fontSize: 20,
    marginVertical: 22,
    marginHorizontal: 22,
  },
});
