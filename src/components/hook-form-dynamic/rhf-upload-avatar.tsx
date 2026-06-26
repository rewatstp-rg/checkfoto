import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { Typography, FormHelperText } from "@mui/material";

import uuidChar from "src/utils/uuidv-char";
import { fData } from "src/utils/format-number";

import { useLocales } from "src/locales";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectRegister, addListFileFormRegister, editListFileFormRegister } from "src/slices/register.slices";

import { UploadAvatar } from "../upload";

type Props = {
    type?: string;
    label: string;
    labelEn: string;
    rest?: any;
    field?: any;
    error?: any;
};

type FileUpload = File & { key?: string };
export default function RHFUploadAvatarDynamic({ field, label, labelEn, error, rest, ...other }: Props) {

    const dispatch = useAppDispatch();
    const { currentLang } = useLocales();
    const { listFileFormRegister } = useAppSelector(selectRegister);

    const { setValue } = useFormContext();

    const [file, setFile] = useState<File | null>(listFileFormRegister?.find((item: FileUpload) => item?.key === field?.value) || null);

    const requiredFiled: boolean = !!rest?.rules?.required;

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles?.length > 0) {
            const fileOnChange = acceptedFiles[0];

            if (listFileFormRegister && listFileFormRegister?.length > 0 && field.value) {
                const fileIndex = listFileFormRegister.findIndex((item: FileUpload) => item.key === field.value); // check file
                if (fileIndex >= 0) {
                    // remove file
                    generateEditFile(fileOnChange, fileIndex);
                } else {
                    generateFile(fileOnChange);
                }
            } else {
                generateFile(fileOnChange);
            }
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [field]
    );

    const generateFile = (fileOnChange: File) => {
        // generate file name
        const fileName = uuidChar(10);
        const fileToUpload = new File([fileOnChange], `${fileName}.png`, { type: "image/png", });
        // generate file preview url
        const newFile = Object.assign(fileToUpload, {
            preview: URL.createObjectURL(fileToUpload),
            key: `${fileName}.png`
        });

        // set value
        field.onChange(`${fileName}.png`);
        setValue('FILE_NAME', `${fileName}.png`);

        setFile(newFile);
        dispatch(addListFileFormRegister(newFile));
    }

    const generateEditFile = (fileOnChange: File, fileIndex: number) => {
        // generate file name
        const fileName = uuidChar(10);
        const fileToUpload = new File([fileOnChange], `${fileName}.png`, { type: "image/png", });
        // generate file preview url
        const newFile = Object.assign(fileToUpload, {
            preview: URL.createObjectURL(fileToUpload),
            key: `${fileName}.png`
        });

        // set value
        field.onChange(`${fileName}.png`);
        setValue('FILE_NAME', `${fileName}.png`);

        setFile(newFile);
        const fileToEdit = {
            fileIndex,
            file: newFile
        };

        dispatch(editListFileFormRegister(fileToEdit));
    }

    return (
        <div>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {currentLang.value === 'th' ? label : labelEn} {requiredFiled && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <UploadAvatar
                maxSize={1000000}
                file={file}
                onDrop={handleDrop}
                error={!!error}
                {...other}
                helperText={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 3,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.disabled',
                        }}
                    >
                        รองรับ *.jpeg, *.jpg, *.png
                        <br /> ขนาดไฟล์สูง {fData(1000000)}
                    </Typography>
                }
            />

            {!!error && (
                <FormHelperText error sx={{ px: 2, textAlign: 'left' }}>
                    {error.message}
                </FormHelperText>
            )}
        </div>
    );
}