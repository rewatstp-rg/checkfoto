import { Box } from "@mui/material";

type TimeBlockProps = {
    label: string;
    value: string;
};

export default function TimeBlock({ label, value }: TimeBlockProps) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div> {(value === 'NaN' || value === '0' || value === 'aN') ? '00' : value.padStart(2, '0')} </div>
            <Box sx={{ typography: 'body1'}}>{label}</Box>
        </div>
    );
}
