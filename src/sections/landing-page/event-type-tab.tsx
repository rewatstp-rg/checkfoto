import { useState } from 'react';

import { Tab, Tabs, styled, Container } from '@mui/material';

import { MotionContainer } from 'src/components/animate';

const CustomTabs = styled(Tabs)(({ theme }) => ({
    justifyContent: 'center', // for flexbox layout
    minHeight: 24,
    '& .MuiTabs-flexContainer': {
        justifyContent: 'center',
        minHeight: 24,
    },
    '& .MuiTabs-indicator': {
        borderBottom: `3px solid ${theme.palette.primary.main}`, // active border
    },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
    minHeight: 24,
    padding: '6px 12px',
    textTransform: 'none',
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.secondary,
    borderBottom: 'px solid transparent', // default state
    '&.Mui-selected': {
        color: theme.palette.text.primary,
        borderBottom: `3px solid ${theme.palette.primary.main}`, // active border
        minHeight: '24px'
    },
}));

export function EventTypeTab() {

    const listEventType = [
        {
            title: 'งานวิ่งทั้งหมด',
            titleEn: 'All Events',
            path: '?eventType=overall'
        },
        {
            title: 'งานวิ่งแนะนำ',
            titleEn: 'Recommended',
            path: '?eventType=new'
        },
        {
            title: 'งานวิ่งถนน',
            titleEn: 'Road',
            path: '?eventType=running'
        },
        {
            title: 'งานวิ่งเทรล',
            titleEn: 'Trail',
            path: '?eventType=trail'
        },
        {
            title: 'Virtual Run',
            titleEn: 'Virtual Run',
            path: 'https://vr.checkrace.com/'
        }
    ];

    const [value, setValue] = useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const renderContent = (
        <CustomTabs value={value} onChange={handleChange}>
            {
                listEventType?.length > 0 && listEventType.map((item, index) => (
                    <CustomTab key={index} label={item.title} value={item.path} />
                ))
            }
        </CustomTabs>
    )

    return (
        <Container sx={{ position: "relative", maxWidth: "1440px !important", mt: 5 }} component={MotionContainer}>
            {renderContent}
        </Container>
    )
}