// import { useState, useEffect } from "react";

// import { Container } from "@mui/material";

// import { paths } from "src/routes/paths";

// import { checkImageOrientationFromUrl } from "src/utils/getPathImageByfile64";

// import { useTranslate } from "src/locales";
// import { seleceFileModel } from "src/slices/file.slices";
// import { useAppDispatch, useAppSelector } from "src/store/hooks";
// import { useDownloadFileMutation } from "src/api/upload-file.api";
// import { setLoadingState } from "src/slices/error-message.slices";
// import { useListEventPhotoFrameByEventCodeMutation } from "src/api/event-photo-frame";

// import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

// import CanvasOverlay from "../canvas-overlay";

// export function CustomPhotoView() {

//     const { t } = useTranslate();

//     const dispatch = useAppDispatch();
//     const [listEventPhotoFrameByEventCodeApi] = useListEventPhotoFrameByEventCodeMutation();

//     const { selectImagePhoto } = useAppSelector(seleceFileModel);
//     console.log("🚀 ~ CustomPhotoView ~ selectImagePhoto:", selectImagePhoto);

//     const [downloadFile] = useDownloadFileMutation();


//     const [imageOrientation, setImageOrientation] = useState<string>('');
//     const [imageUrlSelected, setImageUrlSelected] = useState<string>('');
//     const [imageUrlFrame, setImageUrlFrame] = useState<string>('');
//     console.log("🚀 ~ CustomPhotoView ~ imageUrlSelected:", imageUrlSelected)

//     const genImageUrl = async () => {
//         await downloadFile({
//             key: selectImagePhoto?.imageS3Key || '',
//             bucket: selectImagePhoto?.imageS3Bucket || '',
//         }).unwrap().then(res => {
//             const { data } = res;
//             const fileType = 'image/png';
//             const base64Data = `data:${fileType};base64,${data.file}`;
//             checkImageOrientationFromUrl(base64Data)
//                 .then(orientation => {
//                     setTimeout(() => {
//                         setImageOrientation(orientation);
//                         setImageUrlSelected(base64Data);
//                         dispatch(setLoadingState(false));
//                     }, 300);

//                 }).catch(err => {
//                     console.error('โหลดรูปไม่ได้:', err);
//                     dispatch(setLoadingState(false));
//                 })
//         }).catch(err => {
//             console.error('โหลดรูปไม่ได้:', err);
//             dispatch(setLoadingState(false));
//         });
//     }

//     const loadFrame = async (eventCode: string) => {
//         dispatch(setLoadingState(true));
//         await listEventPhotoFrameByEventCodeApi({ eventCode }).unwrap().then((res) => {
//             const { data } = res;

//         }).catch(err => {
//             console.error('โหลดรูปไม่ได้:', err);
//             dispatch(setLoadingState(false));
//         });
//     }

//     useEffect(() => {
//         if (selectImagePhoto) {
//             console.log("🚀 ~ useEffect ~ selectImagePhoto:", selectImagePhoto)
//             genImageUrl();
//         }
//     }, [selectImagePhoto]);


//     return (
//         <Container
//             maxWidth='lg'
//             sx={{
//                 mt: 2,
//                 mb: 2,
//             }}
//         >
//             <CustomBreadcrumbs
//                 links={[
//                     { name: t('common.home'), href: '/' },
//                     { name: t('orders.title'), href: paths.order.root },
//                     { name: 'Custom Photo' },
//                 ]}
//                 sx={{ mb: 3 }}
//             />

//             <CanvasOverlay userImageUrl={imageUrlSelected} />

//         </Container>
//     );
// }

export function CustomPhotoView() {
    return <div>CustomPhotoView</div>;
}   