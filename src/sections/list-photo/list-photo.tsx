import Masonry from '@mui/lab/Masonry';
import Grid from '@mui/material/Unstable_Grid2';

import PhotoItem from './photo-item';
import { PhotoItemSkeleton } from './photo-skeleton';

// ----------------------------------------------------------------------

type Props = {
  photos: any[];
  loading?: boolean;
};

export default function PhotoList({ photos, loading }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <PhotoItemSkeleton />
        </Grid>
      ))}
    </>
  );

  const renderList = (
    <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
      {photos.map((item, index) => (
        <div key={index}>
          <PhotoItem post={item} />
        </div>
      ))}
    </Masonry>
  );

  return (
    <>

      {loading ? renderSkeleton : renderList}


      {/* {photos.length > 8 && (
        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            mb: { xs: 10, md: 15 },
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />}
          >
            Load More
          </Button>
        </Stack>
      )} */}
    </>
  );
}
