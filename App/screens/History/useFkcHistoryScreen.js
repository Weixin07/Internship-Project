import {
  HistorySchema,
  insertNewHistory,
  insertNewHistoryList,
  queryAllHistory,
} from '../../database/HistorySchema';
import {useState} from 'react';
import { getPrimaryKeyFromDate } from '../../helper/GeneralHelper';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const useHistory = () => {
  const [historyList, setHistoryList] = useState([]);

  //Will set up the db next PR

  const addNewData = () => {
    let record;

    var today = new Date();
    today.setHours(9);
    today.setMinutes(0);

    var endDateTime = today;
    endDateTime.setHours(endDateTime.getHours() + 12);

    let endTime = String(endDateTime.getHours() + endDateTime.getMinutes());
    let startTime = String(today.getHours() + today.getMinutes());

    const newHistory = Object.create(HistorySchema);
    newHistory.id = getPrimaryKeyFromDate(today);
    newHistory.date = today;
    newHistory.startTime = startTime;
    newHistory.endTime = endTime;
    newHistory.numberOfKicks = 4;

    insertNewHistory(newHistory);
  };

  const getHistoryList = () => {
    setHistoryList(queryAllHistory);
  };

  const getDisplayDateString = date => {
    let nameOfDay = days[date.getDay()];
    let day = String(date.getDate()).padStart(2, '0');
    let nameOfMonth = months[date.getMonth()];
    let year = date.getFullYear();

    let fullDateString =
      nameOfDay + ', ' + day + ' ' + nameOfMonth + ' ' + year;

    return fullDateString;
  };

  return {
    historyList,
    getDisplayDateString,
    getHistoryList,
    addNewData,
  };
};
