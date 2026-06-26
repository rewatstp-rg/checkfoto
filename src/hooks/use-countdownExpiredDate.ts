import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

type ReturnDateType = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function useCountdownDateExpiredDate(date: Date): ReturnDateType {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const startTime = date;
    // startTime.setHours(0, 0, 0, 0);

    const endTime = new Date();

    const distanceToNow: number = startTime.getTime() - endTime.getTime();
    const interval = setInterval(() => setNewTime(distanceToNow), 1000);
    if (distanceToNow <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const setNewTime = (distanceToNow: number) => {

    const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

    const getHours = Math.floor((distanceToNow / (1000 * 60 * 60)) % 24);

    const getMinutes = Math.floor((distanceToNow / (1000 * 60)) % 60);

    const getSeconds = Math.floor((distanceToNow / 1000) % 60);

    setCountdown({
      days: getDays?.toString() || '00',
      hours: getHours?.toString() || '00',
      minutes: getMinutes?.toString() || '00',
      seconds: getSeconds?.toString() || '00',
    });
  };

  return {
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
  };
}

// Usage
// const countdown = useCountdown(new Date('07/07/2022 21:30'));

// ----------------------------------------------------------------------

type ReturnSecondsType = {
  counting: boolean;
  countdown: number;
  startCountdown: VoidFunction;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
};

export function useCountdownSeconds(initCountdown: number): ReturnSecondsType {
  const [countdown, setCountdown] = useState(initCountdown);

  const startCountdown = useCallback(() => {
    let remainingSeconds = countdown;

    const intervalId = setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds === 0) {
        clearInterval(intervalId);
        setCountdown(initCountdown);
      } else {
        setCountdown(remainingSeconds);
      }
    }, 1000);
  }, [initCountdown, countdown]);

  const counting = initCountdown > countdown;

  return { counting, countdown, setCountdown, startCountdown };
}
