import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";

export interface SelectableProps {
  options: string[],
  value: string,
  onChangeText: (text: string) => void
  renderItem: (item: string) => React.ReactNode
}

export const Selectable = observer(function Selectable(props: SelectableProps) {
  const { options, value, onChangeText } = props;

  return (
    <SegmentedControl
      values={options}
      selectedIndex={options.indexOf(value)}
      onChange={(event) =>
        onChangeText(options[event.nativeEvent.selectedSegmentIndex])
      }
    />
  )
})
