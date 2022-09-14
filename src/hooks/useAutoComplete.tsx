import { useState, useEffect } from "react";

const useAutoComplete = (value: string, delay: number = 1000) => {
  const [debounce, setDebounce] = useState<string>(value);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timeoutRef);
  }, [value]);
  return debounce;
};

export default useAutoComplete;
