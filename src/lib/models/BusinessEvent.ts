import { SaveConstants } from '../DataStorage';
import { BusinessDataTypeBase } from './BusinessDataTypeBase';

export class BusinessEvent extends BusinessDataTypeBase {  
  id!: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  currencies?: string[];
  mainCurrency?: string;

  static getDataContextKey = () => SaveConstants.events.key;

  static primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }
}