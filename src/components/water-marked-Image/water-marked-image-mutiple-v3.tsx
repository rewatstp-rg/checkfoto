import React, { useRef, useEffect } from 'react';

import { Box, Stack } from '@mui/material';

interface Props {
    imageUrl: string;
    watermarkHorizontalUrl: string; // URL ของลายน้ำสำเร็จรูป (Full-Layout)
    watermarkVerticalUrl: string; // URL ของลายน้ำสำเร็จรูป (Full-Layout)
    imageOrientation: string; // 'landscape' หรือ 'portrait'
    pageType?: string;
}

const WatermarkedImageMutipleV3: React.FC<Props> = ({ imageUrl, watermarkHorizontalUrl, watermarkVerticalUrl, imageOrientation, pageType }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <Stack spacing={2} alignItems="center" onContextMenu={(e) => e.preventDefault()}>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <ConfigWatermarkedImage
                useImageUrl={imageUrl}
                selectedWatermarkUrl={imageOrientation === 'landscape' ? watermarkHorizontalUrl : watermarkVerticalUrl || ''}
                canvasRef={canvasRef}
                imageOrientation={imageOrientation}
            />
        </Stack>
    );
};

export default WatermarkedImageMutipleV3;

const ConfigWatermarkedImage = ({
    useImageUrl,
    selectedWatermarkUrl,
    canvasRef,
    imageOrientation
}: {
    useImageUrl: string;
    selectedWatermarkUrl: string;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    imageOrientation?: string;
}) => {

    useEffect(() => {
        if (!useImageUrl) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        let isCancelled = false;

        const loadImage = (src: string): Promise<HTMLImageElement> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });

        const renderImages = async () => {
            try {

                const baseImage = await loadImage(useImageUrl);
                const watermarkImage = selectedWatermarkUrl ? await loadImage(selectedWatermarkUrl) : null;

                if (isCancelled) return;

                const maxWidth = 1500;
                const ratio = baseImage.width / baseImage.height;

                let { width, height } = baseImage;

                if (width > maxWidth) {
                    width = maxWidth;
                    height = Math.round(maxWidth / ratio);
                }

                canvas.width = width;
                canvas.height = height;

                // draw base image
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(baseImage, 0, 0, width, height);

                const imageDataY = ctx.getImageData(0, 0, width, height);
                const dataY = imageDataY.data;
                let total = 0;
                for (let i = 0; i < dataY.length; i += 4) {
                    const r = dataY[i];
                    const g = dataY[i + 1];
                    const b = dataY[i + 2];
                    // Luma formula (มาตรฐาน)
                    total += 0.2126 * r + 0.7152 * g + 0.0722 * b;
                }
                const avgBrightness = total / (width * height);

                // ปรับ opacity ตามความสว่าง
                const overlayAlpha = avgBrightness > 180 ? 0.5 : 0.25; // สว่าง → ใส่ชัดขึ้น
                const softLightAlpha = avgBrightness > 180 ? 0.6 : 0.3;

                // blend watermark
                if (watermarkImage) {
                    ctx.globalAlpha = overlayAlpha;
                    ctx.globalCompositeOperation = "overlay";
                    ctx.drawImage(watermarkImage, 0, 0, width, height);

                    ctx.globalAlpha = softLightAlpha;
                    ctx.globalCompositeOperation = "source-over";
                    ctx.drawImage(watermarkImage, 0, 0, width, height);

                    ctx.globalAlpha = 1;
                    ctx.globalCompositeOperation = "source-over";
                }

                // structured noise
                const imageData = ctx.getImageData(0, 0, width, height);
                const { data } = imageData;

                for (let y = 0; y < height; y += 1) {
                    for (let x = 0; x < width; x += 1) {
                        const i = (y * width + x) * 4;
                        const wave = Math.sin((x + y) * 0.05) * 4;

                        data[i] += wave;
                        data[i + 1] += wave;
                        data[i + 2] += wave;
                    }
                }

                ctx.putImageData(imageData, 0, 0);

            } catch (e) {
                console.error(e);
            } finally {
                // if (!isCancelled) setIsLoadingInFrame(false);
            }
        };

        renderImages();

        // eslint-disable-next-line
        return () => {
            isCancelled = true;
        };
    }, [canvasRef, useImageUrl, selectedWatermarkUrl]);



    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: imageOrientation === 'landscape' ? '700px' : '400px',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    userSelect: "none",
                    pointerEvents: "none",
                    borderRadius: 16
                }}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
            />
        </Box>
    );
};