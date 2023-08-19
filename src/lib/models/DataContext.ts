import { SaveConstants, Storage } from "../DataStorage";
import { BusinessDataTypeBase } from "./BusinessDataTypeBase";
import { BusinessEvent } from "./BusinessEvent";
import { ExpenseReport } from "./ExpenseReport";

class DataContext {
    Events: DataSet<BusinessEvent> = new DataSet<BusinessEvent>(SaveConstants.events.key, BusinessEvent);
    ExpenseReports!: DataSet<ExpenseReport>;

    setExpenseReportsKey = (eventKey: string) => {
        this.ExpenseReports = new DataSet<ExpenseReport>(`event-${eventKey}-reports-${SaveConstants.expenseReport.key}`, ExpenseReport);
    }
}

class DataSet<T extends BusinessDataTypeBase> {
    public storageKey: string;
    private allData: T[] = [];

    constructor(storageKey: string, private classRef: typeof BusinessDataTypeBase) {
        this.storageKey = storageKey;
        this.allData = Storage.load(storageKey, this.classRef.getDataContextKey());
    }

    refreshData = () => {
        this.allData = Storage.load(this.storageKey, this.classRef.getDataContextKey());
    }

    deleteWhere = (primaryKeyValue: any) => {
        const indexToDelete = this.allData.findIndex((element: T) => this.classRef.primaryKeyWhereCondition(element, primaryKeyValue));        
        if (indexToDelete > -1) {
            this.allData.splice(indexToDelete, 1);
        }
        Storage.save(this.storageKey, this.classRef.getDataContextKey(), this.allData);
        this.refreshData();
    }

    getAllData = (): T[] => { 
        this.refreshData();
        return this.allData ?? [];
    }

    saveData = (value: any) => {
        Storage.save(this.storageKey, this.classRef.getDataContextKey(), value)
    }
}

const dataContext = new DataContext();
export default dataContext;