import React from 'react';
import {
  Switch,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useFkcHomeScreen} from './useFkcHomeScreen';
import {translationString} from '../../assets/translation/Translation';
import arrow from '../../assets/image/arrow_up.png';
import * as screenSize from '../../config/CommonConfig';
import moment from 'moment';

export default ({route, navigation}) => {
  const {
    currentDate,
    lastPressedTime,
    viewPressHeight,
    viewSizeForPress,
    switchValue,
    monitorSwitch,
    resetCountAndLastKickedTime,
    kickCount,
    updateKickCount,
    overTenKicksMessage,
    userSettings,
  } = useFkcHomeScreen(route, navigation);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.kickButtonSection}>
        <View onLayout={viewSizeForPress}>
          <TouchableOpacity
            activeOpacity={1}
            style={
              viewPressHeight == 0
                ? styles.countKicks
                : [
                    styles.countKicks,
                    {
                      height: viewPressHeight,
                      width: viewPressHeight,
                      borderRadius: viewPressHeight * 0.5,
                      backgroundColor: switchValue
                        ? 'rgb(57,142,235)'
                        : 'rgb(149,193,239)',
                    },
                  ]
            }
            disabled={switchValue == false}
            onPress={kickCount >= 10 ? overTenKicksMessage : updateKickCount}>
            <Text style={styles.pressButtonText}>
              {kickCount > 0 ? kickCount : 'Press'}
            </Text>
          </TouchableOpacity>

          <Image source={arrow} style={styles.arrow}></Image>
        </View>
        <Text style={styles.clickKickText}>
          {translationString.pressMeTitle}
        </Text>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.timeBox}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.startTime,
              {
                // height: 110,
                // width: 110,
                // borderRadius: 55,
                height: 80,
                width: 80,
                borderRadius: 40,
              },
            ]}>
            <Text style={styles.buttonText}>
              {moment(userSettings.countingStartTime).format('hh:mm a')}
            </Text>
            <Text style={styles.timeText}>{translationString.startTitle}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.alertTime,
              {
                // height: 110,
                // width: 110,
                // borderRadius: 55,
                height: 80,
                width: 80,
                borderRadius: 40,
              },
            ]}>
            <Text style={styles.buttonText}>
              {moment(userSettings.countingStartTime)
                .add(9, 'hours')
                .format('hh:mm a')}
            </Text>
            <Text style={styles.timeText}>{translationString.alertTitle}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.endTime,
              {
                // height: 110,
                // width: 110,
                // borderRadius: 55,
                height: 80,
                width: 80,
                borderRadius: 40,
              },
            ]}>
            <Text style={styles.buttonText}>
              {moment(userSettings.countingStartTime)
                .add(12, 'hours')
                .format('hh:mm a')}
            </Text>
            <Text style={styles.timeText}>{translationString.endTitle}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailsRow}>
          <Text style={styles.title}>{translationString.todayTitle}</Text>
          <Text>{currentDate}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailsRow}>
          <Text style={styles.title}>{translationString.lastKickTitle}</Text>
          <Text style={styles.content}>{lastPressedTime}</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.monitoringBox}>
            <Text style={styles.monitoring}>
              {translationString.monitoringTitle}
            </Text>
            <Switch
              trackColor={{false: '#929292', true: '#FFAF33'}}
              thumbColor={{false: 'DAD7D7', true: '#FF8333'}}
              value={switchValue}
              onValueChange={monitorSwitch}
            />
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailsRow}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.resetButton}
            onPress={resetCountAndLastKickedTime}>
            <Text style={styles.buttonText}>
              {translationString.resetCountTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kickButtonSection: {
    flex: 1,
  },
  detailsSection: {
    flex: 2,
    backgroundColor: 'white',
    paddingHorizontal: screenSize.screenWidth * 0.05,
  },
  countKicks: {
    minHeight: screenSize.screenWidth * 0.1,
    minWidth: screenSize.screenWidth * 0.1,
    // maxHeight: screenSize.screenWidth * 0.4,
    // maxWidth: screenSize.screenWidth * 0.4,
    maxHeight: screenSize.screenWidth * 0.3,
    maxWidth: screenSize.screenWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: screenSize.screenHeight * 0.03,
  },
  pressButtonText: {
    color: 'white',
    fontSize: 30,
  },
  kickCountText: {
    color: 'white',
    fontSize: 20,
  },
  arrow: {
    marginTop: '23%',
    // marginRight: '30%',
    marginRight: '50%',
    alignSelf: 'flex-end',
    position: 'absolute',
    resizeMode: 'contain',
    // height: 33,
    // width: 48,
    height: 13,
    width: 28,
  },
  clickKickText: {
    marginBottom: 20,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: '5%',
    //marginTop: '50%',
    marginTop: '40%',
  },
  startTime: {
    backgroundColor: 'rgb(84,196,44)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTime: {
    backgroundColor: 'rgb(235,146,48)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endTime: {
    backgroundColor: 'rgb(241,59,63)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  timeText: {
    color: '#D3D3D3',
  },
  title: {
    marginVertical: 8,
    color: 'rgb(155,155,155)',
  },
  content: {
    marginVertical: 8,
  },
  monitoringBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monitoring: {
    fontSize: 18,
  },
  resetButton: {
    marginHorizontal: '25%',
    //paddingVertical: 17,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgb(241,59,63)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailsRow: {
    flexDirection: 'column',
    marginVertical: 8,
  },
});
