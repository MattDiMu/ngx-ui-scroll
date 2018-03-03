import { Workflow } from '../workflow';
import { Direction } from '../interfaces/index';
export default class Fetch {
    static run(workflow: Workflow): Promise<any>;
    static success(data: any, direction: Direction, workflow: Workflow): void;
    static fetchByDirection(direction: Direction, workflow: Workflow): Promise<any>;
}
