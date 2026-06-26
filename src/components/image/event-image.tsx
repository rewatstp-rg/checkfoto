import { useEffect, forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { getRatio } from './utils';
import { ImageProps } from './types';

// ----------------------------------------------------------------------

const EventImage = forwardRef<HTMLSpanElement, ImageProps>(
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
      sx,
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
        position: 'relative',
        padding: '0px 20px',
        background: overlay || alpha(theme.palette.grey[900], 0.48),
      },
    };

    useEffect(() => {
      const link: any = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "image";
      document.head.appendChild(link);
    }, [src]);

    const content = (
      <picture>
        <Box
          component={LazyLoadImage}
          alt={alt}
          src={src}
          afterLoad={afterLoad}
          delayTime={delayTime}
          threshold={threshold}
          beforeLoad={beforeLoad}
          delayMethod={delayMethod}
          placeholder={placeholder}
          wrapperProps={wrapperProps}
          scrollPosition={scrollPosition}
          visibleByDefault={visibleByDefault}
          effect={disabledEffect ? undefined : effect}
          useIntersectionObserver={useIntersectionObserver}
          wrapperClassName={wrapperClassName || 'component-image-wrapper'}
          placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'}
          //
          sx={{
            objectFit: 'cover',
            verticalAlign: 'bottom',
            ...(!!ratio && {
              top: 0,
              left: 0,
              position: 'relative',
              padding: '0px 20px',
            }),
          }}
        />
      </picture>
    );

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
          '& span.component-image-wrapper': {
            width: 1,
            height: 1,
            verticalAlign: 'bottom',
            backgroundSize: 'cover !important',
            ...(!!ratio && {
              pt: getRatio(ratio),
            }),
            paddingTop: '0%',
          },
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

export default EventImage;
