import { SaveConstants } from '../DataStorage';
import { FileManager } from '../FileManager';
import NotificationManager from '../NotificationManager';
import { Utility } from '../Utility';
import { City } from '../data/Cities';
import { Country } from '../data/Countries';
import { Currency } from '../data/Currencies';
import { BusinessDataTypeBase } from './BusinessDataTypeBase';

export class BusinessEvent extends BusinessDataTypeBase {
  id!: number;
  name!: string;
  description?: string;
  startDate!: string;
  endDate!: string;
  country?: Country;
  city?: string;
  currencies?: (Currency | undefined)[];
  mainCurrency!: Currency;
  needCarRefund?: boolean;
  refundStartingCity?: string;
  refundArrivalCity?: string;
  totalTravelledKms: number = 0;
  travelRefundForfait: number = 0.2;
  cashFund: number = 0;
  sentToCompany: boolean = false;

  // File properties
  directoryName!: string;
  directoryPath!: string;
  fullFilePath!: string;
  reportFileName!: string;
  expensesDataContextKey!: string;

  // Notification properties
  notificationIds!: number[];

  static getDataContextKey = () => SaveConstants.events.key;

  static primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }

  static extraDeleteSteps(element: BusinessEvent): void {
    FileManager.deleteFileOrFolder(element.directoryPath);
    NotificationManager.cancelAllScheduledNotifications(element.notificationIds);
  }

  scheduleNotifications = () => {
    // GG: I'm scheduling 3 different notifications here, because iOS does not support the property "repeat" of react-native-push-notification
    // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: need to schedule only the correct number of notification, i.e. the end date is today, I probably don't need notifications, but if the end date is in 2 days, I would need 2 notifications!
    const endDate = new Date(this.endDate);
    console.log(this.notificationIds);
    for (let i = 0; i < this.notificationIds.length; i++) {      
      const notificationId = this.notificationIds[i];
      NotificationManager.scheduleNotification({
        id: notificationId,
        // date: new Date(Utility.AddDays(endDate, -i).setHours(10, 0, 0)),
        date: new Date(Date.now() + ((i + 1)* 10) * 1000),
        title: `Evento ${this.name} in scadenza`,        
        text: `L'evento ${this.name} scadrà in data ${Utility.FormatDateDDMMYYYY(this.endDate)}. Ricordati di inviare la nota spese!`,        
      });
    }
  }

  deleteNotifications = () => {
    NotificationManager.cancelAllScheduledNotifications(this.notificationIds);
  }
}