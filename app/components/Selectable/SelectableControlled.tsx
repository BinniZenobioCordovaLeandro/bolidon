import * as React from "react";
import { useController } from "react-hook-form";
import { Text } from "../Text";
import { Selectable } from "./Selectable";

export interface SelectableControlledProps {
  name: string
  control: any;
  rules?: any;
  options: string[];
}

export const SelectableControlled = (props: SelectableControlledProps) => {
  const { name, control, rules, options } = props
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <>
      <Selectable
        options={options}
        value={field.value}
        onChange={field.onChange}
      />
      <Text preset="error">{fieldState.error ? fieldState.error.message : undefined}</Text>
    </>
  )
}
