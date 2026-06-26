import React, { useRef, useState, useEffect } from 'react';

import { Box, Stack } from '@mui/material';

interface Props {
    imageUrl: string;
    watermarkUrl: string; // แม้ว่าจะไม่ได้ใช้ แต่เก็บไว้เพื่อคงโครงสร้าง Props เดิม
    imageOrientation: string;
    pageType?: string;
}

// ฟังก์ชันวาดลายน้ำรูปตัว X โดยเว้นวงกลมตรงกลาง
function drawAntiAIXWatermark(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    clearRadius: number,
    thickness: number
) {
    ctx.save();

    // ตั้งค่าลายน้ำ
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"; // สีขาวใส
    ctx.lineWidth = thickness;
    // const modes = ["overlay", "multiply", "difference"] as const;
    ctx.globalCompositeOperation = "overlay"; // เทคนิค Anti-AI

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // ------------------------------------
    // 1. วาดเส้นจากมุมบนซ้ายไปล่างขวา
    // ------------------------------------

    ctx.beginPath();
    let isDrawing = false;

    // เดินทางตามเส้นทแยงมุม
    for (let t = 0; t <= 1; t += 0.005) { // เพิ่มค่า t ทีละน้อยเพื่อความละเอียด
        const x = canvasWidth * t;
        const y = canvasHeight * t;

        // คำนวณระยะห่างจากจุดศูนย์กลาง
        // const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance > clearRadius) {
            // ถ้าระยะห่างเกินรัศมีที่เว้นไว้ (อยู่นอกวงกลม)
            if (!isDrawing) {
                // เริ่มวาดส่วนใหม่
                ctx.moveTo(x, y);
                isDrawing = true;
            } else {
                ctx.lineTo(x, y);
            }
        } else {
            // ถ้าระยะห่างอยู่ในรัศมีที่เว้นไว้ (อยู่ในวงกลม)
            isDrawing = false; // หยุดวาด
        }
    }
    ctx.stroke();

    // ------------------------------------
    // 2. วาดเส้นจากมุมบนขวาไปล่างซ้าย
    // ------------------------------------

    ctx.beginPath();
    isDrawing = false;

    // เดินทางตามเส้นทแยงมุม
    for (let t = 0; t <= 1; t += 0.005) {
        const x = canvasWidth * (1 - t);
        const y = canvasHeight * t;

        // คำนวณระยะห่างจากจุดศูนย์กลาง
        // const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance > clearRadius) {
            // ถ้าระยะห่างเกินรัศมีที่เว้นไว้ (อยู่นอกวงกลม)
            if (!isDrawing) {
                // เริ่มวาดส่วนใหม่
                ctx.moveTo(x, y);
                isDrawing = true;
            } else {
                ctx.lineTo(x, y);
            }
        } else {
            // ถ้าระยะห่างอยู่ในรัศมีที่เว้นไว้ (อยู่ในวงกลม)
            isDrawing = false; // หยุดวาด
        }
    }
    ctx.stroke();

    ctx.restore();
}

const WatermarkedImageMutipleV2: React.FC<Props> = ({ imageUrl, watermarkUrl, imageOrientation, pageType }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);

    // กำหนดค่าสำหรับลายน้ำ X
    const X_LINE_THICKNESS = 10; // ความหนาของเส้น
    const X_CLEAR_RADIUS = 100; // รัศมีวงกลมที่เว้นว่างตรงกลาง (หน่วยเป็นพิกเซล)
    const angle = -30; // เอียง
    const numCols = 2; // จำนวนคอลัมน์แนวนอน (ด้านซ้าย-ขวา)
    const numRows = 5; // จำนวนแถวแนวตั้ง (ด้านบน-ล่าง)
    const WATERMARK_SCALE_FACTOR = 1.3;

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



            // ctx.save();
            // ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
            // ctx.lineWidth = 5;
            // ctx.beginPath();
            // ctx.moveTo(0, 0);
            // ctx.lineTo(canvas.width, canvas.height);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(canvas.width, 0);
            // ctx.lineTo(0, canvas.height);
            // ctx.stroke();
            // ctx.restore();
            

            drawAntiAIXWatermark(
                ctx,
                canvas.width,
                canvas.height,
                X_CLEAR_RADIUS,
                X_LINE_THICKNESS
            );

            const baseWatermarkWidth = img.width * (imageOrientation === 'landscape' ? 0.2 : 0.3);
            const scale = baseWatermarkWidth / watermark.width;
            // const watermarkHeight = watermark.height * scale;

            const watermarkWidth = baseWatermarkWidth * WATERMARK_SCALE_FACTOR;
            const watermarkHeight = (watermark.height * scale) * WATERMARK_SCALE_FACTOR;

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
    }, [imageUrl, imageOrientation])

    // ลบส่วนที่เกี่ยวข้องกับการวาด Watermark แบบเดิม (หลายตัว, หมุน, noise) ออกไป เนื่องจากเปลี่ยนมาใช้ลายน้ำ X
    // และลบ Props watermarkUrl ออกจาก Dependencies เพราะไม่ได้ใช้แล้วในการวาด X

    return (
        <Stack spacing={2} alignItems="center" onContextMenu={(e) => e.preventDefault()}>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {
                watermarkedUrl && (
                    <Box
                        component="img"
                        src={watermarkedUrl}
                        onContextMenu={(e) => e.preventDefault()}
                        onTouchStart={(e) => e.preventDefault()}
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

export default WatermarkedImageMutipleV2;

function drawWatermarkAtNew(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rad: number = 0,
    watermark = new Image(),
    watermarkWidth: number = 0,
    watermarkHeight: number = 0) {

    // กำหนดค่าความเบลอ (Blur Radius)
    // คุณสามารถปรับค่านี้ได้ เช่น '3px', '5px', '10px' ตามความเหมาะสม
    const blurAmount = '2.5px';

    ctx.save();

    // --- 1. การตั้งค่า Filter ---
    // เพิ่ม Gaussian Blur filter เข้าไปใน context
    ctx.filter = `blur(${blurAmount})`;

    ctx.translate(x, y);
    ctx.rotate(rad);

    // --- 2. วาดภาพ ---
    ctx.drawImage(
        watermark,
        -watermarkWidth / 2,
        -watermarkHeight / 2,
        watermarkWidth,
        watermarkHeight
    );

    // --- 3. ล้าง Filter ---
    // สำคัญมาก: เมื่อวาดลายน้ำเสร็จ ต้องล้าง filter ออก
    // ไม่เช่นนั้น การวาดอื่นๆ ที่เกิดขึ้นหลังจากนี้ (เช่น ลายน้ำตัวต่อไป หรือภาพหลัก) จะเบลอไปด้วย
    ctx.filter = 'none';

    ctx.restore();
}