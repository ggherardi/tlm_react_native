import { MMKV } from 'react-native-mmkv';

export default class DataStorage {
  storage = new MMKV({
    id: 'TLM-storage',
    // path: `Documents`
  });

  save = (key: string, value: string) => {
    this.storage.set(key, value);
  };

  load = (key: string): any => {
    let returnValue;
    const saveConstant = (SaveConstants as any)[key];
    if (saveConstant) {
      switch (saveConstant.dataType) {
        case 'string':
          returnValue = this.storage.getString(key);
          break;
        case 'array':
          const json = this.storage.getString(key);          
          returnValue = json ? JSON.parse(json) : [];
          break;
        case 'buffer':
          returnValue = this.storage.getBuffer(key);
          break;
        case 'boolean':
          returnValue = this.storage.getBoolean(key);
          break;
        case 'number':
          returnValue = this.storage.getNumber(key);
          break;
      }      
    }
    return returnValue;
  };
}

export const Storage = new DataStorage();

export const SaveConstants = {
  events: {
    key: 'events',
    dataType: 'array',
  },
};
