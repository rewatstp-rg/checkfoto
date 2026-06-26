import React, { useRef, useState } from 'react';

import { Box, Stack } from '@mui/material';

interface Props {
    imageUrl: string;       // รูปต้นฉบับ
    watermarkUrl: string;   // รูปลายน้ำ
    imageOrientation: string;
}

const WatermarkedImage: React.FC<Props> = ({ imageUrl, watermarkUrl, imageOrientation }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);

    const drawWatermarkedImage = async () => {
        const img = new Image();
        const watermark = new Image();
        img.crossOrigin = 'anonymous';
        watermark.crossOrigin = 'anonymous';
        img.src = imageUrl;
        watermark.src = watermarkUrl;

        await Promise.all([
            new Promise((res) => {
                img.onload = () => res(null);
            }),
            new Promise((res) => {
                watermark.onload = () => res(null);
            }),
        ]);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ปรับขนาด canvas ตามรูปต้นฉบับ
        canvas.width = img.width;
        canvas.height = img.height;

        // วาดรูปต้นฉบับ
        ctx.drawImage(img, 0, 0);

        // ปรับขนาดลายน้ำให้เหมาะสม เช่น 30% ของความกว้าง
        const watermarkWidth = img.width * 0.1;
        const scale = watermarkWidth / watermark.width;
        const watermarkHeight = watermark.height * scale;

        const rad = Math.PI / 180;

        // วาดลายน้ำที่มุมขวาล่าง
        ctx.globalAlpha = 0.5; // ความโปร่งใสของลายน้ำ

        ctx.save();
        ctx.translate(img.width / 2, img.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(
            watermark,
            -watermarkWidth / 2,
            -watermarkHeight / 2,
            watermarkWidth,
            watermarkHeight
        );
        ctx.restore();

        ctx.globalAlpha = 1.0;

        // แปลงเป็น Data URL
        const dataUrl = canvas.toDataURL('image/png');
        setWatermarkedUrl(dataUrl);
    };

    // const downloadImage = () => {
    //     if (!watermarkedUrl) return;
    //     const a = document.createElement('a');
    //     a.href = watermarkedUrl;
    //     a.download = 'image_with_watermark.png';
    //     a.click();
    // };

    React.useEffect(() => {
        drawWatermarkedImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUrl, watermarkUrl, imageOrientation]);

    return (
        <Stack spacing={2} alignItems="center">
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {
                watermarkedUrl && (
                    <Box
                        component="img"
                        src={watermarkedUrl}
                        alt="preview"
                        sx={{
                            width: '100%',
                            maxWidth: imageOrientation === 'landscape' ? 'auto' : '400px',
                            height: "auto",
                            borderRadius: 2,
                            boxShadow: 5,
                            mb: 3,
                        }}
                    />
                )
            }
        </Stack>
    );
};

export default WatermarkedImage;