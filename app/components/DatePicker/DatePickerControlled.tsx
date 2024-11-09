import React from 'react';
import { useController } from 'react-hook-form';
import { View, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { DatePicker } from './DatePicker';

export interface DatePickerControlledProps {
  name: string
  control: any;
  rules?: any;
  containerStyle?: ViewStyle;
}

export const DatePickerControlled = (props: DatePickerControlledProps) => {
  const { name, control, rules } = props
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <View style={props.containerStyle}>
      <DatePicker
        value={field.value}
        onChange={field.onChange}
      />
      <Text preset="error">{fieldState.error ? fieldState.error.message : undefined}</Text>
    </View>
  )
}