/**
 * @license ngx-ui-scroll
 * MIT license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, Input, NgModule, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var defaultSettings = {
    startIndex: 1,
    bufferSize: 5,
    padding: 0.5,
    infinite: false
};
var Settings = /** @class */ (function () {
    function Settings(settings) {
        // internal settings
        this.debug = false;
        this.itemIdPrefix = 'ui-scroll-0-';
        this.clipAfterFetchOnly = false;
        Object.assign(this, defaultSettings);
        if (settings && typeof settings === 'object') {
            Object.assign(this, settings);
        }
    }
    return Settings;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var Direction = {
    forward: 'forward',
    backward: 'backward',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Routines = /** @class */ (function () {
    function Routines() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    Routines.getScrollPosition = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element['scrollTop'];
    };
    /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    Routines.setScrollPosition = /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    function (element, value) {
        element['scrollTop'] = value;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Routines.getParams = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.getBoundingClientRect();
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Routines.getSize = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return Routines.getParams(element)['height'];
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Routines.getScrollableSize = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element['scrollHeight'];
    };
    /**
     * @param {?} params
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Routines.getRectEdge = /**
     * @param {?} params
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (params, direction, opposite) {
        var /** @type {?} */ forward = !opposite ? Direction.forward : Direction.backward;
        return params[direction === forward ? 'bottom' : 'top'];
    };
    /**
     * @param {?} element
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Routines.getEdge = /**
     * @param {?} element
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (element, direction, opposite) {
        var /** @type {?} */ params = Routines.getParams(element);
        return Routines.getRectEdge(params, direction, opposite);
    };
    /**
     * @param {?} element
     * @param {?} direction
     * @param {?=} relativeElement
     * @param {?=} opposite
     * @return {?}
     */
    Routines.getEdge2 = /**
     * @param {?} element
     * @param {?} direction
     * @param {?=} relativeElement
     * @param {?=} opposite
     * @return {?}
     */
    function (element, direction, relativeElement, opposite) {
        var /** @type {?} */ result = element.offsetTop - (relativeElement ? relativeElement.scrollTop : 0) +
            (direction === (!opposite ? Direction.forward : Direction.backward) ? Routines.getSize(element) : 0);
        return result;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Routines.hideElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.style.display = 'none';
    };
    return Routines;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Padding = /** @class */ (function () {
    function Padding(element, direction) {
        this.element = null;
        this.element = element.querySelector("[data-padding-" + direction + "]");
        this.direction = direction;
    }
    Object.defineProperty(Padding.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt(this.element.style.height, 10) || 0;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.element.style.height = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Padding.prototype.getEdge = /**
     * @return {?}
     */
    function () {
        return Routines.getEdge(this.element, this.direction, true);
    };
    return Padding;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ViewportPadding = /** @class */ (function () {
    function ViewportPadding(element) {
        this.forward = new Padding(element, Direction.forward);
        this.backward = new Padding(element, Direction.backward);
    }
    return ViewportPadding;
}());
var Viewport = /** @class */ (function () {
    function Viewport(elementRef, settings) {
        this.settings = settings;
        this.host = elementRef.nativeElement;
        this.scrollable = elementRef.nativeElement.parentElement;
        this.padding = new ViewportPadding(this.host);
        this.syntheticScrollPosition = null;
    }
    Object.defineProperty(Viewport.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return this.host.children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewport.prototype, "scrollPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return Routines.getScrollPosition(this.scrollable);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            Routines.setScrollPosition(this.scrollable, value);
            this.syntheticScrollPosition = this.scrollPosition;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Viewport.prototype.saveScrollPosition = /**
     * @return {?}
     */
    function () {
        this.lastPosition = this.scrollPosition;
    };
    /**
     * @return {?}
     */
    Viewport.prototype.getLastPosition = /**
     * @return {?}
     */
    function () {
        return this.lastPosition;
    };
    /**
     * @return {?}
     */
    Viewport.prototype.getSize = /**
     * @return {?}
     */
    function () {
        return Routines.getSize(this.scrollable);
    };
    /**
     * @return {?}
     */
    Viewport.prototype.getScrollableSize = /**
     * @return {?}
     */
    function () {
        return Routines.getScrollableSize(this.scrollable);
    };
    /**
     * @return {?}
     */
    Viewport.prototype.getBufferPadding = /**
     * @return {?}
     */
    function () {
        return this.getSize() * this.settings.padding;
    };
    /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Viewport.prototype.getEdge = /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (direction, opposite) {
        return Routines.getEdge(this.scrollable, direction, opposite);
    };
    /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Viewport.prototype.getLimit = /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (direction, opposite) {
        return this.getEdge(direction, opposite) +
            (direction === (!opposite ? Direction.forward : Direction.backward) ? 1 : -1) * this.getBufferPadding();
    };
    return Viewport;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ItemCache = /** @class */ (function () {
    function ItemCache(item) {
        this.$index = item.$index;
        this.nodeId = item.nodeId;
        this.data = item.data;
        this.params = item.getParams();
    }
    /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    ItemCache.prototype.getEdge = /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (direction, opposite) {
        return Routines.getRectEdge(this.params, direction, opposite);
    };
    return ItemCache;
}());
var Cache = /** @class */ (function () {
    function Cache() {
        this.items = [];
    }
    /**
     * @param {?} item
     * @return {?}
     */
    Cache.prototype.add = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ found = this.items.find(function (i) { return i.$index === item.$index; });
        if (found) {
            found.data = item.data;
            found.params = item.getParams();
        }
        else {
            // todo: do we need the list to be sorted? maybe an object?
            this.items.push(new ItemCache(item));
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Cache.prototype.get = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.items.find(function (i) { return i.$index === index; });
    };
    return Cache;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Index = /** @class */ (function () {
    function Index() {
        this.forward = null;
        this.backward = null;
    }
    return Index;
}());
var Buffer = /** @class */ (function () {
    function Buffer() {
        this.$items = new BehaviorSubject$1(null);
        this.items = [];
        this.bof = false;
        this.eof = false;
        this.lastIndex = new Index();
        this.cache = new Cache();
    }
    Object.defineProperty(Buffer.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._items;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._items = items;
            if (items.length) {
                this.setLastIndices();
            }
            this.$items.next(items);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Buffer.prototype.setLastIndices = /**
     * @return {?}
     */
    function () {
        this.lastIndex[Direction.backward] = this.items[0].$index;
        this.lastIndex[Direction.forward] = this.items[this.items.length - 1].$index;
    };
    /**
     * @return {?}
     */
    Buffer.prototype.getFirstVisibleItemIndex = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ length = this.items.length;
        for (var /** @type {?} */ i = 0; i < length; i++) {
            if (!this.items[i].invisible) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @return {?}
     */
    Buffer.prototype.getLastVisibleItemIndex = /**
     * @return {?}
     */
    function () {
        for (var /** @type {?} */ i = this.items.length - 1; i >= 0; i--) {
            if (!this.items[i].invisible) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Buffer.prototype.getEdgeVisibleItemIndex = /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (direction, opposite) {
        return direction === (!opposite ? Direction.forward : Direction.backward) ?
            this.getLastVisibleItemIndex() : this.getFirstVisibleItemIndex();
    };
    /**
     * @return {?}
     */
    Buffer.prototype.getFirstVisibleItem = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ index = this.getFirstVisibleItemIndex();
        if (index >= 0) {
            return this.items[index];
        }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.getLastVisibleItem = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ index = this.getLastVisibleItemIndex();
        if (index >= 0) {
            return this.items[index];
        }
    };
    /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Buffer.prototype.getEdgeVisibleItem = /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (direction, opposite) {
        return direction === (!opposite ? Direction.forward : Direction.backward) ?
            this.getLastVisibleItem() : this.getFirstVisibleItem();
    };
    return Buffer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FetchByDirection = /** @class */ (function () {
    function FetchByDirection() {
        this.count = 0;
        this.reset();
    }
    /**
     * @return {?}
     */
    FetchByDirection.prototype.reset = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ count = this.count;
        this.shouldFetch = false;
        this.startIndex = null;
        this._newItemsData = null;
        this.items = null;
        this.count = count;
    };
    Object.defineProperty(FetchByDirection.prototype, "newItemsData", {
        get: /**
         * @return {?}
         */
        function () {
            return this._newItemsData;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._newItemsData = items;
            this.count++;
        },
        enumerable: true,
        configurable: true
    });
    return FetchByDirection;
}());
var FetchModel = /** @class */ (function () {
    function FetchModel() {
        this.forward = new FetchByDirection();
        this.backward = new FetchByDirection();
    }
    /**
     * @return {?}
     */
    FetchModel.prototype.reset = /**
     * @return {?}
     */
    function () {
        this[Direction.forward].reset();
        this[Direction.backward].reset();
    };
    Object.defineProperty(FetchModel.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () {
            return this[Direction.backward].count + this[Direction.forward].count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FetchModel.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return (this[Direction.backward].items ? this[Direction.backward].items : []).concat(this[Direction.forward].items ? this[Direction.forward].items : []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FetchModel.prototype, "shouldFetch", {
        get: /**
         * @return {?}
         */
        function () {
            return this[Direction.forward].shouldFetch || this[Direction.backward].shouldFetch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FetchModel.prototype, "hasNewItems", {
        get: /**
         * @return {?}
         */
        function () {
            return !!(this[Direction.forward].newItemsData || this[Direction.backward].newItemsData);
        },
        enumerable: true,
        configurable: true
    });
    return FetchModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ClipByDirection = /** @class */ (function () {
    function ClipByDirection() {
        this.shouldClip = false;
        this.size = null;
    }
    return ClipByDirection;
}());
var ClipModel = /** @class */ (function () {
    function ClipModel() {
        this.forward = new ClipByDirection();
        this.backward = new ClipByDirection();
    }
    Object.defineProperty(ClipModel.prototype, "shouldClip", {
        get: /**
         * @return {?}
         */
        function () {
            return this[Direction.forward].shouldClip || this[Direction.backward].shouldClip;
        },
        enumerable: true,
        configurable: true
    });
    return ClipModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var checkDatasource = function (datasource) {
    if (!datasource) {
        throw new Error('No datasource provided');
    }
    if (!('get' in datasource)) {
        throw new Error('Datasource get method is not implemented');
    }
    if (typeof datasource.get !== 'function') {
        throw new Error('Datasource get is not a function');
    }
    if (datasource.get.length < 2) {
        throw new Error('Datasource get method invalid signature');
    }
    return datasource;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Workflow = /** @class */ (function () {
    function Workflow(context) {
        var _this = this;
        this.count = 0;
        this.countDone = 0;
        this.resolver = Observable$1.create(function (_observer) { return _this.observer = _observer; });
        this.bindData = function () {
            _this.next = true;
            context.changeDetector.markForCheck();
        };
        this.datasource = checkDatasource(context.datasource);
        this.settings = new Settings(context.datasource.settings);
        this.viewport = new Viewport(context.elementRef, this.settings);
        this.buffer = new Buffer();
        this.fetch = new FetchModel();
        this.clip = new ClipModel();
    }
    /**
     * @return {?}
     */
    Workflow.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.pending = false;
        this.direction = null;
        this.next = false;
        this.fetch.reset();
        this.clip = new ClipModel();
    };
    /**
     * @param {?=} direction
     * @return {?}
     */
    Workflow.prototype.start = /**
     * @param {?=} direction
     * @return {?}
     */
    function (direction) {
        this.count++;
        this.log("---=== Workflow " + this.count + " run");
        this.reset();
        this.pending = true;
        this.direction = direction || null;
        return Promise.resolve(this);
    };
    /**
     * @return {?}
     */
    Workflow.prototype.continue = /**
     * @return {?}
     */
    function () {
        return Promise.resolve(this);
    };
    /**
     * @return {?}
     */
    Workflow.prototype.finalize = /**
     * @return {?}
     */
    function () {
        // stop 1 cycle
    };
    /**
     * @return {?}
     */
    Workflow.prototype.end = /**
     * @return {?}
     */
    function () {
        this.pending = false;
        this.countDone++;
        this.viewport.saveScrollPosition();
        this.finalize();
    };
    /**
     * @return {?}
     */
    Workflow.prototype.done = /**
     * @return {?}
     */
    function () {
        this.log("---=== Workflow " + this.count + " done");
        this.end();
        this.observer.next(this.next);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    Workflow.prototype.fail = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.log("---=== Workflow " + this.count + " fail");
        this.end();
        this.observer.error(error);
    };
    /**
     * @return {?}
     */
    Workflow.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.observer.complete();
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    Workflow.prototype.log = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.settings.debug) {
            console.log.apply(this, args);
        }
    };
    return Workflow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ShouldFetch = /** @class */ (function () {
    function ShouldFetch() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    ShouldFetch.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        if (workflow.direction !== Direction.backward) {
            ShouldFetch.shouldFetchByDirection(Direction.forward, workflow);
        }
        if (workflow.direction !== Direction.forward) {
            ShouldFetch.shouldFetchByDirection(Direction.backward, workflow);
        }
        return Promise.resolve(workflow);
    };
    /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    ShouldFetch.shouldFetchByDirection = /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (direction, workflow) {
        var /** @type {?} */ paddingEdge = workflow.viewport.padding[direction].getEdge();
        var /** @type {?} */ limit = workflow.viewport.getLimit(direction);
        if ((direction === Direction.forward && workflow.buffer.eof) ||
            (direction === Direction.backward && workflow.buffer.bof)) {
            workflow.fetch[direction].shouldFetch = false;
        }
        else {
            workflow.fetch[direction].shouldFetch =
                (direction === Direction.forward) ? paddingEdge < limit : paddingEdge > limit;
        }
        if (workflow.fetch[direction].shouldFetch) {
            ShouldFetch.setStartIndex(direction, workflow);
        }
    };
    /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    ShouldFetch.setStartIndex = /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (direction, workflow) {
        var /** @type {?} */ forward = direction === Direction.forward;
        var /** @type {?} */ back = -workflow.settings.bufferSize;
        var /** @type {?} */ start;
        if (workflow.buffer.lastIndex[direction] === null) {
            start = workflow.settings.startIndex + (forward ? 0 : back);
        }
        else {
            start = workflow.buffer.lastIndex[direction] + (forward ? 1 : back);
        }
        workflow.fetch[direction].startIndex = start;
    };
    return ShouldFetch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Fetch = /** @class */ (function () {
    function Fetch() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    Fetch.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        var /** @type {?} */ result = [];
        if (workflow.fetch[Direction.backward].shouldFetch) {
            result.push(Fetch.fetchByDirection(Direction.backward, workflow));
        }
        if (workflow.fetch[Direction.forward].shouldFetch) {
            result.push(Fetch.fetchByDirection(Direction.forward, workflow));
        }
        return Promise.all(result).then(function () { return workflow; });
    };
    /**
     * @param {?} data
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    Fetch.success = /**
     * @param {?} data
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (data, direction, workflow) {
        workflow.log("resolved " + data.length + " " + direction + " items " +
            ("(index = " + workflow.fetch[direction].startIndex + ", count = " + workflow.settings.bufferSize + ")"));
        workflow.fetch[direction].newItemsData = data;
    };
    /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    Fetch.fetchByDirection = /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (direction, workflow) {
        var /** @type {?} */ result = new Promise(function (resolve, reject) {
            var /** @type {?} */ success = function (data) {
                Fetch.success(data, direction, workflow);
                resolve(true);
            };
            var /** @type {?} */ _get = /** @type {?} */ (workflow.datasource.get);
            var /** @type {?} */ _getResult = _get(workflow.fetch[direction].startIndex, workflow.settings.bufferSize, success, reject);
            if (_getResult && typeof _getResult.then === 'function') {
                // DatasourceGetPromise
                _getResult.then(success, reject);
            }
            else if (_getResult && typeof _getResult.subscribe === 'function') {
                // DatasourceGetObservable
                _getResult.subscribe(success, reject);
            }
        });
        return result;
    };
    return Fetch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Item = /** @class */ (function () {
    function Item($index, data, nodeId) {
        this.$index = $index;
        this.data = data;
        this.nodeId = nodeId;
        this.invisible = true;
    }
    /**
     * @return {?}
     */
    Item.prototype.getParams = /**
     * @return {?}
     */
    function () {
        return Routines.getParams(this.element);
    };
    /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    Item.prototype.getEdge = /**
     * @param {?} direction
     * @param {?=} opposite
     * @return {?}
     */
    function (direction, opposite) {
        return Routines.getEdge(this.element, direction, opposite);
    };
    /**
     * @return {?}
     */
    Item.prototype.hide = /**
     * @return {?}
     */
    function () {
        Routines.hideElement(this.element);
    };
    return Item;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProcessFetch = /** @class */ (function () {
    function ProcessFetch() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    ProcessFetch.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        ProcessFetch.runByDirection(workflow, Direction.backward);
        ProcessFetch.runByDirection(workflow, Direction.forward);
        return workflow;
    };
    /**
     * @param {?} workflow
     * @param {?} direction
     * @return {?}
     */
    ProcessFetch.runByDirection = /**
     * @param {?} workflow
     * @param {?} direction
     * @return {?}
     */
    function (workflow, direction) {
        var /** @type {?} */ fetch = workflow.fetch[direction];
        if (!fetch.newItemsData) {
            // no fetch
            return;
        }
        var /** @type {?} */ eof = direction === Direction.forward ? 'eof' : 'bof';
        workflow.buffer[eof] = fetch.newItemsData.length !== workflow.settings.bufferSize;
        if (!fetch.newItemsData.length) {
            // empty result
            return;
        }
        fetch.items = fetch.newItemsData.map(function (item, index) {
            var /** @type {?} */ $index = fetch.startIndex + index;
            var /** @type {?} */ nodeId = workflow.settings.itemIdPrefix + String($index);
            return new Item($index, item, nodeId);
        });
        if (direction === Direction.forward) {
            workflow.buffer.items = workflow.buffer.items.concat(fetch.items);
        }
        else {
            workflow.buffer.items = fetch.items.concat(workflow.buffer.items);
        }
    };
    return ProcessFetch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Render = /** @class */ (function () {
    function Render() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    Render.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        if (!workflow.fetch.hasNewItems) {
            return workflow;
        }
        workflow.bindData();
        return new Promise(function (resolve, reject) {
            return setTimeout(function () {
                var /** @type {?} */ error = Render.setElements(workflow);
                if (!error) {
                    resolve(workflow);
                }
                else {
                    reject(error);
                }
            });
        });
    };
    /**
     * @param {?} workflow
     * @return {?}
     */
    Render.setElements = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        var /** @type {?} */ items = workflow.fetch.items;
        for (var /** @type {?} */ j = items.length - 1; j >= 0; j--) {
            var /** @type {?} */ nodes = workflow.viewport.children;
            for (var /** @type {?} */ i = nodes.length - 1; i >= 0; i--) {
                if (nodes[i].id === items[j].nodeId) {
                    items[j].element = nodes[i];
                }
            }
            if (!items[j].element) {
                // todo: do we really need this check?
                return new Error('Can not associate item with element');
            }
        }
    };
    return Render;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AdjustFetch = /** @class */ (function () {
    function AdjustFetch() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    AdjustFetch.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        AdjustFetch.runByDirection(Direction.forward, workflow);
        AdjustFetch.runByDirection(Direction.backward, workflow);
        return workflow;
    };
    /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    AdjustFetch.runByDirection = /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (direction, workflow) {
        var /** @type {?} */ items = workflow.fetch[direction].items;
        if (!items) {
            return;
        }
        AdjustFetch.processFetchedItems(items);
        var /** @type {?} */ height = Math.abs(items[0].element.getBoundingClientRect().top -
            items[items.length - 1].element.getBoundingClientRect().bottom);
        if (direction === Direction.forward) {
            return this.adjustForward(workflow, height);
        }
        else {
            return this.adjustBackward(workflow, height);
        }
    };
    /**
     * @param {?} items
     * @return {?}
     */
    AdjustFetch.processFetchedItems = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        for (var /** @type {?} */ i = items.length - 1; i >= 0; i--) {
            var /** @type {?} */ element = items[i].element.children[0];
            element.style.left = '';
            element.style.position = '';
            items[i].invisible = false;
        }
    };
    /**
     * @param {?} workflow
     * @param {?} size
     * @return {?}
     */
    AdjustFetch.adjustForward = /**
     * @param {?} workflow
     * @param {?} size
     * @return {?}
     */
    function (workflow, size) {
        var /** @type {?} */ paddingForward = workflow.viewport.padding[Direction.forward];
        var /** @type {?} */ _paddingSize = paddingForward.size || 0;
        paddingForward.size = Math.max(_paddingSize - size, 0);
    };
    /**
     * @param {?} workflow
     * @param {?} size
     * @return {?}
     */
    AdjustFetch.adjustBackward = /**
     * @param {?} workflow
     * @param {?} size
     * @return {?}
     */
    function (workflow, size) {
        var /** @type {?} */ viewport = workflow.viewport;
        var /** @type {?} */ _scrollPosition = viewport.scrollPosition;
        var /** @type {?} */ paddingBackward = viewport.padding[Direction.backward];
        var /** @type {?} */ paddingForward = viewport.padding[Direction.forward];
        // need to make "size" pixels in backward direction
        // 1) via paddingTop
        var /** @type {?} */ _paddingSize = paddingBackward.size || 0;
        var /** @type {?} */ paddingSize = Math.max(_paddingSize - size, 0);
        paddingBackward.size = paddingSize;
        var /** @type {?} */ paddingDiff = size - (_paddingSize - paddingSize);
        // 2) via scrollTop
        if (paddingDiff > 0) {
            size = paddingDiff;
            viewport.scrollPosition += size;
            var /** @type {?} */ diff = size - viewport.scrollPosition - _scrollPosition;
            if (diff > 0) {
                paddingSize = paddingForward.size || 0;
                paddingForward.size = paddingSize + diff;
                viewport.scrollPosition += diff;
            }
        }
    };
    return AdjustFetch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ShouldClip = /** @class */ (function () {
    function ShouldClip() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    ShouldClip.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        if (workflow.settings.clipAfterFetchOnly && !workflow.fetch.shouldFetch) {
            return workflow;
        }
        // todo think about optimization for case of scrolling
        ShouldClip.shouldClipByDirection(Direction.forward, workflow);
        ShouldClip.shouldClipByDirection(Direction.backward, workflow);
        return workflow;
    };
    /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    ShouldClip.shouldClipByDirection = /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (direction, workflow) {
        var /** @type {?} */ items = workflow.buffer.items;
        if (!items.length) {
            return false;
        }
        var /** @type {?} */ forward = direction === Direction.forward;
        var /** @type {?} */ viewport = workflow.viewport;
        var /** @type {?} */ viewportLimit = viewport.getLimit(direction, true);
        var /** @type {?} */ firstIndex = workflow.buffer.getFirstVisibleItemIndex();
        var /** @type {?} */ lastIndex = workflow.buffer.getLastVisibleItemIndex();
        var /** @type {?} */ firstItemEdge = items[firstIndex].getEdge(direction);
        var /** @type {?} */ lastItemEdge = items[lastIndex].getEdge(direction);
        var /** @type {?} */ i, /** @type {?} */ itemEdge, /** @type {?} */ start = -1, /** @type {?} */ end = -1;
        var /** @type {?} */ getItemEdge = function (index) {
            return index === firstIndex ? firstItemEdge : (index === lastIndex ? lastItemEdge :
                items[index].getEdge(direction));
        };
        if ((forward && lastItemEdge <= viewportLimit) || (!forward && firstItemEdge >= viewportLimit)) {
            // all items should be clipped
            start = firstIndex;
            end = lastIndex;
        }
        else {
            if (forward) {
                start = firstIndex;
            }
            else {
                end = lastIndex;
            }
            for (forward ? (i = 0) : (i = lastIndex); forward ? (i <= lastIndex) : (i >= 0); forward ? i++ : i--) {
                itemEdge = getItemEdge(i);
                if (forward && itemEdge <= viewportLimit) {
                    end = i;
                }
                else if (!forward && itemEdge >= viewportLimit) {
                    start = i;
                }
                else {
                    break;
                }
            }
        }
        if (start >= 0 && end >= 0) {
            for (i = start; i <= end; i++) {
                items[i].toRemove = true;
            }
            workflow.clip[direction].shouldClip = true;
            workflow.clip[direction].size =
                items[end].getEdge(Direction.forward) - items[start].getEdge(Direction.backward);
        }
    };
    return ShouldClip;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Clip = /** @class */ (function () {
    function Clip() {
    }
    /**
     * @param {?} workflow
     * @return {?}
     */
    Clip.run = /**
     * @param {?} workflow
     * @return {?}
     */
    function (workflow) {
        if (!workflow.clip.shouldClip) {
            return workflow;
        }
        Clip.runByDirection(Direction.forward, workflow);
        Clip.runByDirection(Direction.backward, workflow);
        workflow.buffer.items = workflow.buffer.items.filter(function (item) {
            if (item.toRemove) {
                workflow.buffer.cache.add(item);
                item.hide();
                return false;
            }
            return true;
        });
        workflow.bindData();
        return new Promise(function (resolve, reject) {
            return setTimeout(function () {
                resolve(workflow);
            });
        });
    };
    /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    Clip.runByDirection = /**
     * @param {?} direction
     * @param {?} workflow
     * @return {?}
     */
    function (direction, workflow) {
        if (!workflow.clip[direction].shouldClip) {
            return;
        }
        var /** @type {?} */ opposite = direction === Direction.forward ? Direction.backward : Direction.forward;
        workflow.viewport.padding[opposite].size += workflow.clip[direction].size;
    };
    return Clip;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var WorkflowRunner = /** @class */ (function () {
    function WorkflowRunner(context) {
        this.count = 0;
        this.defaultDirection = Direction.forward;
        this.context = context;
        this.workflow = new Workflow(this.context);
        this.initialize();
    }
    /**
     * @return {?}
     */
    WorkflowRunner.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ flow = this.workflow;
        var /** @type {?} */ onScroll = function ($event) { return _this.scroll($event); };
        this.onScrollListener = this.context.renderer.listen(flow.viewport.scrollable, 'scroll', onScroll);
        this.itemsSubscription = flow.buffer.$items.subscribe(function (items) { return _this.context.items = items; });
        this.flowResolverSubscription = flow.resolver.subscribe(this.resolve.bind(this));
        this.run();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    WorkflowRunner.prototype.scroll = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.workflow.viewport.syntheticScrollPosition !== null) {
            if (this.workflow.viewport.scrollPosition === this.workflow.viewport.syntheticScrollPosition) {
                this.workflow.viewport.syntheticScrollPosition = null;
                return;
            }
            this.workflow.viewport.syntheticScrollPosition = null;
        }
        // debouncedRound(() => this.run(direction), 25);
        this.run();
    };
    /**
     * @param {?} next
     * @return {?}
     */
    WorkflowRunner.prototype.resolve = /**
     * @param {?} next
     * @return {?}
     */
    function (next) {
        if (this.newDirection) {
            this.run(this.newDirection);
            this.newDirection = null;
        }
        else if (next) {
            this.run(this.workflow.direction);
        }
        else if (this.directionQueue) {
            this.run(this.directionQueue);
            this.directionQueue = null;
        }
        else {
            this.count++;
            this.finalize();
        }
    };
    /**
     * @param {?=} direction
     * @return {?}
     */
    WorkflowRunner.prototype.run = /**
     * @param {?=} direction
     * @return {?}
     */
    function (direction) {
        var _this = this;
        if (!direction) {
            direction = this.defaultDirection;
            this.directionQueue =
                direction === Direction.forward ? Direction.backward : Direction.forward;
        }
        if (this.workflow.pending) {
            this.newDirection = direction;
            return;
        }
        this.workflow.start(direction)
            .then(function () { return _this.fetch(); })
            .then(function () { return _this.clip(); })
            .then(function () {
            return _this.workflow.done();
        })
            .catch(function (error) {
            return _this.workflow.fail(error);
        });
    };
    /**
     * @return {?}
     */
    WorkflowRunner.prototype.fetch = /**
     * @return {?}
     */
    function () {
        return this.workflow.continue()
            .then(ShouldFetch.run)
            .then(Fetch.run)
            .then(ProcessFetch.run)
            .then(Render.run)
            .then(AdjustFetch.run);
    };
    /**
     * @return {?}
     */
    WorkflowRunner.prototype.clip = /**
     * @return {?}
     */
    function () {
        return this.workflow.settings.infinite ?
            null :
            this.workflow.continue()
                .then(ShouldClip.run)
                .then(Clip.run);
    };
    /**
     * @return {?}
     */
    WorkflowRunner.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.onScrollListener();
        this.itemsSubscription.unsubscribe();
        this.flowResolverSubscription.unsubscribe();
        this.workflow.dispose();
    };
    /**
     * @return {?}
     */
    WorkflowRunner.prototype.finalize = /**
     * @return {?}
     */
    function () {
        // stop queue
    };
    return WorkflowRunner;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UiScrollComponent = /** @class */ (function () {
    function UiScrollComponent(changeDetector, elementRef, renderer) {
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    UiScrollComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.workflowRunner = new WorkflowRunner(this);
    };
    /**
     * @return {?}
     */
    UiScrollComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.workflowRunner.dispose();
    };
    UiScrollComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ui-scroll',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div data-padding-backward></div>\n<div *ngFor=\"let item of items\" id=\"{{item.nodeId}}\">\n  <div [style.position]=\"item.invisible ? 'fixed' : null\" [style.left]=\"item.invisible ? '-99999px' : null\" >\n    <ng-template\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{\n        $implicit: item.data,\n        index: item.$index\n     }\">\n    </ng-template>\n  </div>\n</div>\n<div data-padding-forward></div>\n"
                },] },
    ];
    /** @nocollapse */
    UiScrollComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    return UiScrollComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UiScrollDirective = /** @class */ (function () {
    function UiScrollDirective(templateRef, viewContainer, resolver) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.resolver = resolver;
    }
    Object.defineProperty(UiScrollDirective.prototype, "uiScrollOf", {
        set: /**
         * @param {?} datasource
         * @return {?}
         */
        function (datasource) {
            this.datasource = datasource;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    UiScrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ templateView = this.templateRef.createEmbeddedView({});
        var /** @type {?} */ compFactory = this.resolver.resolveComponentFactory(UiScrollComponent);
        var /** @type {?} */ componentRef = this.viewContainer.createComponent(compFactory, null, this.viewContainer.injector, [templateView.rootNodes]);
        componentRef.instance.datasource = this.datasource;
        componentRef.instance.template = this.templateRef;
    };
    UiScrollDirective.decorators = [
        { type: Directive, args: [{ selector: '[uiScroll][uiScrollOf]' },] },
    ];
    /** @nocollapse */
    UiScrollDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ComponentFactoryResolver, },
    ]; };
    UiScrollDirective.propDecorators = {
        "uiScrollOf": [{ type: Input },],
    };
    return UiScrollDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UiScrollModule = /** @class */ (function () {
    function UiScrollModule() {
    }
    UiScrollModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        UiScrollComponent,
                        UiScrollDirective
                    ],
                    imports: [CommonModule],
                    entryComponents: [UiScrollComponent],
                    exports: [UiScrollDirective],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    UiScrollModule.ctorParameters = function () { return []; };
    return UiScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { UiScrollModule, UiScrollComponent as ɵa, UiScrollDirective as ɵb };
//# sourceMappingURL=ngx-ui-scroll.js.map
