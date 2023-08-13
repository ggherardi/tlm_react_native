import { SaveConstants, Storage } from "../DataStorage";
import { BusinessEvent } from "./BusinessEvent";

class DataContext {
    Events: DataSet<BusinessEvent> = new DataSet<BusinessEvent>(SaveConstants.events.key, BusinessEvent);
}

class DataSet<T extends BusinessDataType> {
    private storageKey: string;
    private allData: T[];

    constructor(storageKey: string, private classRef: typeof BusinessDataType) {
        this.storageKey = storageKey;
        this.allData = Storage.load(storageKey);
    }

    refreshData = () => {
        this.allData = Storage.load(this.storageKey);
    }

    delete = (primaryKeyValue: any) => {
        const indexToDelete = this.allData.findIndex((element: T) => this.classRef.primaryKeyWhereCondition(element, primaryKeyValue));
        return this.classRef.primaryKeyWhereCondition({ id: 1 }, primaryKeyValue);
        if (indexToDelete > -1) {
            this.allData.splice(indexToDelete, 1);
        }        
    }

    getAllData = (): T[] => this.allData;
}

export abstract class BusinessDataType {
    static primaryKeyWhereCondition(element: BusinessDataType, primaryKey: any): boolean { return false; }
}

const dataContext = new DataContext();
export default dataContext;