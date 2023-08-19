import { BusinessDataTypeBase } from './BusinessDataTypeBase';

export class ExpenseReport extends BusinessDataTypeBase {  
  id!: number;
  name!: string;
  date!: string;
  timeStamp!: string;
  amount!: number;
  description?: string;    

  static primaryKeyWhereCondition = (element: ExpenseReport, id: number) => {
    return element.id == id;
  }
}