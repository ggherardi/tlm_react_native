import { SaveConstants, Storage } from "../DataStorage";
import { BusinessEvent } from "./BusinessEvent";

class DataContext {
    Events: DataSet<BusinessEvent> = new DataSet<BusinessEvent>();
}

class DataSet<T extends IDataSet> {
    private allData: T[];

    constructor() {
        this.allData = Storage.load(SaveConstants.events.key);
    }

    refreshData = () => {
        this.allData = Storage.load(SaveConstants.events.key);
    }

    delete = (id: number) => {
        // this.allData.findIndex()
    }

    getAllData = (): T[] => this.allData;
}

export interface IDataSet {
    deleteCondition: Function;
}

const dataContext = new DataContext();
export default dataContext;