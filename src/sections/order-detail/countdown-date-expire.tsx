import { useState, useEffect } from "react";

import { Box, Stack } from "@mui/material";

export function CountDownDateExpire({ paymentExpiredDate }: any) {

    const [countdownDate, setCountdownDate] = useState<string>();

    const calPaymentExpiredDate = new Date(paymentExpiredDate);
    calPaymentExpiredDate.setMinutes(calPaymentExpiredDate.getMinutes() + 10);

    useEffect(() => {
        const { promise, timerId } = startCountdownFromNow(10, (time) => {
            setCountdownDate(time);
        });

        promise.then(() => {
            console.log("Countdown complete!");
            window.location.reload();
        });

        return () => {
            clearInterval(timerId); // Cleanup interval on unmount
        };
    }, []);

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            divider={<Box sx={{ mx: { xs: 1, sm: 2.5, position: 'relative' } }}>:</Box>}
            sx={{ typography: 'h2', mb: 0, mt: 2 }}
        >
            <div style={{ textAlign: 'center' }}>
                <div> {(countdownDate === 'NaN' || countdownDate === '0' || countdownDate === 'aN') ? '00' : countdownDate} </div>
                {/* <Box sx={{ typography: 'body1', color: 'white' }}>{label}</Box> */}
            </div>
        </Stack>
    );
}

function startCountdownFromNow(
    durationInMinutes: number,
    callback: (time: string) => void
): { promise: Promise<void>; timerId: NodeJS.Timeout } {
    let timerId: any; // Declare the variable

    const promise = new Promise<void>((resolve) => {
        const endTime = new Date().getTime() + durationInMinutes * 60 * 1000;

        timerId = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                clearInterval(timerId);
                callback("00:00");
                resolve();
                return;
            }

            const minutes = Math.floor(timeLeft / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            callback(formattedTime);
        }, 1000);
    });

    return { promise, timerId }; // Return the assigned timerId
}