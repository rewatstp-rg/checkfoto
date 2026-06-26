import {
    Grid,
    Container
} from "@mui/material";

import { useBoolean } from "src/hooks/use-boolean";
import { getStorage } from "src/hooks/use-local-storage";

import { STORAGE_KEYS } from "src/utils/constants";

import { useTranslate } from 'src/locales';
import { jwtDecode } from "src/auth/context/jwt/utils";

import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import UserProfileForm from "../user-profile-form";
import UserProfileMember from '../user-profile-member';
import { UserProfileMenu } from "../user-profile-menu";
import UserProfileSeries from "../user-profile-series";
import UserProfileAddressForm from "../user-profile-address";
import UserProfileChengePasswordForm from "../user-profile-change-password";
import UserProfileDialogEditImageProfile from "../dialog-edit-image-profile";

// ----------------------------------------------------------------------

type Props = {
    page: string,
    menuType: string
}
const UserProfileView = ({ page, menuType }: Props) => {

    const key = STORAGE_KEYS.USER_INFO;
    const userProfile = getStorage(key);

    const { t } = useTranslate();
    const dialogEditImage = useBoolean();

    const openDialogEditImage = () => {
        if (userProfile) {
            const user = jwtDecode(userProfile)?.userDetail;
            if (user?.providerName === 'SYSTEM') {
                dialogEditImage.onTrue();
            }
        }
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: 10,
                mb: 2,
            }}
        >
            <CustomBreadcrumbs
                links={[
                    { name: t('common.home'), href: '/' },
                    { name: t('profileInfo') }
                ]}
                sx={{ mb: 2 }}
            />
            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} sx={{ gap: 3 }} justifyContent='center'>
                        <UserProfileMenu page={page} openDialogEditImage={openDialogEditImage} />
                    </Grid>
                    {
                        page === 'member' && (
                            <Grid item xs={12} md={9}>
                                <UserProfileMember />
                                <UserProfileSeries />
                            </Grid>
                        )
                    }
                    {
                        page === 'profile' && (
                            <Grid item xs={12} md={9}>
                                <UserProfileForm />
                            </Grid>
                        )
                    }
                    {
                        page === 'change-password' && (
                            <Grid item xs={12} md={9}>
                                <UserProfileChengePasswordForm />
                            </Grid>
                        )
                    }
                    {
                        page === 'change-address' && (
                            <Grid item xs={12} md={9}>
                                <UserProfileAddressForm />
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
            <UserProfileDialogEditImageProfile open={dialogEditImage.value} onClose={dialogEditImage.onFalse} onSuccess={dialogEditImage.onFalse} />
        </Container >
    );
}

export default UserProfileView;