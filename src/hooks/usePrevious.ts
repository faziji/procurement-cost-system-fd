import { useEffect, useRef } from 'react';

const usePrevious = (value: any) => {
  const refContainer = useRef();

  useEffect(() => {
    refContainer.current = value;
  }, [value]);

  return refContainer.current;
};

export default usePrevious;
