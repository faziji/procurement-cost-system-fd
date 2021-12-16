import { useEffect, useRef } from 'react';

const useFirstMounted = () => {
  const refContainer = useRef(true);

  useEffect(() => {
    refContainer.current = false;
  }, []);

  return refContainer.current;
};

export default useFirstMounted;
