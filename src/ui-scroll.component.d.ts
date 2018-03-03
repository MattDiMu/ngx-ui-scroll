import { OnInit, OnDestroy, TemplateRef, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { WorkflowRunner } from './component/runner';
import { Datasource } from './component/interfaces/index';
import { Item } from './component/classes/item';
export declare class UiScrollComponent implements OnInit, OnDestroy {
    private changeDetector;
    private elementRef;
    private renderer;
    template: TemplateRef<any>;
    datasource: Datasource;
    items: Array<Item>;
    workflowRunner: WorkflowRunner;
    constructor(changeDetector: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
