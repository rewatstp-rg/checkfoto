// import { Masonry } from "masonic";
import React, { memo, useEffect } from "react";

import { Box, Skeleton } from "@mui/material";

// import { useResponsive } from "src/hooks/use-responsive";

import { PhotoType } from "src/types/photo.type";

import PhotoItem from "./photo-item";

type VirtualMasonryGalleryProps = {
    images: PhotoType[];
    pageType?: string;
    eventFreeStatus?: string;
}

const VirtualMasonryGallery: React.FC<VirtualMasonryGalleryProps> = ({ images, pageType, eventFreeStatus }) => {

    const [arrayList, setArrayList] = React.useState<PhotoType[]>([]);

    useEffect(() => {
        setArrayList([]);
        if (images && images?.length > 0) {
            setArrayList(images);
        }
    }, [images]);

    return (
        <>
            {
                arrayList?.length > 0 ? (
                    <Box sx={{ columnGap: "16px", rowGap: "16px", columnCount: { xs: 2, sm: 3, lg: 6 } }}>
                        {arrayList.map((data, i) => (
                            <ImageCard key={i} data={data} pageType={pageType} eventFreeStatus={eventFreeStatus} />
                        ))}
                    </Box>

                ) : (
                    <Box
                        display="grid"
                        rowGap={1}
                        columnGap={6}
                        gridTemplateColumns={{
                            xs: 'repeat(3, 1fr)',
                            sm: 'repeat(4, 1fr)',
                            lg: 'repeat(6, 1fr)',
                        }}
                        gap={1}
                    >
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                        <Skeleton variant="rectangular" sx={{ height: { xs: 153, sm: 161, lg: 171 }, borderRadius: 2 }} />
                    </Box>
                )
            }
        </>

    )
}

const ImageCard = memo(({ data, pageType, eventFreeStatus }: { data: PhotoType, pageType?: string, eventFreeStatus?: string }) => (
    <PhotoItem post={data} pageType={pageType} eventFreeStatus={eventFreeStatus} />
));

export default VirtualMasonryGallery;