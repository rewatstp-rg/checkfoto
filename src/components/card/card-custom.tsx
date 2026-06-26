import { Card , CardHeader, CardContent } from '@mui/material';

type Props = {
    children: React.ReactNode;
    title?: string;
    action?: React.ReactNode;
}

export default function CardCustom({ children, title, action }: Props) {
    return (
        <Card sx={{
            width: '100%',
            mb: 4
        }}>
            {
                title && (
                    <>
                        <CardHeader title={title} action={action} />
                        <CardContent>
                            {children}
                        </CardContent>
                    </>

                )
            }
            {
                !title && (
                    <CardContent>
                        {children}
                    </CardContent>
                )
            }

        </Card >
    )
}