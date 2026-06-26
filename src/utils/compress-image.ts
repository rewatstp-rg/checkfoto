export async function compressImage(file: File, { quality = 1, type = file.type }) {

    if (type === 'image/jpeg') {
        quality -= 0.15;
    }

    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    ctx?.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob: Blob = await new Promise((resolve: any) =>
        canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], file.name, {
        type: blob.type,
    });
};

export async function compressImageWithResize(
    file: File,
    {
        quality = 1,
        type = file.type,
        resizeRatio = 0.2,
    }: { quality?: number; type?: string; resizeRatio?: number }
) {
    if (type === 'image/jpeg') {
        quality -= 0.15;
    }

    const imageBitmap = await createImageBitmap(file);

    const newWidth = Math.floor(imageBitmap.width * resizeRatio);
    const newHeight = Math.floor(imageBitmap.height * resizeRatio);

    // ✅ สร้าง OffscreenCanvas แทน document.createElement('canvas')
    const canvas = new OffscreenCanvas(newWidth, newHeight);
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

    // ✅ ใช้ convertToBlob แทน canvas.toBlob
    const blob: Blob = await canvas.convertToBlob({ type, quality });

    return new File([blob], file.name, {
        type: blob.type,
    });
}


export async function compressImageToJpg(file: File, { quality = 1, type = 'image/jpeg' }) {

    const baseName = file.name.replace(/\.[^/.]+$/, "");

    const newFileName = `${baseName}.jpg`;

    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    ctx?.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob: Blob = await new Promise((resolve: any) =>
        canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], newFileName, {
        type: blob.type,
    });
};
