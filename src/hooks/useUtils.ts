export const useUtils = () => {
  const isTouchDevice = (): boolean => {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = (query: string): boolean => window.matchMedia(query).matches;

    if (
      ('ontouchstart' in window) ||
      (window as any).DocumentTouch &&
      document instanceof (window as any).DocumentTouch
    ) {
      return true;
    }

    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  };

  return {
    isTouchDevice,
  };
};
