import { SaveConstants } from '../DataStorage';
import { FileManager } from '../FileManager';
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
  currencies?: (Currency | undefined)[];
  mainCurrency!: Currency;
  directoryPath!: string;
  fullFilePath!: string;

  static getDataContextKey = () => SaveConstants.events.key;

  static primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }

  static extraDeleteSteps(element: BusinessEvent): void {
    FileManager.deleteFolder(element.directoryPath);
  }
}