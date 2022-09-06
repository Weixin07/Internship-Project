import Realm from 'realm';
import moment from 'moment';

export const HISTORYLIST_SCHEMA = 'HistoryList';
export const HISTORY_SCHEMA = 'History';

//Define models and their properties
export const HistorySchema = {
  name: HISTORY_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: {type: 'date', indexed: true},
    startTime: {type: 'string', indexed: true},
    endTime: {type: 'string', indexed: true},
    numberOfKicks: {type: 'int', indexed: true},
    lastKickedTime: {type: 'string', indexed: true},
  },
};

export const HistoryListSchema = {
  name: HISTORYLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'date',
    startTime: 'string',
    endTime: 'string',
    numberOfKicks: 'int',
    latsKickedTime: 'string',

    history: {type: 'list', objectType: HISTORY_SCHEMA},
  },
};

const realm = new Realm({
  path: 'kickCountsHistory',
  schema: [HistorySchema],
});

export const insertNewHistory = newHistory => {
  var history;
  realm.write(() => {
    history = realm.create(HISTORY_SCHEMA, newHistory);
  });
  console.log('realm db file path:', realm.path);
};

export const queryAllHistory = () => {
  const historyList = realm.objects(HISTORY_SCHEMA);

  //True means sorted descending.
  return historyList.sorted('date', true);
};

export const getHistoryDetailById = id => {
  return realm.objectForPrimaryKey(HISTORY_SCHEMA, id);
};

export const updateHistoryDetailById = id => {
  realm.write(() => {
    const historyDetail = getHistoryDetailById(id);
    historyDetail.numberOfKicks += 1;

    const time = moment().format('hh:mm a');
    historyDetail.lastKickedTime = time;
  });
};

export const resetHistoryDetailById = id => {
  realm.write(() => {
    const historyDetail = getHistoryDetailById(id);
    historyDetail.numberOfKicks = 0;
    historyDetail.lastKickedTime = '';
  });
};

export const deleteAllHistory = () => {
  try {
    realm.write(() => {
      realm.delete(realm.objects(HISTORY_SCHEMA));
    });
  } catch(error) {
    console.error(error.message);
  }
}