import { ButtonProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Iconify from "../iconify";

type Props = {
    addLabel?: string;
    onAdd?: () => void;
    loading?: boolean;
};

const ButtonAdd = (props: Props & ButtonProps) => {
    const { addLabel = 'เพิ่ม', onAdd, loading = false, ...other } = props;
    return (
        <LoadingButton
            sx={{ minWidth: 100 }}
            variant="contained"
            loading={loading}
            onClick={onAdd}
            startIcon={<Iconify icon="mingcute:add-line" />}
            {...other}
        >
            {addLabel}
        </LoadingButton>
    )
};

export default ButtonAdd;