import { useState } from "react";

import { Box } from "@mui/material";

import { useLocales } from "src/locales";

import Iconify from "src/components/iconify";

import { EventPhotoFrameModel } from "src/types/event-photo-frame.type";

type Props = {
    frames: EventPhotoFrameModel[];
    onSelectedFrameUrl: (frameImage?: EventPhotoFrameModel | null) => void;
    imageOrientation?: string;
    isDisplayName?: boolean;
    eventCode?: string;
}
export default function ListFrameImage({ frames, onSelectedFrameUrl, imageOrientation, isDisplayName = true, eventCode }: Props) {

    const { currentLang } = useLocales();

    const [imageItem, setImageItem] = useState<EventPhotoFrameModel | null>(null);

    const handelSelectedFrame = (frameUrl?: EventPhotoFrameModel | null) => {
        if (frameUrl) {
            if (imageItem?.eventPhotoFrameCode !== frameUrl?.eventPhotoFrameCode) {
                setImageItem(frameUrl);
                onSelectedFrameUrl(frameUrl);
            }
        } else {
            setImageItem(null);
            onSelectedFrameUrl(null);
        }
    }

    return (
        <div
            style={{
                overflowX: 'auto',
                maxWidth: '700px', // หรือระบุ px เช่น '700px'
                padding: '10px 0',
                whiteSpace: 'nowrap', // ให้ child ไม่ตัดบรรทัด
            }}
        >

            <Box style={{ display: 'inline-block', textAlign: 'center', margin: '0 8px', justifyItems: 'center' }}>
                <NoFrameOption imageItem={imageItem} handelSelectedFrame={handelSelectedFrame} imageOrientation={imageOrientation} />
                <div style={{
                    marginTop: 4, fontSize: 12,
                    maxWidth: imageOrientation === 'landscape' ? 150 : 100,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    color: 'white'
                }}>{currentLang.value === 'en' ? 'No Frame' : 'ไม่มีกรอบ'}</div>
            </Box>

            {frames.map((frame) => (
                <Box
                    key={frame?.id}
                    style={{
                        display: 'inline-block',
                        textAlign: 'center',
                        margin: '0 8px',
                        cursor: 'pointer',
                    }}
                    onClick={() => handelSelectedFrame(frame)}
                >
                    <img
                        src={frame?.fileUrl}
                        alt={frame?.fileName}
                        style={{
                            width: imageOrientation === 'landscape' ? 150 : 100,
                            height: imageOrientation === 'landscape' ? 100 : 150,
                            border:
                                imageItem?.eventPhotoFrameCode === frame?.eventPhotoFrameCode
                                    ? '2px solid red'
                                    : '1px solid #89898929',
                        }}
                    />
                    <div style={{
                        marginTop: 4, fontSize: 12,
                        maxWidth: imageOrientation === 'landscape' ? 150 : 100,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                        color: 'white'
                    }}>{currentLang.value === 'en' ? frame?.frameNameEn || 'Frame' : frame?.frameNameTh || 'Frame'}</div>
                </Box>
            ))}
        </div>
    );
}

export const NoFrameOption = ({ imageItem, handelSelectedFrame, imageOrientation }: { imageItem?: EventPhotoFrameModel | null, handelSelectedFrame: (frame?: null) => void, imageOrientation?: string }) => (
    <Box
        onClick={() => handelSelectedFrame(null)}
        sx={{
            borderRadius: 2,
            p: 2,
            textAlign: 'center',
            cursor: 'pointer',
            width: imageOrientation === 'landscape' ? 150 : 100,
            height: imageOrientation === 'landscape' ? 100 : 150,
            margin: '8px',
            bgcolor: 'grey.100',
            border: imageItem === null ? '2px solid red' : '1px solid #89898929',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <Iconify icon="streamline-sharp:elipse-frame" width={48} height={48} color='grey.500' />
    </Box>
);