import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { enqueueSnackbarErrorComponent } from 'src/utils/enqueueSnackbarComponent';

import { useLocales, useTranslate } from 'src/locales';
import { clearPhotoCart } from 'src/slices/order.slices';
import { useGetOrderDetailMutation } from 'src/api/order.api';
import { useListPhotoByOrderMutation } from 'src/api/photo.api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setLoadingState } from 'src/slices/error-message.slices';
import { useListEventPhotoFrameByEventCodeMutation } from 'src/api/event-photo-frame';
import { seleceFileModel, setResultSearchMyFace, setOpenDialogSelectImage } from 'src/slices/file.slices';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import VirtualMasonryGallery from 'src/components/photo/virtual-masonry-gallery';

import { OrderPhotoModel } from 'src/types/order-photo.type';
import { EventPhotoFrameModel } from 'src/types/event-photo-frame.type';

import ImageDownloadDialog from '../image-download-dialog';
import PaymentDetailContent from '../payment-detail-content';

// ----------------------------------------------------------------------

type Props = {
  orderPhotoNumber: string;
}

export default function OrderPhotoDownloadView({ orderPhotoNumber }: Props) {

  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const { currentLang } = useLocales();
  const router = useRouter();

  const { openDialogSelectImage } = useAppSelector(seleceFileModel);

  const [getOrderDetail] = useGetOrderDetailMutation();
  const [callListPhoto] = useListPhotoByOrderMutation();
  const [listEventPhotoFrameByEventCodeApi] = useListEventPhotoFrameByEventCodeMutation();

  const [arrayList, setArrayList] = useState<any[]>([]);
  const [videoArrayList, setVideoArrayList] = useState<any[]>([]);
  const [frames, setFrames] = useState<EventPhotoFrameModel[]>([]);
  const [orderPhotoModel, setOrderPhotoModel] = useState<OrderPhotoModel | null>(null);

  const isFacebookOrLineBrowser = (): boolean => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('fbav') || ua.includes('line');
  };

  const loadFrame = async (eventCode: string) => {
    await listEventPhotoFrameByEventCodeApi({ eventCode }).unwrap().then((res) => {
      const { data } = res;
      setFrames(data);
    }).catch(err => {
      console.error('โหลดรูปไม่ได้:', err);
    });
  }

  const loadOrderDetail = async () => {
    await getOrderDetail({
      orderPhotoNumber,
      totalOrder: 0,
      totalAmount: null,
      paymentGatewayFee: null,
      paymentGatewayFeeUnit: '',
      paymentMethod: '',
      discountAmount: null,
      netAmount: null
    }).unwrap().then((response: any) => {
      if (response && response?.status && response.status?.description === 'SUCCESS') {
        const { data } = response;
        // console.log("🚀 ~ loadOrderDetail ~ data:", data);
        if (data?.status === 'PAID') {
          setOrderPhotoModel(data);
          loadFrame(data.eventCode);
        } else {
          router.push(`/order`);
        }
      } else {
        enqueueSnackbarErrorComponent(
          currentLang.value === 'th'
            ? 'เกิดข้อผิดพลาดระหว่างสร้างคำสั่งซื้อ'
            : 'Error creating order'
        );
      }
    }).catch(err => {
      console.error('โหลดรูปไม่ได้:', err);
      router.push(`/order`);
    })
  }

  const loadContent = () => {
    dispatch(setLoadingState(true));
    loadOrderDetail();
    callListPhoto({
      orderPhotoNumber,
      totalOrder: 0,
      totalAmount: null,
      paymentGatewayFee: null,
      paymentGatewayFeeUnit: '',
      paymentMethod: '',
      discountAmount: null,
      netAmount: null
    }).unwrap().then((response: any) => {
      if (response && response?.status && response.status?.description === 'SUCCESS') {
        const { data } = response;
        const arrPhoto = data?.filter((item: any) => item?.imageType !== 'VIDEO' && item?.imageType !== 'VIDEO_FINISH_LINE');
        const arrVideo = data?.filter((item: any) => item?.imageType === 'VIDEO' || item?.imageType === 'VIDEO_FINISH_LINE');
        // console.log("🚀 ~ loadContent ~ arrVideo:", arrVideo);
        setArrayList(arrPhoto);
        setVideoArrayList(arrVideo);
      } else {
        setArrayList([]);
        setVideoArrayList([]);
        enqueueSnackbarErrorComponent(
          currentLang.value === 'th'
            ? 'เกิดข้อผิดพลาดระหว่างสร้างคำสั่งซื้อ'
            : 'Error creating order'
        );
      }
    });
    dispatch(setLoadingState(false));
  }

  const downloadAll = () => {
    const link = document.createElement('a');
    link.href = orderPhotoModel?.downloadAllUrl || '';
    link.download = `${orderPhotoModel?.orderPhotoNumber}.zip` || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const downloadAllFrame = () => {
    const link = document.createElement('a');
    link.href = orderPhotoModel?.downloadFrameAllUrl || '';
    link.download = `${orderPhotoModel?.orderPhotoNumber}.zip` || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    dispatch(setOpenDialogSelectImage(false));
    dispatch(clearPhotoCart());
    dispatch(setResultSearchMyFace(undefined));
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      maxWidth='lg'
      sx={{
        mt: 2,
        mb: 2,
      }}
    >
      <CustomBreadcrumbs
        links={[
          { name: t('common.home'), href: '/' },
          { name: t('orders.title'), href: paths.order.root },
          { name: t('orders.orderPhotoDownload') },
        ]}
        sx={{ mb: 3 }}
      />

      <PaymentDetailContent orderPhotoModel={orderPhotoModel || {} as OrderPhotoModel} downloadAll={downloadAll} downloadAllFrame={downloadAllFrame} />

      {
        isFacebookOrLineBrowser() ? (
          <Box sx={{ mb: 3, color: 'error.main' }}>{t('messageError.browserWarning')}</Box>
        ) : null
      }

      <Box sx={{
        padding: '1rem',
        border: '1px dashed #89898929',
        borderRadius: 1,
        marginBottom: '2rem'
      }}>
        {
          videoArrayList.length > 0 && (
            <>
              <VirtualMasonryGallery images={videoArrayList} pageType="ORDER" />
              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
            </>
          )
        }
        {
          arrayList?.length > 0 && (
            <VirtualMasonryGallery images={arrayList} pageType='ORDER' />
          )
        }

      </Box>

      {openDialogSelectImage && <ImageDownloadDialog
        frames={frames}
        orderPhotoNumber={orderPhotoNumber}
        open={openDialogSelectImage || false}
        onClose={() => dispatch(setOpenDialogSelectImage(false))}
      />}
    </Container>
  );
}

