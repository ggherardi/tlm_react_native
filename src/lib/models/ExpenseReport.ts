import { BusinessDataTypeBase } from './BusinessDataTypeBase';
import { SaveConstants } from '../DataStorage';
import { FileManager } from '../FileManager';

export class ExpenseReport extends BusinessDataTypeBase {  
  id!: number;
  name!: string;
  date!: string;
  timeStamp!: string;
  amount!: number;
  description?: string;
  photoFilePath!: string;
  photoDataType!: string;

  static getDataContextKey = () => SaveConstants.expenseReport.key;

  static primaryKeyWhereCondition = (element: ExpenseReport, id: number) => {
    return element.id == id;
  }

  static extraDeleteSteps(element: ExpenseReport): void {
    FileManager.deleteFileOrFolder(element.photoFilePath);
  }
}