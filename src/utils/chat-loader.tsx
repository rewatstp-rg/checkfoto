import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ChatLoader() {
    const location = useLocation();

    useEffect(() => {
        // กำหนด path ที่ "ห้ามมีแชท"
        const disabledPages = ["upload-common-image-frame", "checkout", "viewer-common-image-frame"];

        const shouldBlock = disabledPages.some(keyword =>
            location.pathname.includes(keyword)
        );

        if (shouldBlock) {
            return; // ไม่โหลด widget
        }

        // โหลด widget script
        const script = document.createElement("script");
        script.src = "//fw-cdn.com/13966977/5854506.js";
        script.setAttribute("chat", "true");
        script.setAttribute("widgetId", "72247ee6-f97b-4b85-ad31-bbd0e25dc0b9");
        script.async = true;
        document.body.appendChild(script);

        // eslint-disable-next-line consistent-return
        return () => script.remove();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return null;
}