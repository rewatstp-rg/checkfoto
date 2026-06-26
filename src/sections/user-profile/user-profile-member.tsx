import { Box } from "@mui/material";

import { _mock } from "src/_mock";

import TitleLable from "src/components/title-lable";
import CardCustom from "src/components/card/card-custom";
import BankingCurrentBalance from "src/components/member-card";

// ----------------------------------------------------------------------

export const _bankingCreditCard = [
    {
        id: _mock.id(2),
        balance: 23432.03,
        cardType: 'mastercard',
        cardHolder: _mock.fullName(2),
        cardNumber: '4985 3827 1002 3640',
        cardValid: '11/22',
    },
    {
        id: _mock.id(3),
        balance: 18000.23,
        cardType: 'visa',
        cardHolder: _mock.fullName(3),
        cardNumber: '8376 2736 0092 8864',
        cardValid: '11/25',
    },
    {
        id: _mock.id(4),
        balance: 2000.89,
        cardType: 'mastercard',
        cardHolder: _mock.fullName(4),
        cardNumber: '8376 9374 8300 7755',
        cardValid: '11/22',
    },
];
export default function UserProfileMember() {
    return (
        <CardCustom>
            <TitleLable title='Member Card' />
            <Box sx={{ maxWidth: 470 }}>
                <BankingCurrentBalance list={_bankingCreditCard} />
            </Box>
        </CardCustom>
    );
}