export type FileModel = {
    fileId: number;
    fileName?: string;
    fileUrl?: string;
    fileSize?: string;
    type?: string;
    fileType?: string;
    status?: string;
    filePath?: string;
};

export type ExportData = {
    fileName: string
    contentType: string
    fileData: string
};