import { disableAllScrolling, enableAllScrolling } from '../utils';

describe('utils scrolling', () => {
  beforeEach(() => {
    // reset styles and globals
    document.body.style.cssText = '';
    document.documentElement.style.cssText = '' as any;
    (document.body as any)._modifiedElements = undefined;
    (document.body as any)._originalScrollY = undefined;
    (document.body as any)._originalScrollX = undefined;
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    // mock scroll position
    Object.defineProperty(window, 'scrollY', { value: 123, configurable: true });
    Object.defineProperty(window, 'scrollX', { value: 45, configurable: true });
  });
  afterEach(() => {
    (window.scrollTo as jest.Mock).mockRestore?.();
  });

  test('disableAllScrolling sets styles and stores positions', () => {
    // add a scrollable element
    const div = document.createElement('div');
    div.style.overflow = 'auto';
    document.body.appendChild(div);

    // computed style mock
    jest.spyOn(window, 'getComputedStyle').mockImplementation((elt: Element) => {
      return {
        overflow: (elt as HTMLElement).style.overflow || 'auto',
        overflowX: (elt as HTMLElement).style.overflowX || 'auto',
      } as any;
    });

    disableAllScrolling();

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-123px');
    expect(document.body.style.left).toBe('-45px');
    expect(document.documentElement.style.overflow).toBe('hidden');

    const modified = (document.body as any)._modifiedElements;
    expect(Array.isArray(modified)).toBe(true);
    expect(modified.length).toBeGreaterThanOrEqual(1);
    expect((modified[0] as any)._originalOverflow).toBe('auto');
  });

  test('enableAllScrolling restores styles and scroll position', () => {
    // prepare state similar to after disableAllScrolling
    const div = document.createElement('div');
    document.body.appendChild(div);
    (div as any)._originalOverflow = 'auto';
    (document.body as any)._modifiedElements = [div];
    (document.body as any)._originalScrollY = 200;
    (document.body as any)._originalScrollX = 10;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    enableAllScrolling();

    // body/html reset
    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
    // modified element restored
    expect(div.style.overflow).toBe('auto');
    // scroll restored
    expect(window.scrollTo).toHaveBeenCalledWith(10, 200);
  });

  test('force re-enable sets overflow to auto for hidden elements (line 84)', () => {
    // element with inline overflow style so it is selected by querySelectorAll
    const div = document.createElement('div');
    div.setAttribute('style', 'overflow: hidden;');
    document.body.appendChild(div);

    // ensure getComputedStyle reports hidden to trigger the code path
    const spy = jest.spyOn(window, 'getComputedStyle').mockImplementation((elt: Element) => {
      return { overflow: 'hidden' } as any;
    });

    enableAllScrolling();

    expect(div.style.overflow).toBe('auto');

    spy.mockRestore();
  });
});
