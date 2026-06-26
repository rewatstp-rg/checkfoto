import merge from 'lodash/merge';
// date fns
import { th as thAdapter, enUS as enUSAdapter } from 'date-fns/locale';

import { enUS as enUSDataGrid } from '@mui/x-data-grid';
import { enUS as enUSDate } from '@mui/x-date-pickers/locales';
import { enUS as enUSCore, thTH as thTHCore } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'ไทย',
    value: 'th',
    systemValue: merge(enUSDate, enUSDataGrid, thTHCore),
    adapterLocale: thAdapter,
    icon: 'flagpack:th',
    numberFormat: {
      code: 'th-TH',
      currency: 'THB',
    },
  },
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
    numberFormat: {
      code: 'en-US',
      currency: 'USD',
    },
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
