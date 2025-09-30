import { disableAllScrolling, enableAllScrolling } from '../utils';

// Mock DOM methods
const mockScrollTo = jest.fn();
const mockQuerySelectorAll = jest.fn();
const mockGetComputedStyle = jest.fn();

// Mock window and document globals
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

Object.defineProperty(window, 'scrollY', {
  value: 100,
  writable: true,
});

Object.defineProperty(window, 'scrollX', {
  value: 50,
  writable: true,
});

Object.defineProperty(window, 'getComputedStyle', {
  value: mockGetComputedStyle,
  writable: true,
});

Object.defineProperty(document, 'querySelectorAll', {
  value: mockQuerySelectorAll,
  writable: true,
});

describe('utils.ts', () => {
  let mockBody: any;
  let mockDocumentElement: any;
  let mockActiveElement: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock document.body
    mockBody = {
      style: {},
      blur: jest.fn(),
    };
    
    // Mock document.documentElement
    mockDocumentElement = {
      style: {},
    };
    
    // Mock active element
    mockActiveElement = {
      blur: jest.fn(),
    };
    
    Object.defineProperty(document, 'body', {
      value: mockBody,
      writable: true,
      configurable: true,
    });
    
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
      configurable: true,
    });
    
    Object.defineProperty(document, 'activeElement', {
      value: mockActiveElement,
      writable: true,
      configurable: true,
    });

    // Reset window scroll values
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    Object.defineProperty(window, 'scrollX', { value: 50, writable: true });
    
    // Reset getComputedStyle mock
    Object.defineProperty(window, 'getComputedStyle', {
      value: mockGetComputedStyle,
      writable: true,
      configurable: true,
    });
    
    // Default mock implementations
    mockQuerySelectorAll.mockReturnValue([]);
    mockGetComputedStyle.mockReturnValue({ overflow: 'visible' });
  });

  afterEach(() => {
    // Clean up any modifications to document.body
    delete (mockBody as any)._modifiedElements;
    delete (mockBody as any)._originalScrollY;
    delete (mockBody as any)._originalScrollX;
  });

  describe('disableAllScrolling', () => {
    test('should store original scroll position', () => {
      disableAllScrolling();
      
      expect((mockBody as any)._originalScrollY).toBe(100);
      expect((mockBody as any)._originalScrollX).toBe(50);
    });

    test('should blur active element if present', () => {
      disableAllScrolling();
      
      expect(mockActiveElement.blur).toHaveBeenCalled();
    });

    test('should handle missing active element gracefully', () => {
      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true,
        configurable: true,
      });
      
      expect(() => disableAllScrolling()).not.toThrow();
    });

    test('should set body styles to disable scrolling', () => {
      disableAllScrolling();
      
      expect(mockBody.style.overflow).toBe('hidden');
      expect(mockBody.style.position).toBe('fixed');
      expect(mockBody.style.top).toBe('-100px');
      expect(mockBody.style.left).toBe('-50px');
      expect(mockBody.style.width).toBe('100%');
    });

    test('should set document element overflow to hidden', () => {
      disableAllScrolling();
      
      expect(mockDocumentElement.style.overflow).toBe('hidden');
    });

    test('should disable scrolling on scrollable elements', () => {
      const mockElement1 = {
        style: { overflow: 'auto' },
      };
      const mockElement2 = {
        style: { overflow: 'scroll' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockElement1, mockElement2]);
      mockGetComputedStyle
        .mockReturnValueOnce({ overflow: 'auto', overflowX: 'visible' })
        .mockReturnValueOnce({ overflow: 'scroll', overflowX: 'visible' });
      
      disableAllScrolling();
      
      expect(mockElement1.style.overflow).toBe('hidden');
      expect(mockElement2.style.overflow).toBe('hidden');
      expect((mockElement1 as any)._originalOverflow).toBe('auto');
      expect((mockElement2 as any)._originalOverflow).toBe('scroll');
    });

    test('should handle elements with overflowX scroll', () => {
      const mockElement = {
        style: { overflow: '' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockElement]);
      mockGetComputedStyle.mockReturnValue({ 
        overflow: 'visible', 
        overflowX: 'auto' 
      });
      
      disableAllScrolling();
      
      expect(mockElement.style.overflow).toBe('hidden');
      expect((mockElement as any)._originalOverflow).toBe('visible');
    });

    test('should skip elements that are already hidden', () => {
      const mockElement = {
        style: { overflow: 'hidden' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockElement]);
      mockGetComputedStyle.mockReturnValue({ 
        overflow: 'hidden', 
        overflowX: 'hidden' 
      });
      
      disableAllScrolling();
      
      expect((mockElement as any)._originalOverflow).toBeUndefined();
    });

    test('should store modified elements list', () => {
      const mockElement = {
        style: { overflow: 'auto' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockElement]);
      mockGetComputedStyle.mockReturnValue({ 
        overflow: 'auto', 
        overflowX: 'visible' 
      });
      
      disableAllScrolling();
      
      expect((mockBody as any)._modifiedElements).toEqual([mockElement]);
    });
  });

  describe('enableAllScrolling', () => {
    beforeEach(() => {
      // Set up body with stored values
      (mockBody as any)._originalScrollY = 200;
      (mockBody as any)._originalScrollX = 75;
    });

    test('should restore body styles', () => {
      enableAllScrolling();
      
      expect(mockBody.style.overflow).toBe('');
      expect(mockBody.style.position).toBe('');
      expect(mockBody.style.top).toBe('');
      expect(mockBody.style.left).toBe('');
      expect(mockBody.style.width).toBe('');
    });

    test('should restore document element overflow', () => {
      enableAllScrolling();
      
      expect(mockDocumentElement.style.overflow).toBe('');
    });

    test('should restore scroll position', () => {
      enableAllScrolling();
      
      expect(mockScrollTo).toHaveBeenCalledWith(75, 200);
    });

    test('should handle missing stored scroll values', () => {
      delete (mockBody as any)._originalScrollY;
      delete (mockBody as any)._originalScrollX;
      
      enableAllScrolling();
      
      expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    });

    test('should restore original overflow styles on modified elements', () => {
      const mockElement1 = {
        style: { overflow: 'hidden' },
        _originalOverflow: 'auto',
      };
      const mockElement2 = {
        style: { overflow: 'hidden' },
        _originalOverflow: 'scroll',
      };
      
      (mockBody as any)._modifiedElements = [mockElement1, mockElement2];
      
      enableAllScrolling();
      
      expect(mockElement1.style.overflow).toBe('auto');
      expect(mockElement2.style.overflow).toBe('scroll');
      expect((mockElement1 as any)._originalOverflow).toBeUndefined();
      expect((mockElement2 as any)._originalOverflow).toBeUndefined();
    });

    test('should handle missing modified elements gracefully', () => {
      delete (mockBody as any)._modifiedElements;
      
      expect(() => enableAllScrolling()).not.toThrow();
    });

    test('should handle null elements in modified elements list', () => {
      (mockBody as any)._modifiedElements = [null, undefined];
      
      expect(() => enableAllScrolling()).not.toThrow();
    });

    test('should clean up stored values', () => {
      (mockBody as any)._modifiedElements = [];
      
      enableAllScrolling();
      
      expect((mockBody as any)._modifiedElements).toBeUndefined();
      expect((mockBody as any)._originalScrollY).toBeUndefined();
      expect((mockBody as any)._originalScrollX).toBeUndefined();
    });

    test('should force re-enable scrolling on table containers', () => {
      const mockTableElement = {
        style: { overflow: 'hidden' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockTableElement]);
      mockGetComputedStyle.mockReturnValue({ overflow: 'hidden' });
      
      enableAllScrolling();
      
      expect(mockTableElement.style.overflow).toBe('auto');
    });

    test('should handle missing getComputedStyle gracefully', () => {
      const mockTableElement = {
        style: { overflow: 'hidden' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockTableElement]);
      Object.defineProperty(window, 'getComputedStyle', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      
      expect(() => enableAllScrolling()).not.toThrow();
    });
  });

  describe('integration tests', () => {
    test('should work as a pair - disable then enable', () => {
      // Reset getComputedStyle mock
      Object.defineProperty(window, 'getComputedStyle', {
        value: mockGetComputedStyle,
        writable: true,
        configurable: true,
      });
      
      // Mock scrollable element
      const mockElement = {
        style: { overflow: 'auto' },
      };
      
      mockQuerySelectorAll.mockReturnValue([mockElement]);
      mockGetComputedStyle.mockReturnValue({ 
        overflow: 'auto', 
        overflowX: 'visible' 
      });
      
      // Disable scrolling
      disableAllScrolling();
      
      expect(mockBody.style.overflow).toBe('hidden');
      expect(mockElement.style.overflow).toBe('hidden');
      expect((mockElement as any)._originalOverflow).toBe('auto');
      
      // Enable scrolling
      enableAllScrolling();
      
      expect(mockBody.style.overflow).toBe('');
      expect(mockElement.style.overflow).toBe('auto');
      expect((mockElement as any)._originalOverflow).toBeUndefined();
      expect(mockScrollTo).toHaveBeenCalledWith(50, 100);
    });

    test('should handle multiple disable/enable cycles', () => {
      disableAllScrolling();
      enableAllScrolling();
      
      // Second cycle
      Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
      Object.defineProperty(window, 'scrollX', { value: 150, writable: true });
      
      disableAllScrolling();
      expect((mockBody as any)._originalScrollY).toBe(300);
      expect((mockBody as any)._originalScrollX).toBe(150);
      
      enableAllScrolling();
      expect(mockScrollTo).toHaveBeenLastCalledWith(150, 300);
    });
  });
});
