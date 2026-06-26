import React, { useRef, useState, useEffect } from 'react';

import { Box, Stack } from '@mui/material';

interface Props {
    imageUrl: string;
    watermarkUrl: string;
    imageOrientation: string;
    pageType?: string;
}

const WatermarkedImageMutiple: React.FC<Props> = ({ imageUrl, watermarkUrl, imageOrientation, pageType }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
    const angle = -30; // เอียง
    const numCols = 2; // จำนวนคอลัมน์แนวนอน (ด้านซ้าย-ขวา)
    const numRows = 5; // จำนวนแถวแนวตั้ง (ด้านบน-ล่าง)

    const drawWatermarkedImage = async () => {
        if (pageType !== 'ORDER') {
            const img = new Image();
            const watermark = new Image();
            img.crossOrigin = 'anonymous';
            watermark.crossOrigin = 'anonymous';
            img.src = imageUrl;
            watermark.src = watermarkUrl;

            await Promise.all([
                new Promise<void>((res) => {
                    img.onload = () => res();
                }),
                new Promise<void>((res) => {
                    watermark.onload = () => res();
                }),
            ]);

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;

            // วาดภาพต้นฉบับ
            ctx.drawImage(img, 0, 0);

            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(canvas.width, 0);
            ctx.lineTo(0, canvas.height);
            ctx.stroke();
            ctx.restore();

            const watermarkWidth = img.width * (imageOrientation === 'landscape' ? 0.2 : 0.3);
            const scale = watermarkWidth / watermark.width;
            const watermarkHeight = watermark.height * scale;

            const spacingX = 130;
            const spacingY = 130;

            const gapX = watermarkWidth + spacingX;
            const gapY = watermarkHeight + spacingY;

            ctx.globalAlpha = 0.6;

            const rad = (angle * Math.PI) / 180;

            const centerX = img.width / 2;
            const centerY = img.height / 2;

            for (let row = -numRows; row <= numRows; row += 1) {
                for (let col = -numCols; col <= numCols; col += 1) {
                    const x = centerX + col * gapX;
                    const y = centerY + row * gapY;
                    drawWatermarkAtNew(ctx, x, y, rad, watermark, watermarkWidth, watermarkHeight);
                }
            }

            const dataUrl = canvas.toDataURL('image/png');
            setWatermarkedUrl(dataUrl);
        } else {
            setWatermarkedUrl(imageUrl);
        }
    };

    useEffect(() => {
        if (imageOrientation) {
            drawWatermarkedImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watermarkUrl, imageUrl, imageOrientation])

    return (
        <Stack spacing={2} alignItems="center" onContextMenu={(e) => e.preventDefault()}>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {
                watermarkedUrl && (
                    <Box
                        component="img"
                        src={watermarkedUrl}
                        onContextMenu={(e) => e.preventDefault()} // กัน PC
                        onTouchStart={(e) => e.preventDefault()} // กัน Mobile
                        alt="preview"
                        sx={{
                            width: '100%',
                            maxWidth: imageOrientation === 'landscape' ? '700px' : '400px',
                            height: "auto",
                            borderRadius: 2,
                            boxShadow: 5,
                            mb: 3,
                            WebkitTouchCallout: "none",
                            WebkitUserSelect: "none",
                            userSelect: "none",
                            pointerEvents: "none"
                        }}
                        draggable={false}
                    />
                )
            }
        </Stack>
    );
};

export default WatermarkedImageMutiple;

// function drawWatermarkAt(
//     ctx: CanvasRenderingContext2D,
//     x: number,
//     y: number,
//     rad: number = 0,
//     watermark = new Image(),
//     watermarkWidth: number = 0,
//     watermarkHeight: number = 0
// ) {
//     ctx.save();
//     ctx.translate(x, y);
//     ctx.rotate(rad);
//     ctx.drawImage(
//         watermark,
//         -watermarkWidth / 2,
//         -watermarkHeight / 2,
//         watermarkWidth,
//         watermarkHeight
//     );
//     ctx.restore();
// }

function drawWatermarkAtNew(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rad: number = 0,
    watermark = new Image(),
    watermarkWidth: number = 0,
    watermarkHeight: number = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rad);
    ctx.drawImage(
        watermark,
        -watermarkWidth / 2,
        -watermarkHeight / 2,
        watermarkWidth,
        watermarkHeight
    );
    ctx.restore();
}
