import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import {useFkcAbout} from './useFkcAboutScreen'
import {translationString} from '../../assets/translation/Translation';
import rightArrow from '../../assets/image/arrow_right.png';
import mpcAppIcon from '../../assets/image/pregApp.png';
import mmdAppIcon from '../../assets/image/mmd.png';

 export default ({route, navigation}) => {
  const { 
    pregAppOnPressed,
    mmdOnPressed
  } = useFkcAbout(route, navigation);

  return (
  <SafeAreaView style = {styles.entire}>
    <View>

      <TouchableOpacity activeOpacity = {0.5}
        onPress={() => {
        navigation.navigate('AboutDetails');}}
      >
        <View style = {styles.row}>
          <Text style={styles.title}>
            {translationString.aboutTitle}
          </Text>
          <Image
            source = {rightArrow}
            style = {styles.arrow}>
          </Image>
        </View>
      </TouchableOpacity>

      <View style={styles.separator} />


      <TouchableOpacity activeOpacity = {0.5}
        onPress={() => {
        navigation.navigate('SubjectNotesDetails');}}
      >
        <View style = {styles.row}>
          <Text style={styles.title}>
            {translationString.subNotesTitle}
          </Text>
          <Image
            source = {rightArrow}
            style = {styles.arrow}>
          </Image>
        </View>
      </TouchableOpacity>


      <View style={styles.separator} />

      <View style = {styles.otherAppRow}>
        <Text style = {styles.otherAppTitle}>{translationString.otherAppTitle}</Text>
      </View>

      <View>
        
        <TouchableOpacity activeOpacity = {0.5}
          onPress={() => pregAppOnPressed()}
        >
          <View style = {styles.row}>
            <Image
              source = {mpcAppIcon}
              style = {styles.otherAppPicture}>
            </Image>
            <Text style={styles.title}>
              {translationString.pregCalAppTitle}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />
        
        <TouchableOpacity activeOpacity = {0.5}
          onPress={() => mmdOnPressed()}
        >
          <View style = {styles.row}>
            <Image
              source = {mmdAppIcon}
              style = {styles.otherAppPicture}>
            </Image>
            <Text style={styles.title}>
              {translationString.mmdAppTItle}
            </Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.separator} />

      </View>

    </View>
  </SafeAreaView>
);
  };

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginVertical: 20,
    marginLeft: 20,
    flex: 1,
  },
row: {
  flexDirection: 'row',
  backgroundColor: 'white',
},
arrow: {
  marginTop: 26,
  marginRight: 30,
  height: '30%',
  width: '2%',
},
separator: {
  borderBottomColor: '#737373',
  borderBottomWidth: StyleSheet.hairlineWidth,
},
otherAppRow: {
  flexDirection: 'row',
  backgroundColor: 'rgb(242,242,242)',
},
otherAppPicture: {
  height: 40,
  width: 40,
  resizeMode: 'contain',
  marginVertical: 15,
  marginLeft: 20,
},
entire: {
  backgroundColor: 'white',
  flex: 1,
},
otherAppTitle: {
  fontSize: 24,
  marginVertical: 20,
  marginLeft: 20,
  flex: 1,
  color: 'rgb(149,149,149)',
},
});

