import React from 'react';
import { useController } from 'react-hook-form';
import { TextField, TextFieldProps } from './TextField';

interface TextFieldControlledProps extends TextFieldProps {
  name: string;
  control: any;
  rules?: any;
}

export const TextFieldControlled = (props: TextFieldControlledProps) => {
  const { name, control, rules, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <TextField
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...inputProps}
      helper={fieldState.error ? fieldState.error.message : undefined}
      status={
        fieldState.error ? 'error' : undefined
      }
    />
  )
}
