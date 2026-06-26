import { useEffect } from 'react';

const RedirectToChrome = () => {
  useEffect(() => {
    const isFacebookOrLineBrowser = (): boolean => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.includes('fbav') || ua.includes('line');
    };

    const isAndroid = (): boolean => (/android/i.test(navigator.userAgent));

    const redirectToChrome = () => {
      const currentUrl = window.location.href;
      const cleanUrl = currentUrl.replace(/^https?:\/\//, '');
      const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end;`;
      window.location.href = intentUrl;
    };

    if (isFacebookOrLineBrowser() && isAndroid()) {
      redirectToChrome();
    }
  }, []);

  return null;
};

export default RedirectToChrome;
