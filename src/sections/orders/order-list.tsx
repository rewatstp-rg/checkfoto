import { useState } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import usePagination from 'src/utils/use-pagination';

import { OrderModel } from 'src/types/order.model';
import { EventModel } from 'src/types/event-config.model';

import OrderItem from './order-item';
import { OrderSkeleton } from './orders-skeleton';

// ----------------------------------------------------------------------

type Order = EventModel & OrderModel;

type Props = BoxProps & {
  orders: Order[];
  loading?: boolean;
  handleDeleteOrder: (order: Order) => void;
};

export default function OrderList({ orders, loading, handleDeleteOrder, ...other }: Props) {

  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  const count = Math.ceil(orders.length / PER_PAGE);
  const _DATA = usePagination(orders, PER_PAGE);

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <OrderSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {_DATA?.currentData()?.map((order) => (
        <OrderItem key={order.orderPhotoNumber} order={order} handleDeleteOrder={() => handleDeleteOrder(order)} />
      ))}
    </>
  );

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          // lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {orders.length > 8 && (
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
