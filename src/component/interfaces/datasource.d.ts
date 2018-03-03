import { Observable } from 'rxjs/Observable';
import { Settings } from './settings';
export declare type DatasourceGetCallback = (index: number, count: number, success: Function, fail: Function) => void;
export declare type DatasourceGetObservable = (index: number, count: number) => Observable<any>;
export declare type DatasourceGetPromise = (index: number, count: number) => Promise<any>;
export interface Datasource {
    get: DatasourceGetCallback | DatasourceGetObservable | DatasourceGetPromise;
    settings?: Settings;
}
