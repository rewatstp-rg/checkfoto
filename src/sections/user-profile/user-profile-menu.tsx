import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Box, alpha, Stack, Avatar, Button, Divider, IconButton, Typography } from "@mui/material";

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { getStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEYS } from 'src/utils/constants';

import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';
import { useAppSelector } from 'src/store/hooks';
import { jwtDecode } from 'src/auth/context/jwt/utils';
import { selectAuthMenu } from 'src/slices/menu.slices';
import { selectAuthenSlice } from 'src/slices/authen.slices';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import TitleLable from "src/components/title-lable";
import CardCustom from "src/components/card/card-custom";

// ----------------------------------------------------------------------

const RenderDistance = ({ gender }: { gender: string }) => (
    <Stack
        direction="row"
        sx={{ py: 1, typography: 'h3', textAlign: 'center', color: 'primary.main' }}
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
    >
        {/* <Stack width={1}>
            <Box>10</Box>
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2', fontWeight: 'bold' }}>
                Race
            </Box>
        </Stack> */}

        <Stack width={1}>
            <Box>{gender}</Box>
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2', fontWeight: 'bold' }}>
                Age Category
            </Box>
        </Stack>
    </Stack>
);

export function UserProfileMenu({
    page,
    openDialogEditImage
}: {
    page: string,
    openDialogEditImage: () => void
}) {

    const router = useRouter();
    const { t } = useTranslate();
    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);
    const lgUp = useResponsive('up', 'lg');

    const userImage = localStorage.getItem('userImage');
    const { menuType } = useAppSelector(selectAuthMenu);
    const { userImageUrl } = useAppSelector(selectAuthenSlice);

    const [imageUrl, setImageUrl] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [ageCategory, setAgeCategory] = useState('');
    const [gender, setGender] = useState('');
    const [providerName, setProviderName] = useState('');

    const handleEditProfile = () => {
        if (menuType === 'VR') {
            router.push('/profile-vr');
        } else {
            router.push('/profile');
        }
    };

    // const handleMember = () => {
    //     router.push('/profile-member');
    // };

    const handleChangePassword = () => {
        if (menuType === 'VR') {
            router.push('/change-password-vr');
        } else {
            router.push('/change-password');
        }
    }

    const handleChangeAddress = () => {
        if (menuType === 'VR') {
            router.push('/change-address-vr');
        } else {
            router.push('/change-address');
        }
    }

    function calculateAge(birthDate: string): number {
        const today = new Date();
        const birth = new Date(birthDate);

        let age = today.getFullYear() - birth.getFullYear();

        // เช็คว่าเลยวันเกิดปีนี้หรือยัง
        const hasHadBirthdayThisYear =
            today.getMonth() > birth.getMonth() ||
            (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

        if (!hasHadBirthdayThisYear) {
            age -= 1;
        }

        return age;
    }

    useEffect(() => {
        if (userImage) {
            setImageUrl(userImage);
        }

        if (userImageUrl) {
            setImageUrl(userImageUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userImage, userImageUrl]);

    useEffect(() => {
        if (userProfile) {
            const user = jwtDecode(userProfile)?.userDetail;
            if (user) {
                setProviderName(user?.providerName || '-');
                setFullName(user?.fullName || '-');
                setEmail(user?.email || '-');
                if (user?.birthDate) {
                    setAgeCategory(calculateAge(user.birthDate).toString());
                }

                if (user?.gender) {
                    if (user.gender === 'MALE') {
                        setGender("M");
                    } else {
                        setGender("F");
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile]);

    return (
        <CardCustom>
            <TitleLable title={t('profile.title')} />
            <Box sx={{ pb: 2, px: 1 }}>
                <Box sx={{ mb: 1, textAlign: 'center' }}>
                    <IconButton
                        component={m.button}
                        whileTap="tap"
                        whileHover="hover"
                        variants={varHover(1.05)}
                        onClick={openDialogEditImage}
                        sx={{
                            mb: 2,
                            position: 'relative',
                            background: (theme) => alpha(theme.palette.grey[500], 0.08),
                            border: '1px dashed rgba(145, 158, 171, 0.2)'
                        }}
                    >
                        {
                            providerName === 'SYSTEM' && <Box sx={{
                                position: 'absolute',
                                top: 5,
                                right: -10
                            }}>
                                <Iconify width={20} icon="solar:pen-2-outline" sx={{ color: () => 'primary.main' }} />
                            </Box>
                        }

                        <Avatar
                            src={imageUrl || _mock.image.avatar(24)}
                            alt="user-profile"
                            sx={{
                                width: 120,
                                height: 120,
                                border: (theme) => `solid 2px ${theme.palette.background.default}`,
                            }}
                        />
                    </IconButton>
                    <Box>
                        <Typography variant="h5">
                            {fullName}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#919EAB' }}>
                            {email}
                        </Typography>
                    </Box>
                </Box>
                <RenderDistance gender={`${gender} ${ageCategory}`} />
                {
                    lgUp && (
                        <>
                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                                <Button
                                    variant={page === 'profile' ? 'contained' : 'outlined'}
                                    color="primary"
                                    sx={{ width: '100%' }}
                                    startIcon={<Iconify width={20} icon="solar:pen-2-outline" />}
                                    onClick={() => handleEditProfile()}
                                >
                                    {t('profile.editProfile')}
                                </Button>
                            </Stack>

                            {

                                providerName === 'SYSTEM' && <Stack justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                                    <Button
                                        variant={page === 'change-password' ? 'contained' : 'outlined'}
                                        color="primary"
                                        sx={{ width: '100%' }}
                                        startIcon={<Iconify width={20} icon="solar:key-bold" />}
                                        onClick={() => handleChangePassword()}
                                    >
                                        {t('profile.changePassword')}
                                    </Button>
                                </Stack>
                            }

                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                                <Button
                                    variant={page === 'change-address' ? 'contained' : 'outlined'}
                                    color="primary"
                                    sx={{ width: '100%' }}
                                    startIcon={<Iconify width={20} icon="solar:point-on-map-bold" />}
                                    onClick={() => handleChangeAddress()}
                                >
                                    {t('profile.editAddress')}
                                </Button>
                            </Stack>
                        </>
                    )
                }


                {/* <Stack justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                    <Button
                        variant={page === 'member' ? 'contained' : 'outlined'}
                        color="primary"
                        sx={{ width: '100%' }}
                        startIcon={<Iconify width={20} icon="solar:card-bold" />}
                        onClick={() => handleMember()}
                    >
                        Member
                    </Button>
                </Stack>
                
                <Stack justifyContent="center" alignItems="center" sx={{ mt: 1.5 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ width: '100%' }}
                        startIcon={<Iconify width={20} icon="maki:racetrack" />}
                    >
                        Hall of Fame
                    </Button>
                </Stack> */}
            </Box>
        </CardCustom>
    )
}