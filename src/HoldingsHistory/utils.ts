export const disableAllScrolling = () => {
  // Store original scroll position
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  
  // Remove focus from any focused element to prevent aria-hidden conflicts
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
  
  // Disable scrolling on body and html
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = `-${scrollX}px`;
  document.body.style.width = '100%';
  document.documentElement.style.overflow = 'hidden';
  
  // Also disable scrolling on any scrollable containers
  const scrollableElements = document.querySelectorAll('[style*="overflow"], [style*="overflow-x"], [style*="overflow-y"]');
  const modifiedElements: HTMLElement[] = [];
  
  scrollableElements.forEach((el) => {
    const element = el as HTMLElement;
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.overflow !== 'hidden' && 
        (computedStyle.overflow === 'auto' || computedStyle.overflow === 'scroll' ||
         computedStyle.overflowX === 'auto' || computedStyle.overflowX === 'scroll')) {
      
      // Store original overflow before changing it
      (element as any)._originalOverflow = element.style.overflow || computedStyle.overflow;
      element.style.overflow = 'hidden';
      modifiedElements.push(element);
    }
  });
  
  // Store the list of modified elements for restoration
  (document.body as any)._modifiedElements = modifiedElements;
  
  // Store scroll position for restoration
  (document.body as any)._originalScrollY = scrollY;
  (document.body as any)._originalScrollX = scrollX;
};

export const enableAllScrolling = () => {
  // Restore scroll position
  const scrollY = (document.body as any)._originalScrollY || 0;
  const scrollX = (document.body as any)._originalScrollX || 0;
  
  // Re-enable scrolling
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.width = '';
  document.documentElement.style.overflow = '';
  
  // Restore original overflow styles on modified elements
  const modifiedElements = (document.body as any)._modifiedElements || [];
  modifiedElements.forEach((element: HTMLElement) => {
    if (element && (element as any)._originalOverflow !== undefined) {
      element.style.overflow = (element as any)._originalOverflow;
      delete (element as any)._originalOverflow;
    }
  });
  
  // Clean up the modified elements list
  delete (document.body as any)._modifiedElements;
  
  // Restore scroll position immediately
  window.scrollTo(scrollX, scrollY);
  
  // Clean up
  delete (document.body as any)._originalScrollY;
  delete (document.body as any)._originalScrollX;
  
  // Force re-enable scrolling on TableMain containers specifically
  const tableMainContainers = document.querySelectorAll('[style*="overflow"]');
  tableMainContainers.forEach((el) => {
    const element = el as HTMLElement;
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.overflow === 'hidden') {
      // Force the element to re-evaluate its overflow style
      element.style.overflow = 'auto';
    }
  });
};
