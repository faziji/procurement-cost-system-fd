import { useEffect, useRef } from 'react';

const useUpdated = () => {
  const refContainer = useRef(false);

  useEffect(() => {
    refContainer.current = true;
  }, []);

  return refContainer.current;
};

export default useUpdated;
