import { Workflow } from '../workflow';
import { Direction } from '../interfaces/direction';
export default class Clip {
    static run(workflow: Workflow): Workflow | Promise<{}>;
    static runByDirection(direction: Direction, workflow: Workflow): void;
}
