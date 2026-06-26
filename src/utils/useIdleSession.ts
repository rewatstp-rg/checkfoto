import { useRef, useState, useEffect, useCallback } from "react";

export const useIdleSession = (config: any) => {
    const [lastActive, setLastActive] = useState<any>(new Date());
    const [open, setOpen] = useState(false);
    const [idleTime, setIdleTime] = useState(0);

    const intervalId = useRef() as any;
    const logoutIntervalId = useRef() as any;

    const isLoggedIn = true;

    // function to handle user activity
    const handleUserActivity = useCallback(() => {
        setLastActive(new Date());
        setOpen(false);
        clearTimeout(logoutIntervalId.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Effect to return cleanup function to clear any running timers upon
    // component unmount.
    // useEffect(() => {
    //     return () => {
    //         clearInterval(intervalId.current);
    //         clearTimeout(logoutIntervalId.current);
    //     };
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // Effect to check for user activity periodically
    useEffect(() => {
        if (isLoggedIn) {
            // setInterval to check for user activity
            intervalId.current = setInterval(() => {
                // get current time
                const currentTime: any = new Date();
                // calculate idle time
                const idle = currentTime - lastActive;
                // check if user has been idle for more than the threshold time
                if (idle > config.threshold) {
                    setIdleTime(idle);
                    setOpen(true);
                    // set a timeout to run the action if they do not click the "Keep Session Active" button
                    logoutIntervalId.current = setTimeout(() => {
                        config.action();
                    }, config.timeout);
                    // setTimeout(, config.timeout);
                }
            }, config.threshold);
            return () => {
                clearInterval(intervalId.current);
            };
        }
        return () => {
            clearInterval(intervalId.current);
            clearTimeout(logoutIntervalId.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, lastActive, handleUserActivity, config,]);

    return { open, idleTime, handleUserActivity };
};