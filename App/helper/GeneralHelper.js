import {Alert, Linking} from 'react-native';
import {fkcConfigurations} from '../config/CommonConfig';

export const getScreenOptions = () => {
  let screenOptions = {
    headerStyle: {
      backgroundColor: fkcConfigurations.navigationBarColor,
    },
    headerTitleStyle: {
      fontSize: 20,
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
  };

  return screenOptions;
};

export const openUrl = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

export const getPrimaryKeyFromDate = date => {
  return parseInt(String(date.getDate()) + String(date.getMonth()) + String(date.getFullYear()));
}