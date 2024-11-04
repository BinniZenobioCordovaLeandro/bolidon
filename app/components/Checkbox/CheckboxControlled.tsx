import * as React from "react";
import { useController } from "react-hook-form";
import { ViewStyle } from "react-native";
import { Checkbox } from "./Checkbox";

interface CheckboxProps {
  name: string;
  control: any;
  rules?: any;
}

export const CheckboxControlled = (_props: CheckboxProps) => {
  const { name, control, rules } = _props;
  const { field } = useController({ control, name, rules });

  return (
    <Checkbox
      style={$checkbox}
      value={field.value}
      onValueChange={field.onChange}
    />
  )
}

const $checkbox: ViewStyle = {
  justifyContent: "center",
}