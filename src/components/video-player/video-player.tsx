import { useRef, useState, useEffect } from 'react';

type VideoPlayerProps = {
    src: string;
    width?: number | string;
    imageThumbnailUrl?: string;
};

// export default function VideoPlayer({
//     src,
//     width = '100%',
//     imageThumbnailUrl,
// }: VideoPlayerProps) {
//     const videoRef = useRef<HTMLVideoElement>(null);

//     const [blobUrl, setBlobUrl] = useState<string | null>(null);
//     const [isReady, setIsReady] = useState(false);
//     const [hasError, setHasError] = useState(false);

//     /* =========================
//      * โหลด video → blob
//      * ========================= */
//     useEffect(() => {
//         let isCancelled = false;
//         let currentBlobUrl: string | null = null;

//         async function loadVideo() {
//             try {
//                 setIsReady(false);
//                 setHasError(false);

//                 const response = await fetch(src);
//                 if (!response.ok) throw new Error('Network error');

//                 const blob = await response.blob();

//                 if (!isCancelled) {
//                     currentBlobUrl = URL.createObjectURL(blob);
//                     setBlobUrl(currentBlobUrl);
//                 }
//             } catch (err) {
//                 console.error('โหลดวิดีโอไม่สำเร็จ:', err);
//                 setHasError(true);
//             }
//         }

//         loadVideo();

//         return () => {
//             isCancelled = true;
//             if (currentBlobUrl) {
//                 URL.revokeObjectURL(currentBlobUrl);
//             }
//         };
//     }, [src]);

//     /* =========================
//      * autoplay (ถ้าอนุญาต)
//      * ========================= */
//     useEffect(() => {
//         const v = videoRef.current;
//         if (!v || !blobUrl) return;

//         v.muted = true;
//         v.playsInline = true;

//         const p = v.play();
//         if (p) p.catch(() => { });
//     }, [blobUrl]);

//     return (
//         <div
//             style={{
//                 width,
//                 position: 'relative',
//                 backgroundColor: '#000',
//                 minHeight: 120,
//                 maxWidth: '100%',
//                 height: 640
//             }}
//         >
//             {/* Loading */}
//             {!isReady && !hasError && (
//                 <div
//                     style={{
//                         position: 'absolute',
//                         inset: 0,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: '#fff',
//                         zIndex: 1,
//                         width: '100%',
//                         maxWidth: '100%',
//                         height: 640
//                     }}
//                 >
//                     Loading video...
//                 </div>
//             )}

//             {/* Error */}
//             {hasError && (
//                 <div
//                     style={{
//                         position: 'absolute',
//                         inset: 0,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: '#fff',
//                         zIndex: 1,
//                     }}
//                 >
//                     ❌ ไม่สามารถโหลดวิดีโอได้
//                 </div>
//             )}

//             {/* Video (แสดงเมื่อ ready เท่านั้น) */}
//             {blobUrl && (
//                 <video
//                     ref={videoRef}
//                     key={src}
//                     src={blobUrl}
//                     poster={imageThumbnailUrl}
//                     controls
//                     preload="metadata"
//                     playsInline
//                     muted
//                     onCanPlayThrough={() => setIsReady(true)}
//                     onError={() => setHasError(true)}
//                     style={{
//                         width: '100%',
//                         maxWidth: '100%',
//                         display: 'block',
//                         opacity: isReady ? 1 : 0,
//                         transition: 'opacity 0.3s ease',
//                     }}
//                 >
//                     <track kind="captions" />
//                     เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
//                 </video>
//             )}
//         </div>
//     );
// }
export default function VideoPlayer({ src, width, imageThumbnailUrl }: VideoPlayerProps) {
    // console.log("🚀 ~ VideoPlayer ~ src:", src)
    const videoRef = useRef<HTMLVideoElement>(null);
    const [blobUrl, setBlobUrl] = useState<string | null>(null); // เริ่มต้นเป็น null

    // useEffect(() => {
    //     let isCancelled = false;
    //     let currentBlobUrl: string | null = null;

    //     async function loadVideo() {
    //         try {
    //             const response = await fetch(src);
    //             if (!response.ok) throw new Error('Network response was not ok');
    //             const blob = await response.blob();

    //             if (!isCancelled) {
    //                 currentBlobUrl = URL.createObjectURL(blob);
    //                 setBlobUrl(currentBlobUrl);
    //             }
    //         } catch (error) {
    //             console.error("โหลดวิดีโอไม่สำเร็จ:", error);
    //         }
    //     }

    //     loadVideo();

    //     return () => {
    //         isCancelled = true;
    //         if (currentBlobUrl) {
    //             URL.revokeObjectURL(currentBlobUrl);
    //         }
    //     };
    // }, [src]);

    // // จัดการเรื่องการเล่นวิดีโอเมื่อ blobUrl พร้อม
    // useEffect(() => {
    //     const v = videoRef.current;
    //     if (!v || !blobUrl) return;

    //     v.muted = true;
    //     v.playsInline = true;

    //     const promise = v.play();
    //     if (promise !== undefined) {
    //         promise.catch(() => { /* ปล่อยผ่านถ้าโดน Autoplay block */ });
    //     }
    // }, [blobUrl]);

    // // 1. ถ้ายังไม่มี blobUrl ไม่ควรเรนเดอร์แท็ก <source> หรือ src เพื่อกัน Error
    // // 2. ใช้แท็ก video ตัวเดียว ไม่ต้องมีทั้ง src และ <source> (เลือกอย่างใดอย่างหนึ่ง)

    useEffect(() => {
        setBlobUrl(src);
    }, [src]);

    
    return (
        <div style={{ width, minHeight: '100px', backgroundColor: '#000' }}>
            <video
                ref={videoRef}
                key={src} // บังคับสร้าง element ใหม่เมื่อเปลี่ยน src
                src={blobUrl || undefined} // ถ้ายังไม่มี blob ห้ามใส่ string ว่าง
                controls
                poster={imageThumbnailUrl}
                width="100%"
                preload="auto"
                playsInline
                muted
                autoPlay
                style={{ display: 'block', maxWidth: '100%' }}
            >
                <track kind="captions" />
                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
            </video>
        </div>
    );
};