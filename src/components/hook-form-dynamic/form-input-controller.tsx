import { Controller, useFormContext } from 'react-hook-form';

import { Grid } from '@mui/material';

import { DynamicFormType } from 'src/types/input-column.model';

import InputDynamic from './input-dynamic';

type Props = {
    dynamicForm: DynamicFormType[];
    ticketOnChange?: (e: string) => void
    stockOnChange?: (e: any) => void
}

const FormInputController = ({ dynamicForm, ticketOnChange, stockOnChange }: Props) => {

    const { control } = useFormContext();

    const RenderColFullRight = ({ e }: any) => {
        const { rules, defaultValue } = e;
        const rowtest = ['a', 'b', 'c'];
        return (
            <>
                {
                    rowtest?.map((x: any, index: number) => (
                        <Grid item  xs={index === 0 ? 0 : 4} md={3} key={index} />
                    ))
                }
                <Grid  item xs={4} md={3} key={e.name}>
                    <section>
                        <Controller
                            name={e.name}
                            control={control}
                            rules={rules}
                            defaultValue={defaultValue}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <InputDynamic
                                        ticketOnChange={(ticketKey: string) => ticketOnChange?.(ticketKey)}
                                        stockOnChange={(stock: any) => stockOnChange?.(stock)}
                                        field={field}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={error}
                                        {...e}
                                    />
                                </div>
                            )}
                        />
                    </section>
                </Grid>
            </>
        )
    }

    const RenderColFullLeft = ({ e }: any) => {
        const { rules, defaultValue } = e;
        const rowtest = ['a'];
        return (
            <>
                <Grid item xs={12} md={6} key={e.name}>
                    <section>
                        <Controller
                            name={e.name}
                            control={control}
                            rules={rules}
                            defaultValue={defaultValue}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <InputDynamic
                                        ticketOnChange={(ticketKey: string) => ticketOnChange?.(ticketKey)}
                                        stockOnChange={(stock: any) => stockOnChange?.(stock)}
                                        field={field}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={error}
                                        {...e}
                                    />
                                </div>
                            )}
                        />
                    </section>
                </Grid>
                {
                    rowtest?.map((x: any, index: number) => (
                        <Grid item xs={index === 0 ? 0 : 4} md={3} key={index} />
                    ))
                }

            </>
        )
    }

    const RenderCol = ({ e }: any) => {
        const { rules, defaultValue, col, type }: any = e;
        return (
            <Grid item xs={12} md={Number(col)} key={e.key} sx={{ display: type === 'noneDisplay' ? 'none' : 'block' }}>
                <section>
                    <Controller
                        name={e.name}
                        control={control}
                        rules={rules}
                        defaultValue={defaultValue}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <InputDynamic
                                    ticketOnChange={(ticketKey: string) => ticketOnChange?.(ticketKey)}
                                    stockOnChange={(stock: any) => stockOnChange?.(stock)}
                                    field={field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={error}
                                    {...e}
                                />
                            </div>
                        )}
                    />
                </section>
            </Grid>
        )
    }

    const formInputs = dynamicForm.map((e: DynamicFormType) => {
        const { col } = e;
        const setColumn = (column: string) => {
            switch (column.toString()) {
                case '99':
                    return <RenderColFullRight e={e} key={e.key} />;
                case '98':
                    return <RenderColFullLeft e={e} key={e.key} />;
                default:
                    return <RenderCol e={e} key={e.key} />;
            }
        }

        return setColumn(col || '6');
    }, [dynamicForm]);


    return formInputs;
}

export default FormInputController;