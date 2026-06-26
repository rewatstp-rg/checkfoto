import { Controller, useFormContext } from 'react-hook-form';

import { Grid } from '@mui/material';

import { DynamicFormType } from 'src/types/input-column.model';

import InputDynamicAddress from './input-dynamic-address';

type Props = {
    dynamicForm: DynamicFormType[];
}

const FormInputControllerAddress = ({ dynamicForm }: Props) => {

    const { control } = useFormContext();

    const RenderColFullRight = ({ e }: any) => {
        const { rules, defaultValue } = e;
        const rowtest = ['a', 'b', 'c'];
        return (
            <>
                {
                    rowtest?.map((x: any, index: number) => (
                        <Grid item xs={index === 0 ? 0 : 4} md={3} key={index} />
                    ))
                }
                <Grid item xs={4} md={3} key={e.name}>
                    <section>
                        <Controller
                            name={e.name}
                            control={control}
                            rules={rules}
                            defaultValue={defaultValue}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <InputDynamicAddress
                                        listDynamicForm={dynamicForm}
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

    const RenderCol = ({ e }: any) => {
        const { rules, defaultValue, colLayout }: any = e;
        return (
            <Grid item xs={12} md={colLayout} key={e.key}>
                <section>
                    <Controller
                        name={e.name}
                        control={control}
                        rules={rules}
                        defaultValue={defaultValue}
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <InputDynamicAddress
                                  listDynamicForm={dynamicForm}
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
        const { colLayout } = e;
        return colLayout === '99' ? <RenderColFullRight e={e} key={e.key} /> : <RenderCol e={e} key={e.key} />
    }, [dynamicForm]);

    return formInputs;
}


export default FormInputControllerAddress;