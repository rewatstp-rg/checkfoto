import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

import ISOToDate from 'src/utils/ISOToDate';
import { HTML_KEY } from 'src/utils/constants';

import { useLocales } from 'src/locales';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectRegister, filterTicketByAge } from 'src/slices/register.slices';

import { Block } from '../block/block';

// ----------------------------------------------------------------------

type Props = DatePickerProps<any> & {
  name?: string;
  viewType?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  field?: any;
  error?: any;
  rest?: any;
  labelEn?: string;
};

const { TICKET_NAME_TH, TICKET_NAME_EN, TICKET_PRICE, PRICE_CODE, TICKET_CODE } = HTML_KEY;

export default function RHFDateFieldDynamic({ name, viewType, label, labelEn, helperText, size = 'medium', field, error, sx, rest, ...other }: Props) {

  const dispatch = useAppDispatch();
  const { currentLang } = useLocales();
  const { setValue, unregister } = useFormContext();

  const [valueDate, setValueDate] = useState(null);

  const { birthKey, listTicketOptionInputField } = useAppSelector(selectRegister);

  const minDate = new Date(rest.minDate);
  const maxDate = new Date(rest.maxDate);

  const requiredFiled: boolean = !!rest?.rules;

  useEffect(() => {

    if (field?.value) {
      const vDate: any = new Date(field.value);
      setValueDate(vDate);
    }

  }, [field?.value])

  return (
    <Block label={currentLang.value === 'th' ? label : labelEn} required={requiredFiled}>
      <DatePicker
        {...field}
        sx={{ mb: 0, mt: 0, ...sx }}
        // label={label}
        minDate={minDate}
        maxDate={maxDate}
        value={valueDate ?? null}
        onChange={(newValue: any) => {
          setValueDate(newValue);
          const formateDate = ISOToDate(new Date(newValue), 'dateRequest');
          if (birthKey === rest?.name) {
            const words: any = formateDate.split('-');
            const year = new Date().getFullYear();
            const age = year - words[0];
            if (listTicketOptionInputField && listTicketOptionInputField?.length > 0) {
              listTicketOptionInputField.map((ticketOptionInputField) => (
                unregister(ticketOptionInputField.key)
              ));
            }
            dispatch(filterTicketByAge(age));
            setValue(TICKET_CODE, '');
            setValue(TICKET_NAME_TH, '');
            setValue(TICKET_NAME_EN, '');
            setValue(TICKET_PRICE, 0);
            setValue(PRICE_CODE, '');
          }
          field.onChange(formateDate);
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            hiddenLabel: true,
            variant: 'filled',
            error: !!error,
            helperText: error ? error?.message : helperText,
            placeholder: currentLang.value === 'th' ? label : labelEn,
            margin: 'normal',
            size,
            required: requiredFiled
          },
        }}
        {...other}
      />
    </Block>
  )
}

