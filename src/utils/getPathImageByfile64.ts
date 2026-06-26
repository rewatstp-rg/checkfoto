export const getPathImageByfile64 = (fileResponse: any) => {
  if (fileResponse?.name && fileResponse?.file) {
    const { name, file } = fileResponse;
    const fileType = 'image/png';
    const trimmedString = file;
    const imageContent = atob(trimmedString);
    const buffer = new ArrayBuffer(imageContent.length);
    const viewPdf = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n += 1) {
      viewPdf[n] = imageContent.charCodeAt(n);
    }

    const blob = new Blob([buffer], { type: fileType });
    const fileItem: File = new File([blob], name, { lastModified: new Date().getTime(), type: fileType });

    const newFile: any = Object.assign(fileItem, {
      preview: URL.createObjectURL(fileItem),
    });

    return newFile?.preview;
  }

  return null;
}

export const getPathImage64 = (file: any, name: string) => {
  if (file && name) {
    const fileType = 'image/png';
    const trimmedString = file;
    const imageContent = atob(trimmedString);
    const buffer = new ArrayBuffer(imageContent.length);
    const viewPdf = new Uint8Array(buffer);

    for (let n = 0; n < imageContent.length; n += 1) {
      viewPdf[n] = imageContent.charCodeAt(n);
    }

    const blob = new Blob([buffer], { type: fileType });
    const fileItem: File = new File([blob], name, { lastModified: new Date().getTime(), type: fileType });

    const newFile: any = Object.assign(fileItem, {
      preview: URL.createObjectURL(fileItem),
    });

    return newFile?.preview;
  }

  return null;
}

// export const downloadImageFromBase64 = (fileResponse: any) => {
//     if (fileResponse?.file) {
//         const { name, file } = fileResponse;
//         const fileType = 'image/png';

//         const base64Data = `data:${fileType};base64,${file}`;

//         const link = document.createElement('a');
//         link.href = base64Data;
//         link.download = name || `image-${Date.now()}.png`;

//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
// };

// export const downloadImageFromBase64 = (fileResponse: { name: string; file: string }) => {
//     if (!fileResponse?.file) return;

//     const { name, file } = fileResponse;
//     const fileType = 'image/png';

//     const byteString = atob(file); // แปลง base64 เป็น binary
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);

//     for (let i = 0; i < byteString.length; i += 1) {
//         ia[i] = byteString.charCodeAt(i);
//     }

//     const blob = new Blob([ab], { type: fileType });
//     const blobUrl = URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = blobUrl;

//     const filename = name || `image-${Date.now()}.png`;

//     // ตรวจจับว่าเป็น iOS หรือไม่
//     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//     if (isIOS) {
//         // iOS Safari เปิดในแท็บใหม่แทน (แล้วผู้ใช้ต้องแตะค้าง → บันทึกภาพ)
//         window.open(blobUrl, '_blank');
//     } else {
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }

//     // cleanup
//     URL.revokeObjectURL(blobUrl);
// };

// export const downloadImageFromBase64 = async (fileResponse: { name: string; file: string }) => {
//     if (!fileResponse?.file) return;

//     const { name, file } = fileResponse;
//     const fileType = 'image/png';

//     // 1. Convert base64 to Blob
//     const byteString = atob(file);
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i += 1) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([ab], { type: fileType });
//     const blobUrl = URL.createObjectURL(blob);

//     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//     if (isIOS) {
//         // ✅ Fallback for iOS: เปิดในแท็บใหม่ให้ผู้ใช้บันทึกเอง
//         const newWindow = window.open();
//         if (newWindow) {
//             newWindow.document.write(`
//         <html>
//           <body style="margin:0;padding:0;">
//             <img src="${blobUrl}" style="width:100%;height:auto;" />
//           </body>
//         </html>
//       `);
//         } else {
//             // alert('กรุณาอนุญาต popup เพื่อดาวน์โหลดภาพ');
//             try {
//                 const shareData = {
//                     title: "MDN",
//                     text: "Learn web development on MDN!",
//                     url: blobUrl,
//                 };
//                 await navigator.share(shareData);
//             } catch (err) {
//                 alert(`${err}`);
//             }
//         }
//     } else {
//         // ✅ Android / Desktop
//         const link = document.createElement('a');
//         link.href = blobUrl;
//         link.download = name || `image-${Date.now()}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }

//     URL.revokeObjectURL(blobUrl);
// };

// export const downloadImageFromBase64 = async (fileResponse: { name: string; file: string }) => {
//   if (!fileResponse?.file) return;

//   const { name, file } = fileResponse;

//   const byteString = atob(file); // base64 → binary
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i += 1) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   const blob = new Blob([ab], { type: 'image/png' });
//   const fileObj = new File([blob], name || `image-${Date.now()}.png`, {
//     type: 'image/png',
//   });

//   const shareData: ShareData = {
//     files: [fileObj],
//     title: 'แชร์รูปภาพ',
//     text: 'ดาวน์โหลดหรือแชร์ภาพนี้',
//   };

//   try {
//     if (navigator.canShare && navigator.canShare({ files: [fileObj] })) {
//       await navigator.share(shareData);
//     } else {
//       alert('อุปกรณ์ไม่รองรับการแชร์ไฟล์ภาพ');
//     }
//   } catch (error) {
//     console.error('Sharing failed:', error);
//   }
// };

export const downloadImageFromBase64 = async (fileResponse: { name: string; file: string }) => {
  if (!fileResponse?.file) return;

  const { name, file } = fileResponse;

  // แปลง base64 เป็น Blob
  const byteString = atob(file);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: 'image/png' });
  const filename = name || `image-${Date.now()}.png`;

  // Detect platform
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isAndroid = (): boolean => (/android/i.test(navigator.userAgent));

  if (isAndroid()) {
    // กรณี Android
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  if (isMobile && navigator.canShare && navigator.canShare({ files: [new File([blob], filename)] })) {
    // กรณี Mobile และรองรับ Web Share API + ไฟล์
    const fileObj = new File([blob], filename, { type: 'image/png' });

    await navigator.share({
      files: [fileObj],
      title: 'แชร์รูปภาพ',
      text: 'แชร์หรือดาวน์โหลดรูปภาพนี้',
    });

    // try {
    //   await navigator.share({
    //     files: [fileObj],
    //     title: 'แชร์รูปภาพ',
    //     text: 'แชร์หรือดาวน์โหลดรูปภาพนี้',
    //   });
    // } catch (error) {
    //   console.error('Sharing failed:', error);
    //   alert('แชร์ภาพไม่สำเร็จ ลองอีกครั้ง');
    // }
  } else {
    // กรณี Desktop หรือมือถือที่ไม่รองรับ share files → ดาวน์โหลดผ่าน <a download>
    const blobUrl = URL.createObjectURL(blob);

    if (isIOS) {
      // iOS Safari ยังบล็อกดาวน์โหลด ต้องเปิดรูปในแท็บใหม่
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <body style="margin:0;padding:0;">
              <img src="${blobUrl}" style="width:100%;height:auto;" />
            </body>
          </html>
        `);
      } else {
        alert('กรุณาอนุญาต popup เพื่อดาวน์โหลดภาพ');
      }
    } else {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    URL.revokeObjectURL(blobUrl);
  }
};

export const base64ToBlob = (base64: string, mime = 'image/png'): Blob => {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
};

export const isIOS = (): boolean => /iphone|ipad|ipod/i.test(navigator.userAgent);
export const isAndroid = (): boolean => /android/i.test(navigator.userAgent);
export const isMobile = (): boolean => /android|iphone|ipad|ipod/i.test(navigator.userAgent);

export const shareImageFromBase64 = async (fileResponse: { name: string; file: string }) => {
  if (!fileResponse?.file) return;

  const { name, file } = fileResponse;
  const blob = base64ToBlob(file, 'image/jpeg');
  const filename = name || `image-${Date.now()}.jpg`;
  const fileObj = new File([blob], filename, { type: 'image/jpeg' });

  await navigator.share({
    files: [fileObj],
    title: 'แชร์รูปภาพ',
    text: 'แชร์หรือบันทึกรูปภาพนี้',
  });
};

export const downloadImageFromBase64New = async (fileResponse: { name: string; file: string }) => {
  if (!fileResponse?.file) return;

  const { name, file } = fileResponse;
  const blob = base64ToBlob(file, 'image/jpeg');
  const filename = name || `image-${Date.now()}.jpg`;
  const blobUrl = URL.createObjectURL(blob);

  if (isIOS() && navigator.canShare && navigator.canShare({ files: [new File([blob], filename)] })) {
    // iOS: เปิดแท็บใหม่
    const fileObj = new File([blob], filename, { type: 'image/jpeg' });

    await navigator.share({
      files: [fileObj],
      title: 'แชร์รูปภาพ',
      text: '',
    });

  } else {
    // อื่นๆ: สร้างลิงก์ดาวน์โหลด
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  URL.revokeObjectURL(blobUrl);
};

type Orientation = {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape' | 'square';
};

export const checkImageOrientationFromUrl = (imageUrl: string): Promise<Orientation> => (
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      if (width > height) {
        resolve({ width, height, orientation: 'landscape' }); // แนวนอน
      } else if (width < height) {
        resolve({ width, height, orientation: 'portrait' }); // แนวตั้ง
      } else {
        resolve({ width, height, orientation: 'square' }); // สี่เหลี่ยมจัตุรัส
      }
    };

    img.onerror = reject;
    img.src = imageUrl;

    // ป้องกัน CORS (ถ้าโหลดรูปจาก domain อื่นที่ไม่เปิด CORS)
    img.crossOrigin = 'anonymous';
  })
);

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string); // ผลลัพธ์จะเป็น base64 string
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export function removeDataPrefix(base64String: string) {
  // แยก string ที่ตำแหน่ง ',' และคืนค่าส่วนที่สอง
  const parts = base64String.split(',');
  return parts.length > 1 ? parts[1] : base64String;
}

export const urlToBase64 = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl, {
    method: "GET",
    headers: {
      "Accept": "image/*",
      "Cache-Control": "no-cache",
      "client-module": "administrator",
    }
  });
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // base64 string
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export function downloadFromUrl(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
}

export const checkVideoOrientationFromUrl = (
  videoUrl: string
): Promise<Orientation> =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video');

    video.preload = 'metadata';
    video.crossOrigin = 'anonymous';
    video.muted = true; // iOS ต้องการ
    video.playsInline = true;

    video.onloadedmetadata = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (!width || !height) {
        reject(new Error('Unable to read video metadata'));
        return;
      }

      if (width > height) {
        resolve({ width, height, orientation: 'landscape' });
      } else if (width < height) {
        resolve({ width, height, orientation: 'portrait' });
      } else {
        resolve({ width, height, orientation: 'square' });
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
    };

    video.src = videoUrl;
  });


export const downloadVideoFromBase64 = async (
  fileResponse: { name: string; file: string }
) => {
  if (!fileResponse?.file) return;

  const { name, file } = fileResponse;

  const mimeType = 'video/mp4';
  const blob = base64ToBlob(file, mimeType);
  const filename = `${name}-${Date.now()}.mp4`;

  const blobUrl = URL.createObjectURL(blob);

  try {
    // iOS (Safari / iPhone)
    if (
      isIOS() &&
      navigator.canShare &&
      navigator.canShare({
        files: [new File([blob], filename, { type: mimeType })],
      })
    ) {
      const fileObj = new File([blob], filename, { type: mimeType });

      await navigator.share({
        files: [fileObj],
        title: 'แชร์วิดีโอ',
        text: '',
      });
    } else {
      // Browser อื่น ๆ
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
};

export const downloadVideoFromUrl = async (videoFile: File, filename: string, isMobileDevice: () => boolean) => {
  try {

    // if (navigator.canShare && navigator.canShare({ files: [videoFile] }) && isMobileDevice()) {
    //   try {
    //     await navigator.share({
    //       files: [videoFile],
    //       title: 'Save Video',
    //     });
    //     return; // ทำงานสำเร็จใน Mobile/Safari
    //   } catch (shareError) {
    //     // กรณีผู้ใช้กด Cancel ให้จบการทำงาน หรือจะ fallback ก็ได้
    //     if ((shareError as Error).name === 'AbortError') return;
    //     console.error('Share failed:', shareError);
    //   }
    // }

    // 2. Fallback สำหรับ Browser ที่ไม่รองรับ Share API (เช่น Chrome Desktop)
    const blobUrl = URL.createObjectURL(videoFile);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;

    // ปรับปรุงการกดคลิกให้รองรับ Mobile Browsers บางตัว
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // Cleanup: ใช้ setTimeout เพื่อให้แน่ใจว่า Browser เริ่มโหลดไปแล้วก่อนลบ Object ออก
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 100);

  } catch (error) {
    console.error('Download failed:', error);
    alert('ไม่สามารถดาวน์โหลดวิดีโอได้ในขณะนี้');
  }
};

export const shareVideoUrl = async (videoUrl: string) => {
  if (!videoUrl) return;

  if (!navigator.share) {
    console.warn('Web Share API not supported');
    return;
  }

  await navigator.share({
    title: 'แชร์วิดีโอ',
    text: 'ดูวิดีโอนี้',
    url: videoUrl,
  });
};