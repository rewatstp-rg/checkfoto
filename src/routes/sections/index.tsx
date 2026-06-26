/* eslint-disable perfectionist/sort-imports */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import MainLayout from 'src/layouts/main';
import { AuthGuard } from "src/auth/guard";
// import CompactLayout from 'src/layouts/compact';

import { SplashScreen, LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const MainLayout = lazy(() => import('src/layouts/main'));
const CompactLayout = lazy(() => import('src/layouts/compact'));

const OrdersPage = lazy(() => import('src/pages/orders/orders-page'));
const CheckoutPage = lazy(() => import('src/pages/checkout/checkout-page'));
const LandingPage = lazy(() => import('src/pages/landing-page/landing-page'));
const ListPhotoPage = lazy(() => import('src/pages/list-photo/list-photo-page'));
const LineAuthenPage = lazy(() => import('src/pages/line-authen/line-authen-page'));
const OrderDetailPage = lazy(() => import('src/pages/order-detail/order-detail-page'));
const PrivacyPolicyPage = lazy(() => import('src/pages/privacy-policy/privacy-policy-page'));
const FacebookAuthenPage = lazy(() => import('src/pages/facebook-authen/facebook-authen-page'));
const EventSearchResultPage = lazy(() => import('src/pages/event-search-result/event-search-result-page'));
const OrderPhotoDownloadPage = lazy(() => import('src/pages/order-photo-download/order-photo-download-page'));

const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const EventNotFoundPage = lazy(() => import('src/pages/event-not-found'));

const CustomPhotoPage = lazy(() => import('src/pages/custom-photo/custom-photo-page'));

const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
const NewPasswordForEmailPage = lazy(() => import('src/pages/auth/new-password-for-email'));

const ViewCommonImageFramePage = lazy(() => import('src/pages/upload-common-image-frame/view-common-image-frame-page'));
const UploadCommonImageFramePage = lazy(() => import('src/pages/upload-common-image-frame/upload-common-image-frame-page'));

const TermsOfUsePage = lazy(() => import('src/pages/terms-of-use/terms-of-use-page'));

export default function Router() {

  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <MainLayout>
            <LandingPage />
          </MainLayout>
        </Suspense>
      )
    },
    {
      path: 'forgot-password',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <ForgotPasswordPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'new-password-for-email',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <NewPasswordForEmailPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'download-photo/:orderPhotoNumber',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <MainLayout>
            <AuthGuard url="/download-photo">
              <OrderPhotoDownloadPage />
            </AuthGuard>
          </MainLayout>
        </Suspense>
      ),
    },
    {
      path: 'line',
      element: (
        <MainLayout>
          <LineAuthenPage />
        </MainLayout>
      ),
    },
    {
      path: 'facebook',
      element: (
        <MainLayout>
          <FacebookAuthenPage />
        </MainLayout>
      ),
    },
    {
      path: 'event/:eventUrl',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <ListPhotoPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'event/:eventUrl/:token',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <ListPhotoPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'order',
      element: (
        <MainLayout>
          <AuthGuard url="/order">
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </AuthGuard>
        </MainLayout>
      ),
      children: [
        { path: '', element: <OrdersPage /> },
        { path: ':orderPhotoNumber', element: <OrderDetailPage /> },
      ],
    },
    {
      path: 'privacy-policy',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <PrivacyPolicyPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'terms-of-use',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <TermsOfUsePage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'result',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <EventSearchResultPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: 'checkout',
      element: (
        <MainLayout>
          <AuthGuard url="/checkout">
            <Suspense fallback={<LoadingScreen />}>
              <CheckoutPage />
            </Suspense>
          </AuthGuard>
        </MainLayout>
      ),
    },
    {
      path: 'custom-photo',
      element: (
        <MainLayout>
          <AuthGuard url="/custom-photo">
            <Suspense fallback={<LoadingScreen />}>
              <CustomPhotoPage />
            </Suspense>
          </AuthGuard>
        </MainLayout>
      ),
    },
    {
      path: 'upload-common-image-frame/:eventUrl',
      element: (
        <UploadCommonImageFramePage />
      ),
    },
    {
      path: 'viewer-common-image-frame/:eventUrl',
      element: (
        <ViewCommonImageFramePage />
      ),
    },
    {
      element: (
        <CompactLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </CompactLayout>
      ),
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: 'event-not-found', element: <EventNotFoundPage /> },

      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
