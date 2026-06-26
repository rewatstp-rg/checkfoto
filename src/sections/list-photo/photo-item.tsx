import { memo } from 'react';

import { Box } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';

import { useAppDispatch } from 'src/store/hooks';
import { setSelectImagePhoto } from 'src/slices/file.slices';

import TextMaxLine from 'src/components/text-max-line';

import { PhotoType } from 'src/types/photo.type';

// ----------------------------------------------------------------------

type Props = {
  post: PhotoType;
};

const PhotoItem = ({ post }: Props) => {
  const {
    uid,
    imageThumbnailUrl
  } = post;

  const dispatch = useAppDispatch();

  // const { fullName, addonLogoUrl } = photographerModel;

  const handleClick = () => {
    dispatch(setSelectImagePhoto(post));
  };

  return (
    <Box
      key={uid}
      onClick={handleClick}
      sx={{
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        '.overlay': {
          opacity: 1,
        },
        '&:hover .overlay': {
          opacity: 1,
        },
      }}
    >
      
      <img
        loading="lazy"
        src={imageThumbnailUrl}
        alt={imageThumbnailUrl}
        style={{ width: '100%', display: 'block' }}
      />

      {/* <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // backgroundColor: 'rgba(0,0,0,0.4)',
          // color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <Avatar
          alt={fullName}
          src={addonLogoUrl}
          sx={{
            top: 24,
            left: 24,
            zIndex: 9,
            position: 'absolute',
          }}
        />
        <PhotoContent title={fullName} />
      </Box> */}
    </Box>
  );
};

export default memo(PhotoItem);

// ----------------------------------------------------------------------

type PhotoContentProps = {
  title: string;
};

export function PhotoContent({
  title,
}: PhotoContentProps) {

  return (
    <CardContent
      sx={{
        width: 1,
        pt: 0,
        zIndex: 9,
        bottom: 0,
        position: 'absolute',
        color: 'common.white',
      }}
    >

      <TextMaxLine variant='subtitle2' line={1} persistent>
        Photographer : {title}
      </TextMaxLine>
    </CardContent>
  );
}
