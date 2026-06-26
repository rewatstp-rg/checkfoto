
// import liff from '@line/liff';
// import VConsole from 'vconsole';
// import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import 'src/locales/i18n';
import ThemeProvider from 'src/theme';
import { store } from 'src/store/store';
import { LocalizationProvider } from 'src/locales';

import ProgressBar from 'src/components/progress-bar';
import { SettingsProvider } from 'src/components/settings';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';

import packageJson from "../package.json";
import ChatLoader from './utils/chat-loader';

// ----------------------------------------------------------------------

const HOST_TYPE = import.meta.env.VITE_HOST_TYPE;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  console.log(`%cWelcome to Checkfoto version : ${packageJson.version}`, 'color:rgb(218, 85, 85); font-size: 20px;');
  useScrollToTop();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'default', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'red', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  {/* <SettingsDrawer /> */}
                  <ProgressBar />
                  {
                    HOST_TYPE === "PROD" && (
                      <ChatLoader />
                    )
                  }
                  <Router />
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App
