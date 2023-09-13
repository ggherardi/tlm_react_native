import React, { useEffect } from "react";
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const Utility = {
  storageTest: async () => {
    console.log(RNFetchBlob.fs.dirs.DocumentDir);    
    RNFetchBlob.fs.ls("/storage/emulated/0/Android/data/com.tlm/files/Documents")
      .then((v) => { console.log("OK, ", v) })
      .catch((e) => { console.log("OK, ", e) });
    // RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.MainBundleDir)
    //   .then((v) => { console.log("OK, ", v) })
    //   .catch((e) => { console.log("OK, ", e) });
    return;
    const permissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (permissions === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Granted permissions");
      RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.MovieDir}/test1`)
      .then((v) => { console.log("Success: ", v) })
      .catch((e) => { console.log("Error: ", e) })
    } else {
      console.log("Permissions not granted");
    }
  },

  SanitizeString: (str: string) => {
    return str.replace(/[^a-zA-Z ]/g, "");
  },

  WriteBase64ToFile: async (base64: string) => {
    const dirs = RNFetchBlob.fs.dirs;
    const path = dirs.DCIMDir + "PATH/TO/FILE.png" 

    const promise = await RNFetchBlob.fs.writeFile(path, base64, 'base64');
    console.log(promise);
      // .then((result) => {console.log("File has been saved to:" + result })
      // .catch(error => console.log(err);
  },

  IsDateValid: (date: Date): boolean => {
    return date && !isNaN(date.getDate());
  },

  FormatDateDDMMYYYY: (dateString: string): string => {
    let formattedDate = '';
    let date = new Date(dateString);
    if (date && !isNaN(date.getDate())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      formattedDate = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
    } else {
      formattedDate = '';
    }
    return formattedDate;
  },

  FormatDateDDMMYYYYhhmm: (dateString: string): string => {
    let formattedDate = '';
    let date = new Date(dateString);
    if (date && !isNaN(date.getDate())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();
      formattedDate = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
    } else {
      formattedDate = '';
    }
    return formattedDate;
  },

  GetNumberOfDaysBetweenDates: (startDateString: string, endDateString: string): number => {
    let numberOfDays = 0;
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    if (Utility.IsDateValid(startDate) && Utility.IsDateValid(endDate)) {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      numberOfDays = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;
    }
    return numberOfDays == 0 ? numberOfDays + 1 : numberOfDays;
  },

  ToDate: (dateString: string): Date => {  
    let date = new Date(dateString);
    return date;
  },

  GetDay: (dateString: string): string => {
    let dayString = '';
    let date = new Date(dateString);
    if (Utility.IsDateValid(date)) {
      const day = date.getDate();
      dayString = `${day < 10 ? `0${day}` : day}`;
    }
    return dayString;
  },

  GetMonthShortName: (dateString: string): string => {
    let returnValue = '';
    let date = new Date(dateString);
    if (Utility.IsDateValid(date)) {
      returnValue = date.toLocaleDateString("it-it", { month: 'short' });
    }
    return returnValue;
  },

  GetYear: (dateString: string): string => {
    let returnValue = '';
    let date = new Date(dateString);
    if (Utility.IsDateValid(date)) {
      returnValue = date.getFullYear().toString();
    }
    return returnValue;
  },

  RefreshScreen: ({ navigation, refreshFunc }: any) => {
    React.useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
        refreshFunc();
      });
      return focusHandler;
    }, [navigation]);
  },

  OnFocus: ({ navigation, onFocusAction }: any) => {
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        onFocusAction();
      });
      return unsubscribe;
    }, [navigation]);
  },

  GenerateRandomGuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  },

  IsNotNullOrUndefined: (value: any) => {
    return value != undefined && value != null && value != '';
  }
}