// import React, { useEffect, useRef, useState } from 'react';

// type FrameItem = {
//   id: number;
//   name: string;
//   imageUrl: string;
// };

// export default function CanvasOverlay({ userImageUrl }: { userImageUrl: string }) {
//   const [frames, setFrames] = useState<FrameItem[]>([]);
//   const [selectedFrameUrl, setSelectedFrameUrl] = useState<string | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const [base64, setBase64] = useState<string | null>(null);

//   // โหลด frame จาก API
//   useEffect(() => {
//     const fetchFrames = async () => {
//       // const res = await fetch('https://race-checkrace.solutioninsight.tech/api/frames');
//       // const data = await res.json();

//       setFrames([
//         { id: 1, name: 'Frame 1', imageUrl: '/assets/mockup-image/CSMH25_Logo for photo-01.png' },
//         { id: 2, name: 'Frame 2', imageUrl: '/assets/mockup-image/CSMH25_Logo for photo-02.png' },
//       ]);
//     };
//     fetchFrames();
//   }, []);

//   // วาด canvas เมื่อเลือก frame
//   useEffect(() => {
//     if (!userImageUrl) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (!canvas || !ctx) return;

//     const baseImage = new Image();
//     baseImage.crossOrigin = 'anonymous';

//     baseImage.onload = () => {
//       canvas.width = baseImage.width;
//       canvas.height = baseImage.height;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(baseImage, 0, 0);

//       // ถ้ามีกรอบ → ซ้อนเพิ่ม
//       if (selectedFrameUrl) {
//         const frameImage = new Image();
//         frameImage.crossOrigin = 'anonymous';
//         frameImage.onload = () => {
//           ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
//         };
//         frameImage.src = selectedFrameUrl;
//       }
//     };

//     baseImage.src = userImageUrl;
//   }, [userImageUrl, selectedFrameUrl]); // ✅ เมื่อใดที่ base หรือ frame เปลี่ยน → re-render canvas


//   const handleDownload = () => {
//     const originalCanvas = canvasRef.current;
//     if (!originalCanvas) return;

//     // กำหนดขนาดใหม่ที่ต้องการ export (เช่น 1000px)
//     const maxExportWidth = 4500;
//     const scale = maxExportWidth / originalCanvas.width;
//     const exportWidth = originalCanvas.width * scale;
//     const exportHeight = originalCanvas.height * scale;

//     // สร้าง canvas ใหม่เพื่อ export
//     const exportCanvas = document.createElement('canvas');
//     exportCanvas.width = exportWidth;
//     exportCanvas.height = exportHeight;

//     const exportCtx = exportCanvas.getContext('2d');
//     if (!exportCtx) return;

//     exportCtx.drawImage(originalCanvas, 0, 0, exportWidth, exportHeight);

//     const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.9); // ใช้ JPEG + quality 90%
//     const link = document.createElement('a');
//     link.href = dataUrl;
//     link.download = 'exported-photo.jpg';
//     link.click();
//   };

//   return (
//     <div>
//       <h3>เลือกรูปกรอบ</h3>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {frames.map((frame) => (
//           <img
//             key={frame.id}
//             src={frame.imageUrl}
//             alt={frame.name}
//             onClick={() => setSelectedFrameUrl(frame.imageUrl)}
//             style={{
//               width: 100,
//               height: 100,
//               margin: 8,
//               cursor: 'pointer',
//               border: selectedFrameUrl === frame.imageUrl ? '2px solid red' : '1px solid gray',
//             }}
//           />
//         ))}
//       </div>

//       <h3>Preview</h3>
//       <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />

//       <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// }
