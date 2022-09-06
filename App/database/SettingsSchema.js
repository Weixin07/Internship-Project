import Realm from 'realm';
import { HISTORY_SCHEMA } from './HistorySchema';
export const SETTINGS_SCHEMA = "Settings";

//Define models and their properties
export const SettingsSchema = {
    name: SETTINGS_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string',
        soundIsOn: 'bool',
        reminderIsOn: 'bool',
        countingStartTime: 'date',
        monitoringIsOn: 'bool',
    }
};

const realm = new Realm ({
    path: SETTINGS_SCHEMA,
    schema: [SettingsSchema],
});

export const setDetaultSettings = () => {
    if (realm.objectForPrimaryKey(SETTINGS_SCHEMA, SETTINGS_SCHEMA) != null) {
        return;
    }

    var defaultReminderTime = new Date();
    defaultReminderTime.setHours(9);
    defaultReminderTime.setMinutes(0);

    const settings = Object.create(SettingsSchema);
    settings.id = SETTINGS_SCHEMA;
    settings.soundIsOn = false;
    settings.reminderIsOn = false;
    settings.countingStartTime = defaultReminderTime;
    settings.monitoringIsOn = true;

    let defaultSettings;

    realm.write(() => {
        defaultSettings = realm.create(SETTINGS_SCHEMA, settings);
    });
}

export const getSavedSettings = () => {
    return realm.objectForPrimaryKey(SETTINGS_SCHEMA, SETTINGS_SCHEMA);
}

export const updateSoundSettings = isOn => {
    realm.write(() => {
        const settings = realm.objectForPrimaryKey(SETTINGS_SCHEMA, SETTINGS_SCHEMA);
        settings.soundIsOn = isOn;
    })
}

export const updateReminderSettings = isOn => {
    realm.write(() => {
        const settings = realm.objectForPrimaryKey(SETTINGS_SCHEMA, SETTINGS_SCHEMA);
        settings.reminderIsOn = isOn;
    })
}

export const updateStartTimeSettings = newTime => {
    realm.write(() => {
        const settings = realm.objectForPrimaryKey(SETTINGS_SCHEMA, SETTINGS_SCHEMA);
        settings.countingStartTime = newTime;
    })
}

export const updateMonitoringSettings = isOn => {
    realm.write(() => {
        const settings = realm.objectForPrimaryKey(SETTINGS_SCHEMA, SETTINGS_SCHEMA);
        settings.monitoringIsOn = isOn;
    })
}