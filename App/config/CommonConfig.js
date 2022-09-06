import {translationString} from '../assets/translation/Translation';
import {getVersion} from 'react-native-device-info';
import {Dimensions} from 'react-native';

export const SettingsOptions = {
  Sound: 0,
  Reminder: 1,
  startCountTime: 2,
  Share: 3,
  Feedback: 4,
  Review: 5,
  printOrEmail: 6,
};

export const PrintOption = {
  History: 1,
  Notes: 2,
};

export const fkcConfigurations = {
  appname: translationString.appTitle,
  shareUrl: 'http://onelink.to/FetalKickCount',
  appstore: 'https://apps.apple.com/us/app/fetal-kick-count/id483135699',
  googlePlayStore:
    'https://play.google.com/store/apps/details?id=com.ecare.fetalkickcount',
  versionNumber: getVersion(),
  navigationBarColor: '#FFA627',
  borderColor: 'rgb(235, 146, 85)',
  separatorColor: 'rgb(180, 180, 180)',
};

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
