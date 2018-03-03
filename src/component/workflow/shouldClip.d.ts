import { Workflow } from '../workflow';
import { Direction } from '../interfaces/index';
export default class ShouldClip {
    static run(workflow: Workflow): Workflow;
    static shouldClipByDirection(direction: Direction, workflow: Workflow): boolean;
}
