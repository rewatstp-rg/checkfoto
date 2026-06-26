import { useRef, useEffect } from 'react';

export const useTokenExpiration = (
  exp: number | null,
  onExpire: () => void
) => {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!exp) return;

    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;

    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    timerRef.current = setTimeout(() => {
      onExpire();
    }, timeLeft);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerRef.current);
  }, [exp, onExpire]);
};
