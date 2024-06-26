import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const wrappedFunction = async (...args) => {
    try {
      setPending(true);
      setError(null);
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
      console.log(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [error, pending, wrappedFunction];
}

export default useAsync;
