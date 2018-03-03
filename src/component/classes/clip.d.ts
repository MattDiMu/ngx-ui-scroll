export declare class ClipByDirection {
    shouldClip: boolean;
    size: number;
    constructor();
}
export declare class ClipModel {
    forward: ClipByDirection;
    backward: ClipByDirection;
    constructor();
    readonly shouldClip: boolean;
}
