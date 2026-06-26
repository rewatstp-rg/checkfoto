import { useState, useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { Box, Stack, Typography } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import { fNumber } from 'src/utils/format-number';
import { calcAgeGroup } from 'src/utils/calc-age-group';
import { HTML_KEY, AGE_GROUP_NOT_FOUND } from 'src/utils/constants';

// import { BaseOption } from 'src/api/base/types';
import { useLocales } from 'src/locales';
import { pxToRem } from 'src/theme/typography';
import { useAppSelector } from 'src/store/hooks';
import { selectRegister } from 'src/slices/register.slices';

// import Lightbox, { useLightBox } from 'src/components/lightbox';

import Image from '../image';
import Iconify from '../iconify';
import Label from '../label/label';
import { Block } from '../block/block';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name?: string;
  label?: string;
  labelEn?: string;
  placeholder?: string;
  type?: 'country' | string;
  helperText?: React.ReactNode;
  value?: any;
  options: any[];
  required?: boolean;
  viewType?: string;
  onChangeInput?: any;
  field?: any;
  error?: any;
  rest?: any;
  ticketOnChange: (e: string) => void;
}

export default function RHFAutocompleteDynamicTicket<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  labelEn,
  type,
  helperText,
  placeholder,
  value,
  options = [],
  required,
  viewType,
  onChangeInput,
  size = 'medium',
  field,
  error,
  rest,
  ticketOnChange,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {

  const { currentLang } = useLocales();
  const { setValue, unregister } = useFormContext();
  const { listTicketOptionInputField } = useAppSelector(selectRegister);

  const { TICKET_NAME_TH, TICKET_NAME_EN, TICKET_PRICE, PRICE_CODE, COUPON_CODE, DISCOUNT_STATUS, DISCOUNT_AMOUNT, AMOUNT, TOTAL_AMOUNT } = HTML_KEY;

  const [inputValue, setInputValue] = useState<any>('');
  const [optionValue, setOptionValue] = useState<any>(options?.find((x) => x.key === field?.value));

  const requiredFiled: boolean = !!rest?.rules?.required;

  const errorMessage: string = currentLang.value === 'th' ? `กรุณาระบุ` : `Please specify`;

  const disableAutocomplete = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });
  };

  useEffect(() => {
    disableAutocomplete();
  }, []);

  return (
    <Block label={currentLang.value === 'th' ? label : labelEn} required={requiredFiled}>
      <Autocomplete
        sx={{ width: '100%' }}
        size={size}
        {...field}
        id={`autocomplete-${name}`}
        value={optionValue}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        getOptionDisabled={(option: any) => option?.status === 'FULL'}
        placeholder={currentLang.value === 'th' ? label : labelEn}
        renderOption={(props, option: any) => {
          const { ...optionProps } = props;
          const { ticketPriceActive } = option;
          // console.log("🚀 ~ file: rhf-autocomplete-ticket.tsx:114 ~ option:", option)
          // console.log("🚀 ~ file: rhf-autocomplete-ticket.tsx:114 ~ ticketPriceActive:", ticketPriceActive)
          return (
            <Box
              key={option.key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              {
                option?.status !== 'FULL' &&
                <Label variant="soft" color="error" sx={{ mr: 0.5 }}>
                  {currentLang.value === 'en' ? 'THB' : 'ราคา'}  {fNumber(ticketPriceActive?.price) || '0'}
                </Label>
              }

              {currentLang.value === 'en' ? option?.labelEn : option?.labelTh}

              {
                option?.status === 'FULL' &&
                <Label variant="soft" color="error" sx={{ ml: 0.5 }}>
                  {currentLang.value === 'en' ? 'Full' : 'เต็ม'}
                </Label>
              }
            </Box>
          );
        }}
        getOptionLabel={(option: any) => (currentLang.value === 'en' ? option?.labelEn : option?.labelTh) || ''}
        isOptionEqualToValue={(option: any, values: any) =>
          option?.id === values?.id
        }
        onChange={(event, newValue: any) => {
          if (listTicketOptionInputField && listTicketOptionInputField?.length > 0) {
            listTicketOptionInputField.map((ticketOptionInputField) => (
              unregister(ticketOptionInputField.key)
            ));
          }
          // dispatch(setListTicketOptionInputField([]));
          if (newValue) {
            if (onChangeInput) {
              onChangeInput({
                target: {
                  name,
                  value: newValue?.id,
                },
              })
            }

            ticketOnChange(newValue?.id);
            field.onChange(newValue?.id);
            setValue(TICKET_NAME_TH, newValue.labelTh);
            setValue(TICKET_NAME_EN, newValue.labelEn);
            setValue(TICKET_PRICE, newValue?.ticketPriceActive?.price || 0);
            setValue(PRICE_CODE, newValue?.ticketPriceActive?.priceCode || '');

            setValue(TOTAL_AMOUNT, newValue?.ticketPriceActive?.price || 0);
            setValue(AMOUNT, newValue?.ticketPriceActive?.price || 0);
            setValue(DISCOUNT_AMOUNT, 0);
            setValue(DISCOUNT_STATUS, "INACTIVE");
            setValue(COUPON_CODE, "");

            setOptionValue(newValue);

          } else {
            if (onChangeInput) {
              onChangeInput({
                target: {
                  name,
                  value: '',
                },
              })
            }

            ticketOnChange('');
            field.onChange('');
            setValue(TICKET_NAME_TH, '');
            setValue(TICKET_NAME_EN, '');
            setValue(TICKET_PRICE, 0);
            setValue(PRICE_CODE, '');

            setValue(TOTAL_AMOUNT, 0);
            setValue(AMOUNT, 0);
            setValue(DISCOUNT_AMOUNT, 0);
            setValue(DISCOUNT_STATUS, "INACTIVE");
            setValue(COUPON_CODE, "");

            setOptionValue(null);
          }



        }}
        renderInput={(params) => {

          const baseField = {
            ...params,
            required: requiredFiled,
            placeholder: currentLang.value === 'th' ? label : labelEn,
            error: !!error,
            helperText: error ? errorMessage : helperText,
            inputProps: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          };

          return (
            <TextField
              {...baseField}
              hiddenLabel
              variant='filled'
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {
                      optionValue && <Label variant="soft" color="error" sx={{ mr: 0.5 }}>
                        {currentLang.value === 'en' ? 'THB' : 'ราคา'}  {fNumber(optionValue?.ticketPriceActive?.price) || '0'}
                      </Label>
                    }
                  </>
                ),
              }}
            />
          )

        }}
        {...other}
      />
      <RenderAgeGroup selectOption={optionValue} />
      <RenderTicketImageFileUrl selectOption={optionValue} />
    </Block>
  );
}


export function RenderAgeGroup({ selectOption }: any) {

  const { AGE_GROUP } = HTML_KEY;

  const { currentLang } = useLocales();
  const { control, setValue } = useFormContext();

  const { registerFormDetail, genderKey, birthKey, listGenderFormOption } = useAppSelector(selectRegister);

  const genderFormValue = useWatch({ control, name: genderKey });
  const birthDayFormValue = useWatch({ control, name: birthKey });

  const [ageGroupUserDesc, setAgeGroupUserDesc] = useState<any>('');

  const renderAgeGroup = (ticketModel: any) => {

    const genderSelect = listGenderFormOption?.find((x) => x.key === genderFormValue);
    if (genderSelect?.value1 && ticketModel && ticketModel?.listTicketAgeGroup && ticketModel.listTicketAgeGroup?.length > 0 && birthDayFormValue) {
      const listAge = [...ticketModel.listTicketAgeGroup];
      const ageGroup = calcAgeGroup(birthDayFormValue, listAge, genderSelect?.value1, registerFormDetail?.eventDate);
      if (ageGroup && ageGroup?.ageGroupDesc) {
        setAgeGroupUserDesc(ageGroup.ageGroupDesc);
        setValue(AGE_GROUP, ageGroup.ageGroupDesc);
      } else {
        setAgeGroupUserDesc(currentLang.value === 'th' ? AGE_GROUP_NOT_FOUND.TH : AGE_GROUP_NOT_FOUND.EN);
        setValue(AGE_GROUP, 'NONE');
      }
    } else {
      setAgeGroupUserDesc('');
      setValue(AGE_GROUP, 'NONE');
    }
  }

  useEffect(() => {
    renderAgeGroup(selectOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderFormValue, listGenderFormOption, birthDayFormValue, selectOption]);

  return (
    <>
      {
        ageGroupUserDesc && <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start" gap={1}>
          <Typography
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Iconify width={16} icon="ph:warning-octagon" sx={{ flexShrink: 0, mr: 1 }} />
            <Typography variant="caption">
              {currentLang.value === 'th' ? `รุ่นอายุ: ${ageGroupUserDesc} หากไม่ถูกต้องกรุณาตรวจสอบวันเดือนปีเกิดอีกครั้ง` : `Age Group: ${ageGroupUserDesc} If it is not correct, please check your birth date again.`}
            </Typography>
          </Typography>
        </Stack>
      }
    </>
  )

}

export function RenderTicketImageFileUrl({ selectOption }: any) {

  // const lightbox = useLightBox([{ src: selectOption?.ticketImageFileUrl }]);

  return (
    selectOption?.ticketImageFileUrl &&
    <Box>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'left',
          width: '100%',
          maxWidth: '100%',
          fontWeight: 'Bold',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
          paddingLeft: '0.4rem',
          fontSize: pxToRem(14),
          mt: 2
        }}
      >
        Race Pack
      </Typography>
      <Box textAlign='center' sx={{ maxWidth: 300, margin: 'auto', mt: 2 }}>
        <Image
          alt='Ticket-Image'
          src={selectOption?.ticketImageFileUrl}
          paddingTop={0}
          sx={{
            maxWidth: 300, marginTop: 0, marginBottom: 3, borderRadius: 1, width: '100%'
          }}
        // onClick={() => lightbox.onOpen(selectOption?.ticketImageFileUrl)}
        />
        {/* <Lightbox
          index={lightbox.selected}
          slides={[{ src: selectOption?.ticketImageFileUrl }]}
          open={lightbox.open}
          close={lightbox.onClose}
          onGetCurrentIndex={(index) => lightbox.setSelected(index)}
        /> */}
      </Box>
      {/* https://race-checkrace.solutioninsight.tech/shared-image/event-image/test_001/ticket-image/20241017130552_20240923185729_PSMH25_Racepack10.jpg */}
      {/* selectOption?.ticketImageFileUrl */}

    </Box>
  )
}
