import { TestBed, ComponentFixtureAutoDetect, async, tick, fakeAsync } from '@angular/core/testing';

import { UiScrollModule } from '../src/ui-scroll.module';
import { TestedComponent } from './helpers/testedComponent';
import { Misc } from './helpers/misc';
import { Direction } from '../src/component/interfaces/direction';

describe('Common tests', () => {
  let misc: Misc;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiScrollModule],
      declarations: [TestedComponent],
      providers: [{
        provide: ComponentFixtureAutoDetect,
        useValue: true
      }]
    });
    misc = new Misc(TestBed.createComponent(TestedComponent));
  }));

  it('should initialize', () => {
    expect(misc.component).not.toBeNull();
    expect(misc.datasource).toEqual(jasmine.any(Object));
    expect(misc.datasource.get).toEqual(jasmine.any(Function));
    expect(misc.hostElement).not.toBeFalsy();
    expect(misc.padding[Direction.backward].element).not.toBeFalsy();
    expect(misc.padding[Direction.forward].element).not.toBeFalsy();
  });

  it('should create tags: data-padding-backward and data-padding-forward', () => {
    expect(misc.padding[Direction.backward].style.height).toEqual('0px');
    expect(misc.padding[Direction.forward].style.height).toEqual('0px');
  });

  it('should contain only items with id from -4 up to 10', async(() => {
    const firstId = -4;
    const lastId = 10;
    for (let id = firstId; id <= lastId; id++) {
      const elem = misc.elementByAttr(`[id="ui-scroll-0-${id}"]`);
      const a = 0;
      expect(elem.name).toEqual('div');
      expect(elem.nativeElement.textContent).toMatch(`${id} : item #${id}`);
      // expect(elem.childNodes[1].styles.position).toBeNull();
      // expect(elem.childNodes[1].styles.left).toBeNull();
    }

    expect(misc.elementByAttr(`[id="i-0-${firstId - 1}"]`)).toBeFalsy();
    expect(misc.elementByAttr(`[id="i-0-${lastId + 1}"]`)).toBeFalsy();
  }));

/*  it('should simulate scroll to top, and contain items with id from ??? up to ???', fakeAsync(() => {
    const uiScroll = misc.elementByAttr('ui-scroll').parent;
    const eventListener = uiScroll.listeners.find(e => e.name === 'scroll');
    uiScroll.nativeElement.scrollTop = 0;
    eventListener.callback('top');

    // fixture.whenStable().then(() => {
    //   fixture.detectChanges();
    //   tick(25);
    //   fixture.detectChanges();
    //
    //   const firstId = 81;
    //   const lastId = 95;
    //   for (let id = firstId; id <= lastId; id++) {
    //     const elem = elementByAttr(`[id="i-0-${id}"]`);
    //     expect(elem.name).toEqual('div');
    //     expect(elem.nativeElement.textContent).toMatch(`${id} : item #${id}`);
    //     expect(elem.childNodes[1].styles.position).toBeNull();
    //     expect(elem.childNodes[1].styles.left).toBeNull();
    //   }
    //
    //   expect(elementByAttr('[data-padding-backward]').nativeElement.style.height).toEqual('0px');
    //   expect(elementByAttr('[data-padding-forward]').nativeElement.style.height).toEqual('72px');
    //   expect(elementByAttr(`[id="i-0-${firstId - 1}"]`)).toBeNull();
    //   expect(elementByAttr(`[id="i-0-${lastId + 1}"]`)).toBeNull();
    // });
  }));

  it('should simulate scroll to bottom, and contain items with id from ??? up to ???', fakeAsync(() => {
    const uiScroll = misc.elementByAttr('ui-scroll').parent;
    const eventListener = uiScroll.listeners.find(e => e.name === 'scroll');
    uiScroll.nativeElement.scrollTop = uiScroll.nativeElement.scrollHeight - uiScroll.nativeElement.clientHeight;
    eventListener.callback('bottom');

    // fixture.whenStable().then(() => {
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();
    //
    //   const firstId = 90;
    //   const lastId = 104;
    //   for (let id = firstId; id <= lastId; id++) {
    //     const elem = elementByAttr(`[id="i-0-${id}"]`);
    //     expect(elem.name).toEqual('div');
    //     expect(elem.nativeElement.textContent).toMatch(`${id} : item #${id}`);
    //     expect(elem.childNodes[1].styles.position).toBeNull();
    //     expect(elem.childNodes[1].styles.left).toBeNull();
    //   }
    //   expect(elementByAttr('[data-padding-backward]').nativeElement.style.height).toEqual('90px');
    //   expect(elementByAttr('[data-padding-forward]').nativeElement.style.height).toEqual('0px');
    //   expect(elementByAttr(`[id="i-0-${firstId - 1}"]`)).toBeNull();
    //   expect(elementByAttr(`[id="i-0-${lastId + 1}"]`)).toBeNull();
    // });
  }));*/
});