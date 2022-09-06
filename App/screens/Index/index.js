import React from 'react';
import 'react-native-gesture-handler';
import {MainStackNavigator} from '../../router';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../../NavigationService';
import {useIndex} from './useIndex';
import {IndexContext} from './indexContext';

const index: () => React$Node = () => {
  const {} = useIndex();

  return (
    <IndexContext.Provider>
      <NavigationContainer ref={navigationRef}>
        <MainStackNavigator initialRoute={'Home'} />
      </NavigationContainer>
    </IndexContext.Provider>
  );
};

export default index;
