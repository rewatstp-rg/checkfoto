import { useState, useEffect } from "react";

import {
    Box,
    Grid,
    Card,
    Select,
    Button,
    MenuItem,
    CardMedia,
    Pagination,
    Typography,
    CardActions
} from "@mui/material";

import { printImage } from "src/utils/print-image-util";
import { urlToBase64, removeDataPrefix, downloadImageFromBase64New } from "src/utils/getPathImageByfile64";

import { useSearchImageFrameByTypeMutation } from "src/api/event-photo-booth.api";

import Iconify from "src/components/iconify";

import { FileResponse } from "src/types/file";

export default function ViewCommonImageFrameView({ eventUrl }: { eventUrl: string }) {

    const [searchImageFrameByType] = useSearchImageFrameByTypeMutation();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [listImage, setListImage] = useState<FileResponse[]>([]);

    const onDownload = async (row: FileResponse) => {
        if (row?.imageUrl) {
            const fileName = row.imageS3Key?.split("/").pop() || "";
            await urlToBase64(row.imageUrl).then((base64) => downloadImageFromBase64New({ name: fileName, file: removeDataPrefix(base64) }));
        }
    }

    const handlePrint = async (row: FileResponse) => {
        if (row?.imageUrl) {
            const fileName = row.imageS3Key?.split("/").pop() || "";
            await printImage(row.imageUrl, {
                fileName,
                showPreview: true, // เปิด confirm dialog ก่อนพิมพ์
            });
        }
    };

    const loadContent = () => {
        searchImageFrameByType({ uploadType: eventUrl, pageNo: page, pageSize: perPage, eventUrl }).unwrap().then((response) => {
            const { data } = response;
            if (data) {
                setListImage(data?.content || []);
                setTotalPages(data?.totalPages || 1);
            }
        });
    }

    useEffect(() => {
        loadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage]);

    return (
        <Box p={4} marginTop={4} sx={{ maxWidth: "1600px", margin: "0 auto" }}>
            {/* ตัวเลือกจำนวนภาพต่อหน้า */}
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                    แสดงต่อหน้า:
                </Typography>
                <Select
                    size="small"
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setPage(1);
                    }}
                >
                    {[8, 16, 20].map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* แสดงรูปภาพ */}
            <Grid container spacing={2}>
                {listImage.map((img, index) => (
                    <Grid item xs={12} sm={6} md={3} key={img?.uid}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardMedia
                                component="img"
                                image={img.imageThumbnailUrl}
                                alt={`Image ${index}`}
                            />
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Iconify icon="solar:download-bold" />}
                                    onClick={() => onDownload(img)}
                                >
                                    ดาวน์โหลด
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<Iconify icon="solar:printer-bold" />}
                                    onClick={() => handlePrint(img)}
                                >
                                    พิมพ์
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
};