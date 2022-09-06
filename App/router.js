import React from 'react';
import {Image} from 'react-native';
import {getScreenOptions} from './helper/GeneralHelper';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';

import FkcHomeScreen from './screens/Home/FkcHomeScreen';
import FkcHistoryScreen from './screens/History/FkcHistoryScreen';
import FkcNotesScreen from './screens/Notes/FkcNotesScreen';
import FkcNewAndEditNotesScreen from './screens/NewAndEditNotes/FkcNewAndEditNotesScreen';
import FkcAboutScreen from './screens/About/FkcAboutScreen';
import FkcAboutDetailsScreen from './screens/AboutAndSubjectNotes/FkcAboutDetailsScreen';
import FkcSubjectNotesDetailsScreen from './screens/AboutAndSubjectNotes/FkcSubjectNotesDetailsScreen.js';
import FkcSettingsScreen from './screens/Settings/FkcSettingsScreen';

import HomeIcon from './assets/image/home_icon.png';
import HistoryIcon from './assets/image/history_icon.png';
import NotesIcon from './assets/image/notes_icon.png';
import AboutIcon from './assets/image/about_icon.png';
import SettingsIcon from './assets/image/settings_icon.png';

export const HomeStack = createStackNavigator();
export const HistoryStack = createStackNavigator();
export const NotesStack = createStackNavigator();
export const AboutStack = createStackNavigator();
export const SettingsStack = createStackNavigator();
export const MainTab = createBottomTabNavigator();
export const MainStack = createStackNavigator();

let initialHomeRouteName = 'Home';

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      mode={'card'}
      initialRouteName={initialHomeRouteName}
      screenOptions={getScreenOptions}>
      <HomeStack.Screen
        name="Home"
        component={FkcHomeScreen}
        options={{headerLeft: null}}
      />
    </HomeStack.Navigator>
  );
};

export const HistoryStackNavigator = () => {
  return (
    <HistoryStack.Navigator mode={'card'} screenOptions={getScreenOptions}>
      <HistoryStack.Screen
        name="History"
        component={FkcHistoryScreen}
        options={{headerLeft: null}}
      />
    </HistoryStack.Navigator>
  );
};

export const NotesStackNavigator = () => {
  return (
    <NotesStack.Navigator mode={'card'} screenOptions={getScreenOptions}>
      <NotesStack.Screen
        name="Notes"
        component={FkcNotesScreen}
        options={{headerLeft: null}}
      />
      <NotesStack.Screen
        name="NewAndEditNotes"
        component={FkcNewAndEditNotesScreen}
        option={{headerShown: false}}
      />
    </NotesStack.Navigator>
  );
};

export const AboutStackNavigator = () => {
  return (
    <AboutStack.Navigator mode={'card'} screenOptions={getScreenOptions}>
      <AboutStack.Screen
        name="About"
        component={FkcAboutScreen}
        options={{headerLeft: null}}
      />
      <AboutStack.Screen
        name="AboutDetails"
        component={FkcAboutDetailsScreen}
      />
      <AboutStack.Screen
        name="SubjectNotesDetails"
        component={FkcSubjectNotesDetailsScreen}
      />
    </AboutStack.Navigator>
  );
};

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator mode={'card'} screenOptions={getScreenOptions}>
      <SettingsStack.Screen
        name="Settings"
        component={FkcSettingsScreen}
        options={{headerLeft: null}}
      />
    </SettingsStack.Navigator>
  );
};

export const MainTabNavigator = () => {
  const route = useRoute();
  return (
    <MainTab.Navigator
      mode={'card'}
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let icon;
          switch (route.name) {
            case 'HomeStack':
              icon = HomeIcon;
              break;
            case 'HistoryStack':
              icon = HistoryIcon;
              break;
            case 'NotesStack':
              icon = NotesIcon;
              break;
            case 'AboutStack':
              icon = AboutIcon;
              break;
            default:
              icon = SettingsIcon;
              break;
          }

          return <Image source={icon} style={{tintColor: color}} />;
        },
      })}
      options={{headerShown: false}}
      tabBarOptions={{
        showLabel: true,
        activeTintColor: '#FFA627',
        inactiveTintColor: 'rgb(156,156,155)',
        style: {
          backgroundColor: 'rgb(242,242,242)',
        },
        labelStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MainTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{title: 'Home'}}
        listeners={navigation => ({
          tabPress: e => {
            if (route.state && route.state.index === 0) {
              e.preventDefault();
            }
          },
        })}
      />

      <MainTab.Screen
        name="HistoryStack"
        component={HistoryStackNavigator}
        options={{title: 'History'}}
      />

      <MainTab.Screen
        name="NotesStack"
        component={NotesStackNavigator}
        options={{title: 'Notes'}}
      />
      <MainTab.Screen
        name="AboutStack"
        component={AboutStackNavigator}
        options={{title: 'About'}}
      />
      <MainTab.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{title: 'Settings'}}
      />
    </MainTab.Navigator>
  );
};

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Fetal Kick Count" component={MainTabNavigator} />
    </MainStack.Navigator>
  );
};
