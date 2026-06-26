async function s(n,r={}){const{fileName:d="Print Image",autoPrint:c=!0,showPreview:a=!1}=r;if(await new Promise((i,m)=>{const o=new Image;o.src=n,o.onload=()=>i(),o.onerror=()=>m(new Error("ไม่สามารถโหลดรูปภาพได้"))}),a&&!window.confirm("ต้องการพิมพ์ภาพนี้หรือไม่?"))return;const e=document.createElement("iframe");e.style.position="fixed",e.style.right="0",e.style.bottom="0",e.style.width="0",e.style.height="0",e.style.border="0",document.body.appendChild(e);const t=e.contentWindow?.document;if(!t){console.error("ไม่สามารถเข้าถึง iframe document ได้");return}t.open(),t.write(`
    <html>
      <head>
        <title>${d}</title>
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
        <img src="${n}" />
      </body>
    </html>
  `),t.close(),e.onload=()=>{c&&(e.contentWindow?.focus(),e.contentWindow?.print()),setTimeout(()=>document.body.removeChild(e),1e3)}}export{s as p};
