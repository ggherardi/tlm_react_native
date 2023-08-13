import { BusinessDataTypeBase } from './BusinessDataTypeBase';

export class BusinessEvent extends BusinessDataTypeBase {  
  id!: number;
  name?: string;
  startDate?: string;
  endDate?: string;

  //@override
  static primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }
}