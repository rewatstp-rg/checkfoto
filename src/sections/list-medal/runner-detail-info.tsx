import { useState, useEffect } from 'react';

import { Box, Grid, Card, Stack, Avatar, Divider, Typography, LinearProgress } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { getStorage } from 'src/hooks/use-local-storage';

import { fNumber } from 'src/utils/format-number';
import { STORAGE_KEYS } from 'src/utils/constants';

import { _mock } from 'src/_mock';
import { useLocales } from 'src/locales';
import { useAppSelector } from 'src/store/hooks';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { selectAuthenSlice } from 'src/slices/authen.slices';

interface MedalModel {
    medalAmount: number;
    completedMedalAmount: number;
    listMedal: {
        imageActive: string;
        imageInActive: string;
        eventNameTh: string;
        eventNameEn: string;
    }[]
}

type Props = {
    medalModel?: MedalModel;
}

export function RunnerDetailInfo({
    medalModel
}: Props) {

    const { currentLang } = useLocales();
    const lgUp = useResponsive('up', 'lg');

    const renderDistance = (
        <Stack
            direction="row"
            sx={{ py: 3, typography: 'h2', textAlign: 'center', color: 'primary.main' }}
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
        >
            <Stack width={1}>
                {fNumber(medalModel?.completedMedalAmount || 0) || '-'}
                <Box component="span" sx={{ color: 'text.secondary', typography: 'body2', fontWeight: 'bold' }}>
                    {currentLang?.value === 'th' ? 'บรรลุเป้าหมาย' : 'Completed'}
                </Box>
            </Stack>

            <Stack width={1}>
                {fNumber(medalModel?.medalAmount || 0) || '-'}
                <Box component="span" sx={{ color: 'text.secondary', typography: 'body2', fontWeight: 'bold' }}>
                    {currentLang?.value === 'th' ? 'รายการทั้งหมด' : 'All'}
                </Box>
            </Stack>
        </Stack>
    );

    const content = (
        <Card sx={{ p: 2, pt: 0, ...(!lgUp && { pt: '30px !important' }) }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} alignItems='center' sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <RenderAvatarRunner />
                </Grid>
                <Grid item xs={12} md={9} >
                    {/* 
                <Typography variant="h3" sx={{ mt: 2, textTransform: 'uppercase', textAlign: 'center' }}>
                    {ranking?.firstName} {ranking?.lastName}
                </Typography> */}

                    {renderDistance}
                    <RenderRunnerProscess item={medalModel} />
                </Grid>
            </Grid>
        </Card>
    )

    return (
        <Stack spacing={3} sx={{ width: '100%' }}>
            {content}
        </Stack>
    );
}


const RenderAvatarRunner = () => {

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);
    const userImage = localStorage.getItem('userImage');
    const { userImageUrl } = useAppSelector(selectAuthenSlice);

    const [userProfileState, setUserProfileState] = useState<any>();
    const [userImageProfile, setUserImageProfile] = useState('');

    useEffect(() => {
        const token = userProfile;
        if (token) {
            setUserProfileState(jwtDecode(token));
        }
        if (!token) {
            setUserProfileState(null);
        }
    }, [userProfile]);

    useEffect(() => {
        if (userImageUrl) {
            setUserImageProfile(userImageUrl);
        }

        if (userImage) {
            setUserImageProfile(userImage);
        }
    }, [userImageUrl, userImage])

    return (
        <Box sx={{ position: 'relative', marginTop: '40px' }}>
            <input
                type="image"
                src='/assets/icon-ranking/First-icon.png'
                width={50}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: '40px',
                    top: '-40px',
                    cursor: 'unset',
                }}
                className="bounce2"
                alt="rank1" />
            <Avatar
                src={userImageProfile || userImage || _mock.image.avatar(24)}
                alt={userProfileState?.userDetail?.fullName}
                sx={{
                    width: 130,
                    height: 130,
                    border: (theme) => `solid 2px ${theme.palette.background.default}`,
                }}
            >
                {userProfileState?.userDetail?.fullName?.charAt(0).toUpperCase()}
            </Avatar>
        </Box>
    )
}

const RenderRunnerProscess = ({ item }: any) => {

    const lgUp = useResponsive('up', 'lg');

    const cal = Math.round(((item?.completedMedalAmount || 0) / (item?.medalAmount || 0)) * 100) || 0;
    const percent = cal > 100 ? 100 : cal;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative'
        }}>
            <Box sx={{
                display: 'flex', gap: 1
            }}>
                <LinearProgress
                    key="2"
                    color={percent === 100 ? 'primary' : 'warning'}
                    value={percent}
                    variant="determinate"
                    sx={{ mb: 2, width: 1, height: 20 }}
                />
            </Box>
            <Typography
                variant="h5"
                color={percent === 100 ? '#FF3030' : '#ffab00'}
                sx={(lgUp ? {
                    position: 'absolute',
                    right: 0,
                    top: 20
                } :
                    {
                        position: 'relative',
                        right: 0,
                        top: 0
                    })} >
                ({percent}) %
            </Typography>
        </Box>
    )
}
