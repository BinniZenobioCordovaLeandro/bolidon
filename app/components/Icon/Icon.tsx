import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from "react";
import { ComponentType } from "react";
import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

export type IconTypes = keyof typeof iconRegistry

export type iconProps = {
  color?: string
  size?: number
}

export const iconRegistry = {
  addCircleOutline: (props: iconProps) => <Ionicons name="add-circle-outline" {...props} />,
  back: (props: iconProps) => <Ionicons name="arrow-back" {...props} />,
  bell: (props: iconProps) => <Ionicons name="notifications" {...props} />,
  caretLeft: (props: iconProps) => <Ionicons name="caret-back" {...props} />,
  caretRight: (props: iconProps) => <Ionicons name="caret-forward" {...props} />,
  check: (props: iconProps) => <Ionicons name="checkmark" {...props} />,
  clap: (props: iconProps) => <Ionicons name="hand-left" {...props} />,
  community: (props: iconProps) => <Ionicons name="people" {...props} />,
  components: (props: iconProps) => <Ionicons name="apps" {...props} />,
  debug: (props: iconProps) => <Ionicons name="person" {...props} />,
  github: (props: iconProps) => <Ionicons name="logo-github" {...props} />,
  heart: (props: iconProps) => <Ionicons name="heart" {...props} />,
  hidden: (props: iconProps) => <Ionicons name="eye-off" {...props} />,
  ladybug: (props: iconProps) => <Ionicons name="bug" {...props} />,
  lock: (props: iconProps) => <Ionicons name="lock-closed" {...props} />,
  menu: (props: iconProps) => <Ionicons name="menu" {...props} />,
  more: (props: iconProps) => <Ionicons name="ellipsis-horizontal" {...props} />,
  pin: (props: iconProps) => <Ionicons name="pin" {...props} />,
  podcast: (props: iconProps) => <Ionicons name="bug" {...props} />,
  settings: (props: iconProps) => <Ionicons name="settings" {...props} />,
  slack: (props: iconProps) => <Ionicons name="logo-slack" {...props} />,
  view: (props: iconProps) => <Ionicons name="eye" {...props} />,
  x: (props: iconProps) => <Ionicons name="close" {...props} />,
  offers: (props: iconProps) => <Ionicons name="pricetags" {...props} />,
  serviceOrder: (props: iconProps) => <Ionicons name="construct" {...props} />,
  diagnosticAI: (props: iconProps) => <Ionicons name="flask" {...props} />,
  repair: (props: iconProps) => <Ionicons name="construct" {...props} />,
  person: (props: iconProps) => <Ionicons name="person" {...props} />,
};


interface IconProps extends TouchableOpacityProps {
  icon: IconTypes
  color?: string
  size?: number
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: TouchableOpacityProps["onPress"]
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 24,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  const Icon = iconRegistry[icon]

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Icon color={color} size={size} />
    </Wrapper>
  )
}


