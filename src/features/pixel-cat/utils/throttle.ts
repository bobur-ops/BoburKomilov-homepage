export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastRan = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    if (!lastRan) {
      func.apply(this, args);
      lastRan = now;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(
        () => {
          if (now - lastRan >= delay) {
            func.apply(this, args);
            lastRan = now;
          }
        },
        delay - (now - lastRan)
      );
    }
  };
}
