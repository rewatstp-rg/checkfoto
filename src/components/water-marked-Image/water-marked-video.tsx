import React, { useRef, useEffect } from 'react';

import { Box } from '@mui/material';

interface Props {
    videoUrl: string;
    watermarkHorizontalUrl: string;
    watermarkVerticalUrl: string;
    videoOrientation: 'portrait' | 'landscape';
};

const VIDEO_SIZE = {
    portrait: { width: 540, height: 960 },
    landscape: { width: 960, height: 540 }
} as const;

const createHiddenVideo = (src: string): HTMLVideoElement => {
    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.muted = true;        // required for iOS autoplay
    video.playsInline = true;
    video.preload = 'auto';
    return video;
};

const WatermarkedVideo: React.FC<Props> = ({
    videoUrl,
    watermarkVerticalUrl,
    watermarkHorizontalUrl,
    videoOrientation,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const video = createHiddenVideo(videoUrl);
        const { width, height } = VIDEO_SIZE[videoOrientation];

        canvas.width = width;
        canvas.height = height;

        let rafId = 0;
        let frame = 0;
        let brightness = 150; // default safe value

        const watermark = new Image();
        watermark.crossOrigin = 'anonymous';
        watermark.src =
            videoOrientation === 'portrait'
                ? watermarkVerticalUrl
                : watermarkHorizontalUrl;

        const drawFrame = () => {
            if (video.paused || video.ended) return;

            ctx.drawImage(video, 0, 0, width, height);

            // วัด brightness ทุก 5 frame (ประหยัด performance)
            if (frame % 5 === 0) {
                const sample = ctx.getImageData(0, 0, 40, 40).data;
                let sum = 0;

                for (let i = 0; i < sample.length; i += 4) {
                    sum +=
                        0.2126 * sample[i] +
                        0.7152 * sample[i + 1] +
                        0.0722 * sample[i + 2];
                }

                brightness = sum / (40 * 40);
            }

            const overlayAlpha = brightness > 180 ? 0.45 : 0.25;
            const softAlpha = brightness > 180 ? 0.6 : 0.35;

            // overlay watermark
            ctx.globalCompositeOperation = 'overlay';
            ctx.globalAlpha = overlayAlpha;
            ctx.drawImage(watermark, 0, 0, width, height);

            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = softAlpha;
            ctx.drawImage(watermark, 0, 0, width, height);

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';

            frame += 1;
            rafId = requestAnimationFrame(drawFrame);
        };

        const start = async () => {
            try {
                await video.play(); // iOS ต้องมี user interaction
                drawFrame();
            } catch (err) {
                console.warn('Video autoplay blocked', err);
            }
        };

        video.addEventListener('loadeddata', start);

        // eslint-disable-next-line consistent-return
        return () => {
            cancelAnimationFrame(rafId);
            video.pause();
            video.src = '';
        };
    }, [
        videoUrl,
        videoOrientation,
        watermarkHorizontalUrl,
        watermarkVerticalUrl,
    ]);

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: videoOrientation === 'portrait' ? 360 : 640,
                aspectRatio:
                    videoOrientation === 'portrait' ? '9 / 16' : '16 / 9',
                borderRadius: 2,
                overflow: 'hidden',
                userSelect: 'none',
                pointerEvents: 'none',
                margin: 'auto'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </Box>
    );
};

export default WatermarkedVideo;
