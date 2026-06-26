

export type PhotographerModel = {
    fullName: string;
    addonLogoUrl: string;
};

export type PhotoPriceModel = {
    photoPrice: number;
    price: number;
    photoPriceCode: string;
    id: number;
    priceType: string;
    photoPriceTypeDescTh: string;
    photoPriceTypeDescEn: string;
    photoPriceDescTh: string;
    photoPriceDescEn: string;
    status: string;
    photoTypeDesc: string;
    photoTypeDescEn: string;
    limitPack: number;
    eventCode: string;
};

export type PhotoType = {
    uid: string;
    eventCode: string;
    eventUrl: string;
    imageName: string;
    imageThumbnailUrl: string;
    status: string;
    photographerModel: PhotographerModel;
    listPhotoPrice: PhotoPriceModel[];
    publishedStatus: boolean;
    imageS3Key?: string;
    imageS3Bucket?: string;
    imageS3ThumbnailBucket: string;
    imageS3ThumbnailKey: string;
    imageId: number;
    orderPhotoNumber: string;
    orientation?: string;
    imageType?: string;
    videoThumbnailUrl?: string;
    videoS3ThumbnailBucket?: string;
    videoS3ThumbnailKey?: string;
    videoUrl?: string;
    downloadImageUrl?: string;
    downloadVideoUrl?: string;
}

export type PhotoPrice = {
    id: number;
    photoPriceCode: string;
    eventCode: string;
    priceType: string;
    sequence: number;
    price: number;
    status: string;
    createDtm: string; // ISO date string
    createBy: string;
    lastUpdateDtm: string;
    lastUpdateBy: string;
};

export type EventPhoto = {
    id: number;
    eventCode: string;
    photographerRegisterStartDate: string;
    photographerRegisterEndDate: string;
    photoSaleDate: any;
    photoSaleEndDate: any;
    photographerPolicy: string;
    discountStauts: string;
    discountStatusDesc: string;
    status: string;
    statusDesc: string;
    lastUpdateDtm: string;
    lastUpdateBy: string;
    photoSalePolicy: string;
    publishedStatus: boolean;
    listPhotoPrice: PhotoPriceModel[];
    eventType: string;
    bannerFileUrl: string;
    bannerFileId?: number;
    eventUrl: string;

    eventNameTh: string;
    eventNameEn: string;
    sequence: number;
    eventDate: any;
    eventEndDate: any;

    listHighlights: any[];
    bannerFileName: string;
    discountStatus?: string;
    videoStatus?: string;
    eventFree?: string;

    autoFrame?: string;
};
