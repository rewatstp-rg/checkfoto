import { Typography } from "@mui/material";

import { useTranslate } from "src/locales"
import { useAppDispatch } from "src/store/hooks";
import { setOpenDialogSelectImage } from "src/slices/file.slices";

import VirtualMasonryGallery from "src/components/photo/virtual-masonry-gallery";

import { PhotoType } from "src/types/photo.type";

import ImageDialog from "./image-dialog";

type Props = {
    arrayList: PhotoType[],
    openDialogSelectImage: boolean
}
export default function ResultlistHighlights({
    arrayList,
    openDialogSelectImage,
}: Props) {

    const dispatch = useAppDispatch();
    const { t } = useTranslate();

    return (
        <>
            <Typography variant="h4" mb={2}>{t('photo.listHighlightsTitle')}</Typography>
            <VirtualMasonryGallery images={arrayList} pageType="HIGHLIGHT"/>
            {openDialogSelectImage && <ImageDialog
                pageType="HIGHLIGHT"
                open={openDialogSelectImage || false}
                onClose={() => dispatch(setOpenDialogSelectImage(false))}
            />}
        </>
    )
}