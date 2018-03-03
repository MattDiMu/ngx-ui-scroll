import { Direction } from '../interfaces/index';
import { Cache } from './cache';
import { Item } from './item';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class Index {
    forward: number;
    backward: number;
}
export declare class Buffer {
    private _items;
    $items: BehaviorSubject<any>;
    bof: boolean;
    eof: boolean;
    lastIndex: Index;
    cache: Cache;
    constructor();
    items: Array<Item>;
    setLastIndices(): void;
    getFirstVisibleItemIndex(): number;
    getLastVisibleItemIndex(): number;
    getEdgeVisibleItemIndex(direction: Direction, opposite?: boolean): number;
    getFirstVisibleItem(): Item;
    getLastVisibleItem(): Item;
    getEdgeVisibleItem(direction: Direction, opposite?: boolean): Item;
}
