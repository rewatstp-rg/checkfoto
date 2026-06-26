import { memo, useRef, useState } from 'react';

import { Box, Chip, Skeleton, IconButton } from '@mui/material';

import { selectOrder } from 'src/slices/order.slices';
import { setSelectImagePhoto } from 'src/slices/file.slices';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { PhotoType } from 'src/types/photo.type';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

const PhotoItem = ({ post, pageType, eventFreeStatus }: { post: PhotoType, pageType?: string, eventFreeStatus?: string }) => {

  const dispatch = useAppDispatch();

  const { photoCart } = useAppSelector(selectOrder);

  const listPhoto = photoCart?.listPhoto || [];
  const selectImagePhoto = Boolean(listPhoto.find((item) => item.uid === post.uid));

  const [isLoaded, setIsLoaded] = useState(false);
  const [ratio, setRatio] = useState<number | null>(null);

  const touchTimer = useRef<NodeJS.Timeout | null>(null);

  const {
    uid,
    imageThumbnailUrl,
    imageType
  } = post;

  const handleClick = () => {
    dispatch(setSelectImagePhoto(post));
  };

  const handleTouchEnd = () => {
    if (pageType !== 'ORDER') {
      if (touchTimer.current) {
        clearTimeout(touchTimer.current);
      }
    }
  };

  return (
    <Box
      key={uid}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      sx={{
        display: 'block',
        boxSizing: 'content-box',
        width: 'calc(100% + 0px)',
        aspectRatio: ratio ?? '2/3',
        position: 'relative',
        borderRadius: 1,
        border: '1px solid transparent',
        overflow: 'hidden',
        cursor: 'pointer',
        // width: "100%",
        marginBottom: "16px",
        '.overlay': {
          opacity: 1,
        },
        '&:hover .overlay': {
          opacity: 1,
        },
        ...(selectImagePhoto && {
          border: '3px solid #ff0000'
        })
      }}
    >

      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      )}

      {
        selectImagePhoto && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 22,
              height: 22,
              color: 'common.white',
              transition: 'all 0.25s ease',
              backgroundColor: '#ffffff',
              padding: 0,
            }}
          >
            <Iconify
              color="primary.main"
              icon="icon-park-solid:check-one"
              width={22}
            />
          </IconButton>
        )
      }

      {
        (imageType === "VIDEO" || imageType === "VIDEO_FINISH_LINE") && (
          <IconButton
            className="play-overlay"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              color: 'common.white',
              transition: 'all 0.25s ease',
              opacity: 0.9,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
                transform: 'translate(-50%, -50%) scale(1.08)',
              },
              '&:active': {
                transform: 'translate(-50%, -50%) scale(0.96)',
              },
            }}
          >
            <Iconify
              icon="garden:play-circle-fill-12"
              width={32}
            />
          </IconButton>
        )
      }

      {
        eventFreeStatus === 'ACTIVE' && <Chip
          size="small"
          variant="filled"
          color='primary'
          label='FREE'
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1
          }}
        />
      }

      <img
        onContextMenu={(e) => {
          if (pageType !== 'ORDER') {
            e.preventDefault(); // ปิดเมนูคลิกขวา
            console.log('Right-click detected');
          }
        }}
        onCopy={(e) => {
          if (pageType !== 'ORDER') {
            e.preventDefault();
            alert('ห้ามคัดลอก!');
          }
        }}
        onTouchStart={(e) => { if (pageType !== 'ORDER') { e.preventDefault() } }} // กัน Mobile
        loading="lazy"
        data-full={imageThumbnailUrl}
        onLoad={(e) => {
          const img = e.currentTarget;
          setRatio(img.naturalWidth / img.naturalHeight);
          setIsLoaded(true);
        }}
        onTouchEnd={handleTouchEnd}
        src={`${imageThumbnailUrl}`}
        alt={imageThumbnailUrl}
        decoding="async"
        style={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? 'none' : 'blur(20px)',
          transition: 'filter 0.3s ease-out',
          width: '100%',
          display: 'block',
          height: 'auto',
          ...(pageType !== 'ORDER' && {
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            pointerEvents: "none"
          })
        }}
      />

    </Box>
  );
};

export default memo(PhotoItem);
