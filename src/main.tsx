import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/* eslint-disable perfectionist/sort-imports */
import App from './App';

/* eslint-disable perfectionist/sort-imports */
// import './index.css';

declare const __APP_VERSION__: string;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const KEY = 'app-version';
const storedVersion = localStorage.getItem(KEY);

const PRESERVE_PREFIXES = [
  'accepted-policy-',
  'i18nextLng',
];

const shouldPreserve = (key: string) =>
  PRESERVE_PREFIXES.some(prefix => key.startsWith(prefix));

if (storedVersion && storedVersion !== __APP_VERSION__) {

  // clear localStorage แบบเลือกได้
  const keysToRemove: string[] = [];

  Object.keys(localStorage).forEach((key) => {
    if (!shouldPreserve(key)) {
      keysToRemove.push(key);
    }
  });

  keysToRemove.forEach((key) => {
    localStorage.removeItem(key);
  });

  sessionStorage.clear();

  if ('caches' in window) {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => regs.forEach(r => r.unregister()));
  }

  localStorage.setItem(KEY, __APP_VERSION__);

  console.log('🔄 App updated from : ', storedVersion, 'to', __APP_VERSION__);
  window.location.reload();
} else {
  console.log('🔄 App from : ',  __APP_VERSION__);
  localStorage.setItem(KEY, __APP_VERSION__);
}

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
