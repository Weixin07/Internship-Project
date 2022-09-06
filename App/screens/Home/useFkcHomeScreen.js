import {useState, useEffect} from 'react';
import moment from 'moment';
import {
  getHistoryDetailById,
  HistorySchema,
  insertNewHistory,
  updateHistoryDetailById,
  resetHistoryDetailById,
} from '../../database/HistorySchema';
import {Alert} from 'react-native';
import {translationString} from '../../assets/translation/Translation';
import {getPrimaryKeyFromDate} from '../../helper/GeneralHelper';
import {
  getSavedSettings,
  setDetaultSettings,
  updateMonitoringSettings,
} from '../../database/SettingsSchema';
import Sound from 'react-native-sound';
import {useIsFocused} from '@react-navigation/core';

export const useFkcHomeScreen = (route, navigation) => {
  const [currentDate, setCurrentDate] = useState('');
  const [lastPressedTime, setLastPressedTime] = useState('');
  const [viewPressHeight, setViewPressHeight] = useState(0);
  const [viewPressWidth, setViewPressWidth] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const [kickCount, setKickCount] = useState('');
  const [userSettings, setUserSettings] = useState({
    id: '',
    soundIsOn: false,
    reminderIsOn: false,
    countingStartTime: Date(),
    monitoringIsOn: false,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    var today = new Date();
    var completeDate = getPrimaryKeyFromDate(today);
    var checkID = getHistoryDetailById(completeDate);

    setDetaultSettings();
    setUserSettings(getSavedSettings());
    setSwitchValue(getSavedSettings().monitoringIsOn);

    if (checkID != null) {
      const kickCounts = String(
        getHistoryDetailById(completeDate).numberOfKicks,
      );
      setKickCount(kickCounts);

      const lastKickTime = String(
        getHistoryDetailById(completeDate).lastKickedTime,
      );
      setLastPressedTime(lastKickTime);
    } else {
      today.setHours(getSavedSettings().countingStartTime.getHours());
      today.setMinutes(getSavedSettings().countingStartTime.getMinutes());

      let startTime = moment(getSavedSettings().countingStartTime).format(
        'hh:mm a',
      );
      let endTime = moment(getSavedSettings().countingStartTime)
        .add(12, 'hours')
        .format('hh:mm a');

      const newHistory = Object.create(HistorySchema);
      newHistory.id = getPrimaryKeyFromDate(today);
      newHistory.date = today;
      newHistory.startTime = startTime;
      newHistory.endTime = endTime;
      newHistory.numberOfKicks = 0;
      newHistory.lastKickedTime = '';

      insertNewHistory(newHistory);
    }

    const date = moment().format('dddd, DD MMMM YYYY');
    setCurrentDate(date);
  }, [isFocused]);

  const updateKickCount = () => {
    if (userSettings.soundIsOn) {
      playTapSound();
    }

    var today = new Date();
    var day = String(today.getDate());
    var month = String(today.getMonth());
    var year = String(today.getFullYear());
    var completeDate = Number(day + month + year);

    const addKickCounts = String(updateHistoryDetailById(completeDate));
    const kickCounts = String(getHistoryDetailById(completeDate).numberOfKicks);
    setKickCount(kickCounts);

    const time = moment().format('hh:mm a');
    setLastPressedTime(time);

    return addKickCounts;
  };

  const playTapSound = () => {
    Sound.setCategory('Playback');
    const tap = new Sound('tap.aif', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }

      tap.play(success => {
        if (success) {
          console.log('successfully played sound');
        } else {
          console.log('playback failed');
        }
      });
    });
  };

  const resetCountAndLastKickedTime = () => {
    var today = new Date();
    var day = String(today.getDate());
    var month = String(today.getMonth());
    var year = String(today.getFullYear());
    var completeDate = Number(day + month + year);

    const kickCount = String(resetHistoryDetailById(completeDate));
    const kickCounts = String(getHistoryDetailById(completeDate).numberOfKicks);
    setKickCount(kickCounts);

    const time = String(getHistoryDetailById(completeDate).lastKickedTime);
    setLastPressedTime(time);

    return kickCount;
  };

  const monitorSwitch = () => {
    setSwitchValue(previousState => !previousState);

    saveMonitoringSettings();
  };

  const saveMonitoringSettings = () => {
    updateMonitoringSettings(!userSettings.monitoringIsOn);
  };

  const viewSizeForPress = event => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;

    setViewPressHeight(height);
    setViewPressWidth(width);
  };

  const overTenKicksMessage = () => {
    Alert.alert(translationString.kickCountCompleteTitle);
  };

  return {
    currentDate,
    lastPressedTime,
    viewPressHeight,
    viewPressWidth,
    viewSizeForPress,
    //lastKickedTime,
    switchValue,
    monitorSwitch,
    resetCountAndLastKickedTime,
    kickCount,
    updateKickCount,
    overTenKicksMessage,
    userSettings,
  };
};
