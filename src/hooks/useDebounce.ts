import { useEffect, useCallback, useRef } from 'react';

const useDebounce = (fn: Function, delay: number) => {
  const { current } = useRef({ fn, timer: 0 });

  useEffect(() => {
    current.fn = fn;
  }, [current, fn]);

  return useCallback(
    (...args) => {
      if (current.timer) {
        clearTimeout(current.timer);
      }

      current.timer = window.setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    },
    [current, delay],
  );
};

export default useDebounce;
