import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { getRatio } from './utils';
import { ImageProps } from './types';

// ----------------------------------------------------------------------

// ขยายประเภท props เพื่อรวม isLCP
interface LCPImageProps extends ImageProps {
  isLCP?: boolean; // เพิ่ม prop ใหม่สำหรับระบุว่าเป็น LCP image
}

const ImageBanner = forwardRef<HTMLSpanElement, LCPImageProps>(
  (
    {
      ratio,
      overlay,
      disabledEffect = false,
      //
      alt,
      src,
      afterLoad,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = 'blur',
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      paddingTop = '60%',
      sx,
      sizesImage,
      isLCP = false, // กำหนดค่าเริ่มต้นเป็น false
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const overlayStyles = !!overlay && {
      '&:before': {
        content: "''",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 1,
        position: 'absolute',
        background: overlay || alpha(theme.palette.grey[900], 0.48),
      },
    };

    // 1. กำหนด component ที่จะใช้: <img> ปกติ ถ้า isLCP เป็นจริง, LazyLoadImage ถ้า isLCP เป็นเท็จ
    const ImageComponent = isLCP ? 'img' : (LazyLoadImage as any);

    // 2. กำหนด props ที่ใช้ร่วมกัน
    const commonProps = {
      alt,
      src,
      sizes: sizesImage,
      sx: {
        width: 1,
        height: 1,
        objectFit: 'cover',
        verticalAlign: 'bottom',
        ...(!!ratio && {
          top: 0,
          left: 0,
          position: 'absolute',
        }),
      },
      // 3. สำหรับรูปภาพ LCP ให้ตั้งค่า fetchpriority="high"
      ...(isLCP && { fetchpriority: 'high', rel: "preload" }),
    };

    // 4. กำหนด props เฉพาะสำหรับ LazyLoadImage
    const lazyLoadProps = !isLCP ? {
      afterLoad,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder:
        placeholder ||
        (
          <Skeleton
            variant="rectangular"
            sx={{
              width: 1,
              height: 1,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        ),
      wrapperProps,
      scrollPosition,
      effect: disabledEffect ? undefined : effect,
      wrapperClassName: wrapperClassName || 'component-image-wrapper',
      // placeholderSrc: disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg',
      // เนื่องจากเราต้องการปิด Lazy Load สำหรับ LCP,
      // สำหรับรูปภาพที่ยังคงใช้ Lazy Load เราควรตั้งค่าเหล่านี้ตามที่คุณมีอยู่
      visibleByDefault, // ใช้ prop เดิม
      useIntersectionObserver, // ใช้ prop เดิม
    } : {};

    const content = (
      <Box
        component={ImageComponent}
        {...commonProps}
        {...lazyLoadProps} // รวม props สำหรับ LazyLoad (จะว่างเปล่าถ้า isLCP เป็นจริง)
      />
    );

    // 5. ปรับ wrapper className สำหรับ LazyLoadImage:
    // LazyLoadImage จะสร้าง <span> wrapper ที่ต้องใช้ .component-image-wrapper
    // แต่ถ้าเป็น <img> ปกติ wrapper นี้จะไม่มีผล
    const wrapperClasses = !isLCP ? 'component-image-wrapper' : '';

    return (
      <Box
        ref={ref}
        component="span"
        className="component-image"
        sx={{
          overflow: 'hidden',
          position: 'relative',
          verticalAlign: 'bottom',
          display: 'inline-block',
          ...(!!ratio && {
            width: 1,
          }),
          // 6. ปรับการตั้งค่าความสูง/อัตราส่วนสำหรับ wrapper
          [`& span.${wrapperClasses}`]: {
            width: 1,
            height: 1,
            verticalAlign: 'bottom',
            backgroundSize: 'cover !important',
            ...(!!ratio && {
              pt: getRatio(ratio),
            }),
            paddingTop,
          },
          // สำหรับ <img> ปกติ, เราอาจไม่ต้องการ paddingTop สำหรับ <span> wrapper
          ...(!isLCP && {
            [`& span.${wrapperClasses}`]: {
              // ... style เดิม
            }
          }),
          ...overlayStyles,
          ...sx,
        }}
        {...other}
      >
        {content}
      </Box>
    );
  }
);

export default ImageBanner;