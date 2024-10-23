import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { spacing } from "../../../theme"

const { width } = Dimensions.get('window');

export const $carImage: ImageStyle = {
  alignSelf: "auto",
  width: width - spacing.lg,
  minHeight: width - spacing.lg / 2,
}

export const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

export const $title: TextStyle = {
  marginBottom: spacing.sm,
}

export const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
}

export const $description: TextStyle = {
  marginBottom: spacing.lg,
}

export const $sectionTitle: TextStyle = {
  marginTop: spacing.xxl,
}

export const $logoContainer: ViewStyle = {
  marginEnd: spacing.md,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
  alignSelf: "stretch",
}

export const $logo: ImageStyle = {
  height: 38,
  width: 38,
}
