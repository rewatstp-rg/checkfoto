import Toolbar from '@mui/material/Toolbar';
import { Stack, useTheme, Container } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import NavList from './nav/desktop/nav-list';

const ListEventType = () => {

    const lgUp = useResponsive('up', 'lg');
    const theme = useTheme();

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

    const renderContent = (
        <Stack component="nav" direction="row" spacing={5} sx={{ mr: 2.5, height: 1, width: 600 }}>
            {listEventType.map((list) => (
                <NavList key={list.title} data={list} />
            ))}
        </Stack>
    )

    const lgStyle = lgUp ? { display: 'flex', alignItems: 'center' } : { height: 1, width: 500, overflow: window.innerWidth > 500 ? 'none' : 'scroll' };

    return (
        <Toolbar
            sx={{
                height: 1,
                px: { lg: 5 },
                background: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.neutral,
            }}
        >
            <Container sx={{ ...lgStyle }}>
                {renderContent}
            </Container>

        </Toolbar>
    )
};


export default ListEventType;