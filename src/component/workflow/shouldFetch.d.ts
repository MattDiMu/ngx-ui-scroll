import { Workflow } from '../workflow';
import { Direction } from '../interfaces/index';
export default class ShouldFetch {
    static run(workflow: Workflow): Promise<Workflow>;
    static shouldFetchByDirection(direction: Direction, workflow: Workflow): void;
    static setStartIndex(direction: Direction, workflow: Workflow): void;
}
