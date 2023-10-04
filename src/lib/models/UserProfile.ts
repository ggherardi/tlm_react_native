import { SaveConstants } from '../DataStorage';
import { FileManager } from '../FileManager';
import { Country } from '../data/Countries';
import { Currency } from '../data/Currencies';
import { BusinessDataTypeBase } from './BusinessDataTypeBase';

export class UserProfile extends BusinessDataTypeBase {
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  swipeTutorialSeen!: boolean;
  
  static getDataContextKey = () => SaveConstants.userProfile.key;

  static primaryKeyWhereCondition = (element: UserProfile, id: number) => {
    return element.id == id;
  }
}