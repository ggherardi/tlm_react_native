import { SaveConstants } from '../DataStorage';
import { FileManager } from '../FileManager';
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

  static getDataContextKey = () => SaveConstants.events.key;

  static primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }

  static extraDeleteSteps(element: BusinessEvent): void {
    FileManager.deleteFileOrFolder(element.directoryPath);
  }
}