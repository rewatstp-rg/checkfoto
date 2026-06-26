import { useEffect } from "react";

import { printImage } from "src/utils/print-image-util";
import { urlToBase64, removeDataPrefix, downloadImageFromBase64New } from "src/utils/getPathImageByfile64";

import { useSearchImageFrameByTypeMutation } from "src/api/event-photo-booth.api";

import Image from "src/components/image";
import { DynamicTable, DynamicTableRow, ActionButtonSearch } from "src/components/table";

import { FileResponse } from "src/types/file";
import { ColumnDynamic } from "src/types/table.type";

export default function SearchImageFile({
    isUploadSuccess,
    eventUrl
}: { isUploadSuccess: boolean, eventUrl: string }) {

    const [searchImageFrameByType, { isLoading, data }] = useSearchImageFrameByTypeMutation();

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

    const columns: ColumnDynamic<any>[] = [
        {
            id: 'action',
            label: 'ดำเนินการ',
            align: 'center',
            width: 150,
            render: (row) => (
                <ActionButtonSearch
                    onDownload={() => onDownload(row)}
                    onSendPrint={() => handlePrint(row)}
                />
            ),
        },
        {
            id: 'imageThumbnailUrl',
            label: 'รูปภาพ',
            align: 'left',
            flex: 1,
            render: (row) => (
                <Image
                    src={row.imageThumbnailUrl}
                    alt={row.imageThumbnailUrl}
                    width={50}
                />
            ),
        },
        {
            id: 'fileName',
            label: 'ชื่อรูปภาพ',
            align: 'left',
            flex: 1,
        },
    ];

    const loadContent = () => {
        searchImageFrameByType({ uploadType: eventUrl, pageNo: 0, pageSize: 15,eventUrl });
    }

    useEffect(() => {
        loadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUploadSuccess]);

    return (
        <DynamicTable
            overflow="auto"
            maxHeight="calc(100vh - 300px)"
            minHeight="calc(100vh - 300px)"
            columns={columns}
            rows={data?.data.content ?? []}
            isLoading={isLoading}
            // notFound={notFound}
            rowId="uid"
            renderRow={(row, index) => (
                <DynamicTableRow
                    key={`row-${index}`}
                    row={row}
                    columns={columns}
                />
            )}
        />
    );
}