import { BusinessDataType } from './DataContext';

export class BusinessEvent extends BusinessDataType {  
  id!: number;
  name?: string;
  startDate?: string;
  endDate?: string;

  primaryKeyWhereCondition = (element: BusinessEvent, id: number) => {
    return element.id == id;
  }
}