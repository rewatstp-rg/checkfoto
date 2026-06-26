import { Box, Card, Grid, Divider, useTheme, CardHeader, Typography } from "@mui/material";

import { useLocales } from "src/locales";

import Image from "src/components/image";

import { MedalModel } from "src/types/vr-log-type";

import './medals.css';

export default function ListMedalItem({
    medalModel
}: {
    medalModel?: MedalModel
}) {

    const theme = useTheme();

    const { currentLang } = useLocales();

    return (
        <Card sx={{ p: 2, pt: 2, mt: 5 }}>
            <CardHeader
                title="MEDAL"
                titleTypographyProps={{ variant: 'h6', color: 'primary', fontWeight: 'bolder', mb: 3 }}
            />
            <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />
            <Grid container spacing={2}>
                {
                    medalModel?.listMedal && medalModel?.listMedal?.length > 0 && medalModel.listMedal?.map((item, index) => (
                        <Grid item xs={12} md={4} lg={3} sx={{ textAlign: 'center' }} key={index} className="medal-container">
                            <Card sx={{ p: 0 }}>
                                <Box className="card-madal medal-float">
                                    <Box className="card-inner">
                                        <Box className="card-front">
                                            <Image
                                                height={250}
                                                disabledEffect
                                                borderRadius={2}
                                                alt={item?.eventNameTh}
                                                src={item?.imageInActive}
                                                paddingTop={0} />
                                        </Box>
                                        <Box className="card-back">
                                            <Image
                                                height={250}
                                                disabledEffect
                                                borderRadius={2}
                                                alt={item?.eventNameTh}
                                                src={item?.imageActive}
                                                paddingTop={0} />
                                        </Box>
                                    </Box>
                                </Box>
                                {
                                    currentLang?.value === 'th' ? (
                                        <>
                                            <Typography noWrap sx={{
                                                margin: '0 2rem 1rem',
                                                fontWeight: 'bolder',
                                                color: theme.palette.text.primary,
                                                textTransform: 'uppercase'
                                            }}>
                                                {item?.eventNameTh}
                                            </Typography>
                                            <Typography noWrap sx={{
                                                margin: '0 2rem 1rem',
                                                fontWeight: 'bolder',
                                                color: theme.palette.text.secondary,
                                                textTransform: 'uppercase'
                                            }}>
                                                {item?.ticketNameTh}
                                            </Typography>
                                            <Typography noWrap sx={{
                                                margin: '0 2rem 1rem',
                                                fontWeight: 'bolder',
                                                color: theme.palette.primary.main,
                                                textTransform: 'uppercase'
                                            }}>
                                                BIB : {item?.bibNumber || ''}
                                            </Typography>
                                        </>

                                    ) : (
                                        <>
                                            <Typography noWrap sx={{
                                                margin: '0 2rem 1rem',
                                                fontWeight: 'bolder',
                                                color: 'black',
                                                textTransform: 'uppercase'
                                            }}>
                                                {item?.eventNameEn}
                                            </Typography>
                                            <Typography noWrap sx={{
                                                margin: '0 2rem 1rem',
                                                fontWeight: 'bolder',
                                                color: 'black',
                                                textTransform: 'uppercase'
                                            }}>
                                                {item?.ticketNameEn}
                                            </Typography>
                                            <Typography noWrap sx={{
                                                margin: '0 2rem 1rem',
                                                fontWeight: 'bolder',
                                                color: 'black',
                                                textTransform: 'uppercase'
                                            }}>
                                                BIB : {item?.bibNumber || ''}
                                            </Typography>
                                        </>
                                    )
                                }
                            </Card>

                        </Grid>
                    ))
                }
            </Grid>
        </Card>
    )
}