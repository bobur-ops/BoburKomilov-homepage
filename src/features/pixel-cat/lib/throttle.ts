export const throttle = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  wait: number,
): ((...args: TArgs) => void) => {
  let lastRun = 0;

  return (...args: TArgs): void => {
    const now = Date.now();
    if (now - lastRun < wait) return;
    lastRun = now;
    callback(...args);
  };
};
