import { useCallback } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import { EventCardItem } from 'src/components/event-card/event-card-item';

import { EventPhoto } from 'src/types/photo.type';

import { CardItemSkeleton } from './card-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  listEvent: EventPhoto[];
  loading?: boolean;
  rowPerView?: number;
};

export default function ListEventCard({ listEvent, loading, rowPerView = 8, ...other }: Props) {

  const router = useRouter();

  const isLoading = listEvent?.length === 0;

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <CardItemSkeleton key={index} />
      ))}
    </>
  );

  const handleView = useCallback(
    (eventUrl?: string) => {
      if (eventUrl) {
        router.push(`/event/${eventUrl}`);
      }
    },
    [router]
  );

  const renderList = (
    <>
      {listEvent?.map((eventItem) => (
        <EventCardItem
          key={eventItem.eventCode}
          eventModel={eventItem}
          onView={() => handleView(eventItem.eventUrl)}
        />
      ))}
    </>
  );

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {isLoading ? renderSkeleton : renderList}
    </Box>
  );
}
