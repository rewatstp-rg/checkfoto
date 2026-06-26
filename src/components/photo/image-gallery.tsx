import React, { useRef, useState, useEffect } from 'react';

import Masonry from '@mui/lab/Masonry';
import { Box, Skeleton, CircularProgress } from '@mui/material';

import { PhotoType } from 'src/types/photo.type';

import PhotoItem from './photo-item';

type ImageGalleryProps = {
    images: PhotoType[];
    batchSize?: number
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, batchSize = 10 }) => {

    const [visibleImages, setVisibleImages] = useState<PhotoType[]>([]);
    const [batch, setBatch] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // โหลดรูปตาม batch
    useEffect(() => {
        const start = 0;
        const end = batch * batchSize;
        setIsLoading(true);

        const timeout = setTimeout(() => {
            setVisibleImages(images.slice(start, end));
            setIsLoading(false);
        }, 500)

        return () => clearTimeout(timeout);
    }, [batch, images, batchSize]);

    // ใช้ IntersectionObserver เพื่อดูว่า scroll ถึง loader หรือยัง
    useEffect(() => {
        const currentLoader = loaderRef?.current;

        const observer = new IntersectionObserver(entries => {
            const target = entries[0];
            if (target.isIntersecting && visibleImages.length < images.length) {
                setBatch((prevBatch) => prevBatch + 1);
            }
        }, { rootMargin: '100px' });

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [visibleImages, images]);

    return (
        <Box sx={{ p: 2 }}>
            <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
                {visibleImages.map((img, idx) => (
                    <Box key={idx}>
                        <PhotoItem post={img} />
                    </Box>
                ))}
                {
                    isLoading && [...Array(batchSize)].map((_, idx) => (
                        <Box key={idx}>
                            <Skeleton variant="rectangular" width={256} height={171} sx={{ borderRadius: '8px' }} />
                        </Box>
                    ))
                }
            </Masonry>
            {/* จุดสังเกตสำหรับโหลดเพิ่ม */}
            <Box ref={loaderRef} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                {visibleImages.length < images.length && <CircularProgress />}
            </Box>
        </Box>
    )
}

export default ImageGallery;
