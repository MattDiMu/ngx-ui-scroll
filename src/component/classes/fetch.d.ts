import { Item } from './item';
export declare class FetchByDirection {
    shouldFetch: boolean;
    startIndex: number;
    private _newItemsData;
    items: Array<Item>;
    count: number;
    constructor();
    reset(): void;
    newItemsData: Array<Item>;
}
export declare class FetchModel {
    forward: FetchByDirection;
    backward: FetchByDirection;
    constructor();
    reset(): void;
    readonly count: number;
    readonly items: Array<Item>;
    readonly shouldFetch: boolean;
    readonly hasNewItems: boolean;
}
