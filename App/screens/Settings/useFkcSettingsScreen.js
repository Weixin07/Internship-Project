import * as GeneralHelper from '../../helper/GeneralHelper';
import * as SettingsData from '../../config/CommonConfig';
import { translationString } from '../../assets/translation/Translation';
import { getSavedSettings, updateReminderSettings, updateSoundSettings, updateStartTimeSettings } from '../../database/SettingsSchema'
import { useState } from 'react';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import { Alert } from 'react-native';
import { deleteAllHistory } from '../../database/HistorySchema';

export const useFkcSettings = () => {
  const [settings, setSettings ] = useState ({
    id: '',
    soundIsOn: false,
    reminderIsOn: false,
    countingStartTime: Date(),
    monitoringIsOn: false,
  });
  const [timePickerIsShow, setTimePickerIsShow] = useState(false);

  const pregAppOnPressed = () => {
    GeneralHelper.openUrl(Platform.OS === 'ios'
    ? 'https://apps.apple.com/us/app/my-pregnancy-calculator/id636470555'
    : 'https://play.google.com/store/apps/details?id=com.ecare.pregnancycalculator2');
  };

  const mmdOnPressed = () => {
    GeneralHelper.openUrl(
      Platform.OS === 'ios'
      ? 'https://apps.apple.com/us/app/my-menstrual-diary/id533701901'
      : 'https://play.google.com/store/apps/details?id=com.ecare.menstrualdiary&hl=en'
    )
  };

  const getSettings =() => {
    setSettings(getSavedSettings);
  }

  const showTimePicker = () => {
    setTimePickerIsShow(true);
  }

  const hideTimePicker =() => {
    setTimePickerIsShow(false);
  }

  const updateCountingStartTime = (date) => {
    updateStartTimeSettings(date);

    setTimePickerIsShow(false);
  }

  const saveSoundSettings =() => {
    updateSoundSettings(!settings.soundIsOn);

    getSettings();
  }

  const saveReminderSettings =() => {
    updateReminderSettings(!settings.reminderIsOn);

    if (!settings.reminderIsOn) {
      PushNotification.cancelAllLocalNotifications();
      Alert.alert("off");
    }
    else {
      Alert.alert("on");
      scheduleReminder();
    }

    getSettings();
  }

  const scheduleReminder = () => {
    PushNotification.localNotificationSchedule({
      message: "Fetal Kick Count. It is " + moment(settings.countingStartTime).format('hh:mm a') + ". Please count the fetal kick from now",
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: true,
    });

    var alertTime = settings.countingStartTime;
    alertTime.setHours(alertTime.getHours() + 9);

    PushNotification.localNotificationSchedule({
      message: "It is " + moment(alertTime).format('hh:mm a') + ". You have not completed your Fetal Kick Count. Please concentrate on your fetal movements",
      date: alertTime,
      allowWhileIdle: true,
    });

    var endTime = settings.countingStartTime;
    endTime.setHours(endTime.getHours() + 12);

    PushNotification.localNotificationSchedule({
      message: "It is " + moment(endTime).format('hh:mm a') + ". You have not completed your Fetal Kick Count. Please seek the advise of your Obstetrician or Midwife for further evaluation",
      date: endTime,
      allowWhileIdle: true,
    });
  }

  const clearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear the history? All of your history recorded from the time of commencement of the Fetal Kick Count Application will be deleted.",
      [
        {text: "Cancel", style: "cancel"},
        {text: "OK", onPress: () => deleteAllHistory()}
      ]
    );
  }
  
  const settingsList = [
    {
      id: SettingsData.SettingsOptions.Sound,
      title: translationString.soundTitle,
    },
    {
      id: SettingsData.SettingsOptions.Reminder,
      title: translationString.reminderTitle,
    },
    {
      id: SettingsData.SettingsOptions.startCountTime,
      title: translationString.timeToStartCountTitle,
    },
    {
      id: SettingsData.SettingsOptions.Share,
      title: translationString.shareTitle,
    },
    {
      id: SettingsData.SettingsOptions.Feedback,
      title: translationString.feedbackTitle,
    },
    {
      id: SettingsData.SettingsOptions.Review,
      title: translationString.reviewTitle,
    },
    {
      id: SettingsData.SettingsOptions.printOrEmail,
      title: translationString.printEmailTitle,
    },
  ];

  const printOptionsList = [
    {key: SettingsData.PrintOption.History, label: translationString.historyTitle},
    {key: SettingsData.PrintOption.Notes, label: translationString.notesTitle},
  ];

  return {
    settings,
    getSettings,
    pregAppOnPressed,
    mmdOnPressed,
    settingsList,
    printOptionsList,
    showTimePicker,
    hideTimePicker,
    timePickerIsShow,
    setTimePickerIsShow,
    updateCountingStartTime,
    saveSoundSettings,
    saveReminderSettings,
    clearHistory,
  };
};