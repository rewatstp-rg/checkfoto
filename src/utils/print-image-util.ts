export interface PrintImageOptions {
  fileName?: string;   // ชื่อไฟล์ (optional)
  autoPrint?: boolean; // true = สั่ง print ทันที (default)
  showPreview?: boolean; // true = เปิด preview ก่อน print
}

export async function printImage(
  imageSrc: string,
  options: PrintImageOptions = {}
): Promise<void> {
  const { fileName = "Print Image", autoPrint = true, showPreview = false } = options;

  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("ไม่สามารถโหลดรูปภาพได้"));
  });

  if (showPreview) {
    const confirmed = window.confirm("ต้องการพิมพ์ภาพนี้หรือไม่?");
    if (!confirmed) return;
  }

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    console.error("ไม่สามารถเข้าถึง iframe document ได้");
    return;
  }

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>${fileName}</title>
        <style>
          @page {
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background: white;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          img {
            max-width: 100%;
            max-height: 100vh;
            object-fit: contain;
          }

          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <img src="${imageSrc}" />
      </body>
    </html>
  `);
  doc.close();

  iframe.onload = () => {
    if (autoPrint) {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }
    setTimeout(() => document.body.removeChild(iframe), 1000);
  };
}
