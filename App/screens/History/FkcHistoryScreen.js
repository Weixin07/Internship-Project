import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useHistory} from './useFkcHistoryScreen';
import {translationString} from '../../assets/translation/Translation';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/core';

export default ({route, navigation}) => {
  const {historyList, getDisplayDateString, getHistoryList} = useHistory(
    route,
    navigation,
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    getHistoryList();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={styles.displayBar}>
        <TouchableOpacity activeOpacity={1} style={styles.start} />
        <Text style={styles.displayBarStartText}>
          {translationString.startedTitle}
        </Text>

        <TouchableOpacity activeOpacity={1} style={styles.end} />
        <Text style={styles.displayBarEndText}>
          {translationString.endTitle}
        </Text>

        <TouchableOpacity activeOpacity={1} style={styles.kickCount} />
        <Text style={styles.displayBarCountText}>
          {translationString.kickCountTitle}
        </Text>
      </View>

      <FlatList
        data={historyList}
        renderItem={({item, index}) => (
          <View>
            <View style={styles.dayAndDate}>
              <View style={styles.timeIcons}>
                {index === 0 ? (
                  <Image
                    style={styles.timeImageSize}
                    source={require('../../assets/image/time_icon.png')}
                  />
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.timeReplace}
                  />
                )}

                {index === historyList.length - 1 ? (
                  <View style={styles.lastVerticalSeparator} />
                ) : (
                  <View style={styles.verticalSeparator} />
                )}
              </View>

              <Text style={styles.dayAndDate}>
                {' '}
                {getDisplayDateString(item.date)}{' '}
              </Text>
            </View>

            <View style={styles.startEndCount}>
              <TouchableOpacity activeOpacity={1} style={styles.startShape}>
                <Text style={styles.startEndCountText}>{item.startTime}</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity activeOpacity={1} style={styles.endShape}>
                <Text style={styles.startEndCountText}>{item.endTime}</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity activeOpacity={1} style={styles.countShape}>
                <Text style={styles.startEndCountText}>
                  {item.numberOfKicks}
                </Text>
                <Image
                  style={styles.countImageSize}
                  source={require('../../assets/image/foot_icon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  displayBar: {
    flexDirection: 'row',
    backgroundColor: 'rgb(242,242,242)',
    marginTop: 5,
  },
  displayBarStartText: {
    color: 'rgb(150,150,150)',
    fontSize: 16,
    marginLeft: 5,
  },
  displayBarEndText: {
    color: 'rgb(150,150,150)',
    fontSize: 16,
    marginLeft: 5,
  },
  displayBarCountText: {
    color: 'rgb(150,150,150)',
    fontSize: 16,
    marginLeft: 5,
  },
  start: {
    height: '85%',
    width: '4%',
    borderRadius: 50,
    backgroundColor: 'rgb(117,207,79)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  end: {
    height: '85%',
    width: '4%',
    borderRadius: 50,
    backgroundColor: 'rgb(247,97,99)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  kickCount: {
    height: '85%',
    width: '4%',
    borderRadius: 50,
    backgroundColor: 'rgb(57,143,236)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dayAndDate: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    fontSize: 20,
  },
  startEndCount: {
    flexDirection: 'row',
    marginTop: -55,
    marginLeft: 45,
    marginBottom: 10,
    alignItems: 'center',
  },
  startShape: {
    flexDirection: 'row',
    height: '140%',
    width: '30%',
    borderRadius: 25,
    backgroundColor: 'rgb(117,207,79)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  endShape: {
    flexDirection: 'row',
    height: '140%',
    width: '30%',
    borderRadius: 25,
    backgroundColor: 'rgb(241,59,63)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countShape: {
    flexDirection: 'row',
    height: '140%',
    width: '20%',
    borderRadius: 25,
    backgroundColor: 'rgb(57,143,236)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startEndCountText: {
    color: 'white',
    marginVertical: 3,
    fontSize: 20,
  },
  timeImageSize: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginTop: 5,
    marginRight: 5,
  },
  countImageSize: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  timeReplace: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: 'rgb(204,204,204)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    marginLeft: 3,
    marginRight: 5,
  },
  separator: {
    marginVertical: 8,
    height: 1,
    backgroundColor: 'rgb(204,204,204)',
    width: 15,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 3,
  },
  verticalSeparator: {
    height: 50,
    width: 1,
    backgroundColor: 'rgb(204,204,204)',
    marginTop: 3,
    marginBottom: 5,
    marginLeft: 10,
  },
  timeIcons: {
    flexDirection: 'column',
  },
  lastVerticalSeparator: {
    height: 50,
    width: 1,
    backgroundColor: 'rgb(242,242,242)',
    marginTop: 3,
    marginBottom: 5,
    marginLeft: 10,
  },
});
