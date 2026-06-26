import { m } from 'framer-motion';

import {
    Box,
    alpha,
    useTheme,
    Typography,
    useMediaQuery
} from '@mui/material';


export interface ToggleStep {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface ToggleStepsProps {
    steps: ToggleStep[];
    value: string;
    onChange: (value: string) => void;
    maxWidth?: number;
}

export const ToggleSteps = ({
    steps,
    value,
    onChange,
    maxWidth = 400,
}: ToggleStepsProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const height = isMobile ? 50 : 48;
    const fontSize = isMobile ? 13 : 14;

    const activeIndex = steps.findIndex((s) => s.value === value);
    const widthPercent = 100 / steps.length;

    const innerPadding = 4;

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                // maxWidth: 400,
                height,
                borderRadius: '8px',
                backgroundColor: theme.palette.primary.main,
                p: `${innerPadding}px`,
                boxSizing: 'border-box',
                my: 2
            }}
        >
            {/* Active pill */}
            <m.div
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                style={{
                    position: 'absolute',
                    top: innerPadding,
                    left: `calc(${widthPercent * activeIndex}% + ${innerPadding}px)`,
                    width: `calc(${widthPercent}% - ${innerPadding * 2}px)`,
                    height: height - innerPadding * 2,
                    background: theme.palette.background.paper,
                    borderRadius: '6px', // pill
                    zIndex: 1,
                }}
            />

            {steps.map((step) => {
                const isActive = step.value === value;

                return (
                    <Box
                        key={step.value}
                        onClick={() => onChange(step.value)}
                        sx={{
                            flex: 1,
                            zIndex: 2,
                            minWidth: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: 1,
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                backgroundColor: isActive
                                    ? 'transparent'
                                    : alpha(
                                        theme.palette.common.white,
                                        theme.palette.mode === 'dark' ? 0.08 : 0.15
                                    ),
                            },
                        }}
                    >
                        <Typography
                            component="div"
                            noWrap
                            fontWeight={600}
                            fontSize={fontSize}
                            sx={{
                                color: isActive
                                    ? theme.palette.text.primary
                                    : theme.palette.primary.contrastText,
                            }}
                        >
                            <Box 
                                display='flex' 
                                alignItems='center' 
                                flexDirection={{ xs: 'column', sm: 'row' }} 
                                gap={{ xs: 0, sm: 1 }}>
                                {step.icon}
                                {step.label}
                            </Box>
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};
