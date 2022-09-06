import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {useFkcSettings} from './useFkcSettingsScreen';
import {translationString} from '../../assets/translation/Translation';
import rightArrow from '../../assets/image/arrow_right.png';
import {getSavedSettings} from '../../database/SettingsSchema';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default ({route, navigation}) => {
  const {settings, getSettings, showTimePicker, hideTimePicker, timePickerIsShow, setTimePickerIsShow, updateCountingStartTime, saveSoundSettings, saveReminderSettings, clearHistory} = useFkcSettings(route, navigation);

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SafeAreaView>
      {/* Will set up SectionList in next PR */}
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>{translationString.soundTitle}</Text>

            <Switch
              style={styles.switch}
              trackColor={{false: '#929292', true: '#FFAF33'}}
              thumbColor={{false: 'DAD7D7', true: '#FF8333'}}
              value={settings.soundIsOn}
              onValueChange={saveSoundSettings}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.title}>{translationString.reminderTitle}</Text>

            <Switch
              style={styles.switch}
              trackColor={{false: '#929292', true: '#FFAF33'}}
              thumbColor={{false: 'DAD7D7', true: '#FF8333'}}
              value={settings.reminderIsOn}
              onValueChange={saveReminderSettings}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.displayTimeTitle}>
              {translationString.timetoStartCountTitle}
            </Text>

            <TouchableOpacity
              style={styles.displayTimeButton}
              onPress={showTimePicker}>
              <Text style={styles.displayTimeButtonText}>
                {moment(settings.countingStartTime).format('hh:mm a')}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={timePickerIsShow}
              mode="time"
              date={settings.countingStartTime}
              onConfirm={updateCountingStartTime}
              onCancel={hideTimePicker}
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.title}>{translationString.shareTitle}</Text>

              <Image source={rightArrow} style={styles.arrow}></Image>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translationString.feedbackTitle}
              </Text>

              <Image source={rightArrow} style={styles.arrow}></Image>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.title}>{translationString.reviewTitle}</Text>

              <Image source={rightArrow} style={styles.arrow}></Image>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translationString.printEmailTitle}
              </Text>

              <Image source={rightArrow} style={styles.arrow}></Image>
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />
        </View>

        <View style={[styles.section, {backgroundColor: 'transparent'}]}>
          <TouchableOpacity activeOpacity={1} style={styles.clearButton} onPress={clearHistory}>
            <Text style={styles.buttonText}>
              {translationString.clearHistoryTitle}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimerSpace}>
          <Text style={styles.disclaimerTitle}>
            {translationString.disclaimerTitle}
          </Text>

          <Text style={styles.disclaimerText}>
            {Platform.OS === 'ios'
              ? translationString.disclaimerDescText
              : translationString.androidDisclaimerText}
          </Text>

          <View style={styles.versionRow}>
            <Text style={styles.versionText}>
              {translationString.versionText}
            </Text>

            <Text style={styles.copyrightText}>
              {translationString.copyrightTitle}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  switch: {},
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 22,
    marginLeft: 5,
  },
  section: {
    marginTop: 30,
    backgroundColor: 'white',
  },
  displayTimeTitle: {
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 5,
  },
  displayTimeButton: {
    marginTop: 23,
    marginLeft: 5,
  },
  displayTimeButtonText: {
    color: 'blue',
    fontSize: 20,
  },
  arrow: {
    marginTop: 6,
    height: '60%',
    width: '2%',
  },
  clearButton: {
    //marginTop: 10,
    marginHorizontal: '25%',
    paddingVertical: 17,
    borderRadius: 25,
    backgroundColor: 'rgb(241,59,63)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  disclaimerSpace: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  disclaimerTitle: {
    marginBottom: 22,
    fontWeight: 'bold',
  },
  disclaimerText: {
    color: 'rgb(154,154,154)',
    fontSize: 16,
    marginBottom: 20,
  },
  versionText: {
    color: 'rgb(138,138,138)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionRow: {
    flexDirection: 'row',
    marginBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  copyrightText: {
    marginRight: 20,
    color: 'rgb(138,138,138)',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
