import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";
import { View, ViewStyle } from "react-native";

interface CheckboxProps {
  value: boolean
  onValueChange: (value: boolean) => void
  style?: ViewStyle
}

export const Checkbox = observer(function Checkbox(_props: CheckboxProps) {
  const { value, onValueChange } = _props
  return (
    <View>
      <Checkbox style={$checkbox} value={value} onValueChange={onValueChange} />
    </View>
  )
})

const $checkbox: ViewStyle = {
  justifyContent: "center",
}
