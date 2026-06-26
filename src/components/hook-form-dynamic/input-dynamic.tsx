import RHFDateFieldDynamic from "./rhf-text-date";
import RHFTextFieldDynamic from "./rhf-text-field";
import RHFSelectBtnDynamic from "./rhf-select-btn";
import { ApplyForFriend } from "./apply-for-friend";
import RHFAutocompleteDynamic from "./rhf-autocomplete";
import RHFUploadAvatarDynamic from "./rhf-upload-avatar";
import RHFSelectBtnDescDynamic from "./rhf-select-btn-desc";
import RHFAutocompleteStockDynamic from "./rhf-autocomplete-stock";
import RHFAutocompleteDynamicTicket from "./rhf-autocomplete-ticket";

const InputDynamic = ({ value, onChange, type, error, field, sx, ticketOnChange, stockOnChange, ...rest }: any) => {
    switch (type) {
        case "input":
            return (
                <RHFTextFieldDynamic
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    sx={sx}
                    rest={rest}
                />
            );
        case "dropdown":
            return (
                <RHFAutocompleteDynamic
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    options={rest?.option || []}
                    sx={sx}
                    rest={rest}
                    value={value}
                />
            );
        case "dropdown-stock":
            return (
                <RHFAutocompleteStockDynamic
                    stockOnChange={(e) => stockOnChange(e)}
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    options={rest?.option || []}
                    sx={sx}
                    rest={rest}
                />
            );
        case "datepicker":
            return (
                <RHFDateFieldDynamic
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    sx={sx}
                    rest={rest}
                />
            );
        case "radioGroupBtnRow":
            return (
                <RHFSelectBtnDynamic
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    rest={rest}
                    options={rest?.option || []}
                />
            );
        case "imageUpload":
            return (
                <RHFUploadAvatarDynamic
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    rest={rest}
                />
            );
        case "dropdownTicket":
            return (
                <RHFAutocompleteDynamicTicket
                    ticketOnChange={(e) => ticketOnChange(e)}
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    options={rest?.option || []}
                    sx={sx}
                    rest={rest}
                />
            );
        case "applyForFrield":
            return (
                <ApplyForFriend
                    field={field}
                    label={rest?.label}
                    labelEn={rest?.labelEn}
                    error={error}
                    rest={rest}
                />
            );
        case "radioGroupBtnRowDesc":
            return (
                <RHFSelectBtnDescDynamic
                    field={field}
                    label={rest?.label}
                    error={error}
                    rest={rest}
                    options={rest?.option || []}
                    labelEn={rest?.labelEn} />
            );

        default:
            return null;
    }
};

export default InputDynamic;