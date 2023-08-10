export const Utility = {
  FormatDateDDMMYYYY: (date?: Date) => {
    let dateString = '';
    if (date) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      dateString = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
    } else {
      dateString = '';
    }
    
    return dateString;
  }
}