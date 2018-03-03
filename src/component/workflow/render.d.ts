import { Workflow } from '../workflow';
export default class Render {
    static run(workflow: Workflow): Workflow | Promise<any>;
    static setElements(workflow: Workflow): Error;
}
