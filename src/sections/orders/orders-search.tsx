import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

import { OrderModel } from 'src/types/order.model';

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: OrderModel[];
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
  loading?: boolean;
};

export default function OrdersSearch({ query, results, onSearch, hrefItem, loading }: Props) {

  const router = useRouter();
  const { t } = useTranslate();

  const handleClick = (id: string) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectItem = results.filter((order) => order.orderPhotoNumber === query)[0];

        handleClick(selectItem?.orderPhotoNumber || '');
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 400 } }}
      loading={loading}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option?.orderPhotoNumber || ''}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('orders.search')}
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, order, { inputValue }) => {
        const matches = match(order?.orderPhotoNumber || '', inputValue);
        const parts = parse(order?.orderPhotoNumber || '', matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(order?.orderPhotoNumber || '')} key={order.id}>
            <Avatar
              key={order.orderPhotoNumber}
              alt={order.orderPhotoNumber}
              src={order.imageEventBannerUrl}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}