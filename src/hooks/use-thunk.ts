import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SerializedError } from '@reduxjs/toolkit';

export function useThunk(thunk: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | SerializedError>(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (args?: any) => {
      setIsLoading(true);
      dispatch(thunk(args))
        .unwrap()
        .catch((err: SerializedError) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}
