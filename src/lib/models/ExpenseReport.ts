import { BusinessDataTypeBase } from './BusinessDataTypeBase';
import { SaveConstants } from '../DataStorage';

export class ExpenseReport extends BusinessDataTypeBase {  
  id!: number;
  name!: string;
  date!: string;
  timeStamp!: string;
  amount!: number;
  description?: string;
  receiptPhotoBase64!: string;

  static getDataContextKey = () => SaveConstants.expenseReport.key;

  static primaryKeyWhereCondition = (element: ExpenseReport, id: number) => {
    return element.id == id;
  }
}