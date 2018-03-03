import { Workflow } from '../workflow';
import { Direction } from '../interfaces/index';
export default class AdjustFetch {
    static run(workflow: Workflow): Workflow;
    static runByDirection(direction: Direction, workflow: Workflow): void;
    static processFetchedItems(items: any): void;
    static adjustForward(workflow: Workflow, size: number): void;
    static adjustBackward(workflow: Workflow, size: number): void;
}
