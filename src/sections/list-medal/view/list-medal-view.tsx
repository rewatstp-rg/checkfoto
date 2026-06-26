import { useState, useEffect } from "react";

import { Container } from "@mui/material";

import { paths } from "src/routes/paths";

import { useTranslate } from "src/locales";
import { useListMedalMutation } from "src/api/vr.api";

import { BackToTop } from "src/components/animate/back-to-top";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { MedalModel } from "src/types/vr-log-type";

import ListMedalItem from "../list-madals-item";
import { RunnerDetailInfo } from "../runner-detail-info";

export default function ListMedalView() {

    const { t } = useTranslate();
    const [listMedal, { isLoading }] = useListMedalMutation();
    const [medalModel, setMedalModel] = useState<MedalModel>();

    const callListMedal = async () => {
        await listMedal().unwrap().then(res => {
            setMedalModel(res);
        });
    }

    useEffect(() => {
        callListMedal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    { name: t('orders.title'), href: paths.order.root },
                    { name: 'My Medals' },
                ]}
                sx={{ mb: 2 }}
            />

            <BackToTop />

            {
                !isLoading && <RunnerDetailInfo medalModel={medalModel} />
            }
            {
                !isLoading && <ListMedalItem medalModel={medalModel} />
            }

        </Container>
    );
}