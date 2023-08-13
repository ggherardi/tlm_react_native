import { BusinessDataTypeBase } from './BusinessDataTypeBase';

export class BusinessEvent extends BusinessDataTypeBase {  
  id!: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;

  static primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }
}