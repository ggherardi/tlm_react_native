import React from "react";

export const Utility = {
  FormatDateDDMMYYYY: (dateString: string): string => {
    let formattedDate = '';
    let date = new Date(dateString);
    if (date && !isNaN(date.getDate())) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      formattedDate = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
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
  }
}