import { Workflow } from '../workflow';
import { Direction } from '../interfaces/index';
export default class ProcessFetch {
    static run(workflow: Workflow): Workflow;
    static runByDirection(workflow: Workflow, direction: Direction): void;
}
