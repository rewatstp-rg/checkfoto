
import { useEffect } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';

import { useLocales } from 'src/locales';
import { useAppSelector } from 'src/store/hooks';
import { selectRegister } from 'src/slices/register.slices';

import { Block } from '../block/block';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  viewType?: string;
  inputType?: string;
  labelEn?: string;
  field?: any;
  error?: any;
  rest?: any;
};

export default function RHFTextFieldDynamic({ field, label, name, labelEn, type = 'text', inputProps, error, helperText, placeholder, inputType, size = 'medium', rest, ...other }: Props) {
  // console.log("🚀 ~ RHFTextFieldDynamic ~ field:", field.value)
  const { currentLang } = useLocales();
  const { idCardKey } = useAppSelector(selectRegister);

  let errorMessage: string = currentLang.value === 'th' ? `กรุณาระบุ` : `Please specify`;
  const inputTypeConfig = idCardKey === rest?.name && currentLang.value === 'en' ? 'ALL' : rest?.inputType;

  // console.log("🚀 ~ file: rhf-text-field.tsx:30 ~ RHFTextFieldDynamic ~ rest:", rest)

  if (error?.type === "minLength") {
    errorMessage = currentLang.value === 'th' ? `กรุณาระบุขึ้นต่ำสุดได้เพียง ${rest?.rules?.minLength} ตัวอักษร` : `There must be at least ${rest?.rules?.minLength} character`;
  } else if (error?.type === "maxLength") {
    errorMessage = currentLang.value === 'th' ? `กรุณาระบุสูงสุดได้เพียง ${rest?.rules?.maxLength} ตัวอักษร` : `Must not exceed ${rest?.rules?.maxLength} character`;
  } else if (error?.type === "pattern" && error?.message === "invalid email address") {
    errorMessage = currentLang.value === 'th' ? `รูปแบบของอีเมลไม่ถูกต้อง` : `Invalid email address`;
  } else {
    errorMessage = currentLang.value === 'th' ? `กรุณาระบุ` : `Please specify`;
  }

  const requiredFiled: boolean = !!rest?.rules?.required;

  const onlyNumbersRegex = /^[0-9]*$/;
  const isNumber = (inputTypeConfig === 'numberChar' || inputTypeConfig === "NUMBER" || inputTypeConfig === "TEL");

  const onlyCurrencyRegex = /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/;

  // const onlyTextWithOutSpecialRegex = /[@!$^&*()\[\]{};:'"\\|,.<>\/?~`#_]/g;
  const constantsThaiCharacterRegex = /[^ก-๏]/g;
  // const engOrNumberRegex = /[^A-Za-z0-9]/g;
  const engOrThRegex = /[^ก-๏a-zA-Z]/g;
  const engOnlyRegex = /[^a-zA-Z]/g;
  // const emailRegex = /[^A-Za-z0-9_.@]/g;

  const maxLength = (!rest?.maxLength || rest?.maxLength === 0 || (idCardKey === rest?.name && currentLang.value === 'en')) ? 255 : rest?.maxLength;

  const numberStyle = { textAlign: 'end' };
  const normalStyle = { textAlign: 'left' };

  const onPaste = (e: any) => {
    const str = e.clipboardData.getData('Text');
    if (isNumber) {
      if (!onlyCurrencyRegex.test(str)) {
        e.preventDefault();
      }
    }
  }

  const formatCurrency = (amount: any) => {
    // eslint-disable-next-line
    /** ลบอักขระที่ไม่ใช่ตัวเลขออกจากอินพุต */
    const userInput: string = amount.replace(/[^0-9]/g, '');

    if (userInput === '') {
      // eslint-disable-next-line
      /** หากอินพุตว่างเปล่า ให้ตั้งค่าที่จัดรูปแบบเป็น "0.00" */
      return '0.00';
    }
    // eslint-disable-next-line
    /**แปลงอินพุตเป็นตัวเลขแล้วหารด้วย 100 เพื่อให้ได้ค่าเป็น BRL */
    const userInputAsNumber: number = parseInt(userInput, 10) / 100;
    // eslint-disable-next-line
    return `${userInputAsNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}`;
  };

  const handleChangeText = (value: string) => {
    // console.log("🚀 ~ file: rhf-text-field.tsx:64 ~ handleChangeText ~ value:", value)
    let cleanText: string = value;

    // if (rest?.inputType === 'CURRENCY') {
    //   cleanText = cleanText.replace(onlyTextWithOutSpecialRegex, '');
    // }

    if (inputTypeConfig === 'TH') {
      cleanText = cleanText.replace(constantsThaiCharacterRegex, '');
    }
    if (inputTypeConfig === 'EN') {
      cleanText = cleanText.replace(engOnlyRegex, '');
    }
    if (inputTypeConfig === 'THANDEN') {
      cleanText = cleanText.replace(engOrThRegex, '');
    }

    // if (nonUseSpacebar) {
    //   cleanText = cleanText.replace(/\s/g, '');
    // }

    field.onChange(cleanText);
  };


  useEffect(() => {
    // console.log("🚀 ~ useEffect ~ rest?.defaultValue:", rest?.defaultValue)
    // console.log("🚀 ~ useEffect ~ field:", field.value)
    if (rest?.defaultValue && field?.name && field.value === '') {
      // console.log("🚀 ~ useEffect ~ rest?.defaultValue2:", rest?.defaultValue)
      // console.log("🚀 ~ useEffect ~ field2:", field.value)
      field.onChange(rest.defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest?.defaultValue])


  return (
    <Block label={currentLang.value === 'th' ? label : labelEn} required={requiredFiled}>
      <TextField
        {...field}
        // label={label}
        hiddenLabel
        variant='filled'
        placeholder={currentLang.value === 'th' ? label : labelEn}
        fullWidth
        size={size}
        type={type}
        maxLength={maxLength}
        disabled={rest.disabled}
        value={type === 'number' && field.value === 0 ? '' : field.value}
        onChange={(event) => {
          if (type === 'number') {
            field.onChange(Number(event.target.value));
          } else if (inputTypeConfig === "CURRENCY") {
            if (onlyCurrencyRegex.test(event.target.value[event.target.value.length - 1])) {
              const numbersOnly = event.target.value.replace(/\s+/g, '').trim();
              field.onChange(formatCurrency(numbersOnly));
            } else {
              field.onChange(event.target.value.replace(event.target.value[event.target.value.length - 1], ''));
            }
          } else if (inputTypeConfig === 'numberChar' || inputTypeConfig === "NUMBER" || inputTypeConfig === "TEL") {
            if (onlyNumbersRegex.test(event.target.value[event.target.value.length - 1])) {
              const numbersOnly = event.target.value.replace(/\s+/g, '').trim();
              field.onChange(numbersOnly);
            } else {
              field.onChange(event.target.value.replace(event.target.value[event.target.value.length - 1], ''));
            }
          } else {
            let textReplace = event.target.value;
            if (rest?.inputType === 'EMAIL') {
              textReplace = event.target.value.replace(/\s+/g, '').trim();
            }
            handleChangeText(textReplace);
            // field.onChange(event.target.value);
          }
        }}
        error={!!error}
        helperText={error ? errorMessage : ''}
        inputProps={{ ...inputProps, maxLength, style: inputTypeConfig === "CURRENCY" ? numberStyle : normalStyle }}
        required={requiredFiled}
        onPaste={e => onPaste(e)}
        {...other}
      />
    </Block>
  )
}

