import React from "react";

export const Utility = {
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

  GetDay: (dateString: string): string => {
    let dayString = '';
    let date = new Date(dateString);
    if (date && !isNaN(date.getDate())) {
      const day = date.getDate();
      dayString = `${day < 10 ? `0${day}` : day}`;
    }
    return dayString;
  },

  GetMonthShortName: (dateString: string): string => {
    let returnValue = '';
    let date = new Date(dateString);
    if (date && !isNaN(date.getDate())) {
      returnValue = date.toLocaleDateString("it-it", { month: 'short' });
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

  GenerateRandomGuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }
}