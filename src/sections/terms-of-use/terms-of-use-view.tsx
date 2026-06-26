import { Container } from "@mui/material";

import { useTranslate } from "src/locales";

import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import TermsOfUseContent from "./terms-of-use-content";

export default function TermsOfUseView() {

    const { t } = useTranslate();

    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: 5,
                mb: 2,
            }}
        >
            <CustomBreadcrumbs
                links={[
                    { name: t('common.home'), href: '/' },
                    { name: 'Terms of Use' }
                ]}
                sx={{ mb: 2 }}
            />
            <TermsOfUseContent />
        </Container>
    )
}