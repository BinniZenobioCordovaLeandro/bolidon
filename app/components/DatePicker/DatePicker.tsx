import { observer } from "mobx-react-lite"; // @mst remove-current-line
import React from "react";
import { TextStyle } from "react-native";
import { DatePickerInput } from 'react-native-paper-dates';


export interface DatePickerProps {
  value: Date
  onChange: (date: Date | undefined) => void
  style?: TextStyle
}

export const DatePicker = observer(function DatePicker(props: DatePickerProps) {
  const { value, onChange, style } = props
  return (
    <DatePickerInput
      locale="es"
      value={value}
      onChange={onChange}
      inputMode="start"
      style={style}
    />
  )
})
