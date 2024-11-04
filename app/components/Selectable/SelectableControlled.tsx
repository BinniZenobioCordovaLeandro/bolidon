import SegmentedControl from "@react-native-segmented-control/segmented-control";
import * as React from "react";
import { useController } from "react-hook-form";
import { Text } from "../Text";

export interface SelectableControlledProps {
  name: string
  control: any;
  rules?: any;
  options: string[];
}

export const SelectableControlled = (props: SelectableControlledProps) => {
  const { name, control, rules, options, ...selectableProps } = props
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <>
      <SegmentedControl
        values={options}
        selectedIndex={field.value}
        onChange={field.onChange}
        {...selectableProps}
      />
      <Text preset="error">{fieldState.error ? fieldState.error.message : undefined}</Text>
    </>
  )
}
