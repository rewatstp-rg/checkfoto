import * as Yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid, Button, Divider, Container, Typography } from "@mui/material";

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslate } from "src/locales";
import { useAppDispatch } from 'src/store/hooks';
import { setLoadingState } from 'src/slices/error-message.slices';

import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

type QueryParams = {
    id?: number;
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    name?: string;
    nameEn?: string;
};

export default function SearchEvent() {

    const rounter = useRouter();
    const { t } = useTranslate();
    const dispatch = useAppDispatch();
    const lgUp = useResponsive('up', 'lg');

    const searchParams = useSearchParams();
    const eventName = searchParams?.get('name');
    const provinces = searchParams?.get('provinces');
    const eventMonth = searchParams?.get('eventMonth');
    const eventDistance = searchParams?.get('eventDistance');

    const searchCriteriaSchema = Yup.object().shape({
        name: Yup.string(),
        provinces: Yup.string(),
        distance: Yup.string(),
        eventMonth: Yup.string(),
        eventDistance: Yup.string(),
    });

    const defaultValues = {
        name: '',
        provinces: '',
        distance: '',
        eventMonth: '',
        eventDistance: ''
    };

    const methods = useForm({
        resolver: yupResolver(searchCriteriaSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit
    } = methods;

    const createQueryString = (params: QueryParams): string => {
        const queryString = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== "") // กรองค่าที่ว่างออก
            .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`) // เข้ารหัสค่า
            .join("&"); // รวมเป็น string
        return queryString ? `?${queryString}` : "";
    };

    const onSubmitForm = handleSubmit(async (dataValue: any) => {
        try {
            dispatch(setLoadingState(true));
            setTimeout(() => {
                dispatch(setLoadingState(false));
                rounter.push(createQueryString(dataValue));
            }, 1000);
        } catch (err) {
            console.log("🚀 ~ onSubmitForm ~ err:", err)
        }
    })

    useEffect(() => {
        setValue('name', eventName || '');
        setValue('provinces', provinces || '');
        setValue('eventMonth', eventMonth || '');
        setValue('eventDistance', eventDistance || '');
    }, [setValue, eventName, provinces, eventMonth, eventDistance]);

    return (
        <Container
            sx={{
                textAlign: { xs: 'center' },
                mb: { xs: 0, md: 2 },
                p: lgUp ? '0 !important' : 2,
            }}
        >
            {/* <Card sx={{ p: 2 }}> */}
            <FormProvider methods={methods} onSubmit={onSubmitForm}>
                <Divider sx={{ borderStyle: 'dashed', mt: { xs: 0, md: 2 } }} />
                <Typography variant="h3" sx={{ mb: 0.5, mt: 2 }}>
                    Find the running event photos you want.
                </Typography>
                <Grid container spacing={2} justifyContent='center'>
                    {/* {
                            lgUp && (
                                <Grid item xs={12} md={9} display='flex' justifyContent='space-between'>
                                    {
                                        listPhotoType?.length > 0 && listPhotoType?.map((item: any, index: number) => (
                                            <ItemType item={item} selected={selected} onChange={onChange} key={index} />
                                        ))
                                    }
                                </Grid>
                            )
                        } */}
                    <Grid item xs={12} md={11}>
                        <RHFTextField
                            name="name"
                            placeholder={t('orders.eventName')}
                            size="medium"
                        />
                    </Grid>
                    <Grid item xs={12} md={1} display='flex' justifyContent='center'>
                        <Button
                            fullWidth={!lgUp}
                            sx={{
                                ...(lgUp && { width: 'auto', height: 54 })
                            }}
                            color="primary"
                            size='large'
                            variant="contained"
                            type="submit"
                            aria-label="ค้นหา"
                        >
                            {
                                lgUp ? (
                                    <Iconify icon="ic:round-search" width={24} />
                                ) :
                                    (
                                        t('searchBtn')
                                    )
                            }

                        </Button>
                    </Grid>
                </Grid>
                <Divider sx={{ borderStyle: 'dashed', mt: { xs: 0, md: 2 } }} />
            </FormProvider>
            {/* </Card> */}
        </Container>
    )
}

// const ItemType = ({ item, selected, onChange }: { item: any, selected: any, onChange: any }) => (
//     <Box
//         sx={{
//             display: 'flex',
//             height: '110px',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: '0 10px',
//             scrollBehavior: 'smooth',
//             msOverflowStyle: 'none', // for IE and Edge
//             scrollbarWidth: 'none',  // for Firefox
//             '&::-webkit-scrollbar': {
//                 display: 'none',
//             }
//         }}
//     >
//         <ButtonBase
//             onClick={() => onChange(item.key)}
//             sx={{
//                 position: 'relative',
//                 display: 'flex',
//                 minWidth: '80px',
//                 height: '80px',
//                 padding: '8px',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 gap: '8px',
//                 background: 'none',
//                 border: 0,
//                 borderRadius: '4px',
//                 ...(Boolean(selected === item.key) && {
//                     bgcolor: 'background.paper',
//                     boxShadow: (theme) =>
//                         `-24px 8px 24px -4px ${alpha(
//                             theme.palette.mode === 'light'
//                                 ? theme.palette.grey[500]
//                                 : theme.palette.common.black,
//                             0.08
//                         )}`,
//                 }),
//                 '& .svg-color': {
//                     background: (theme) => theme.palette.text.disabled,
//                 },
//                 ...(Boolean(selected === item.key) && {
//                     '& .svg-color': {
//                         background: (theme) =>
//                             `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
//                     },
//                 }),
//                 '&:hover': {
//                     boxShadow: '0 8px 16px 0 rgba(145, 158, 171, 0.24)',
//                     background: 'linear-gradient(96deg, rgb(255 225 223), rgba(238, 121, 131, 0.3))',
//                 }
//             }}
//         >

//             {item.icon}

//             <Typography
//                 sx={{
//                     fontSize: '16px',
//                     fontStyle: 'normal',
//                     fontWeight: 600,
//                     lineHeight: '24px',
//                     color: '#919eab',
//                     ...(Boolean(selected === item.key) && {
//                         background: 'linear-gradient(135deg, #ff7e8a 0%, #FF0000 100%)',
//                         backgroundClip: 'text',
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent',
//                         whiteSpace: 'nowrap',
//                     })
//                 }}
//             >
//                 {
//                     item.name
//                 }
//             </Typography>
//         </ButtonBase>
//     </Box>
// )
