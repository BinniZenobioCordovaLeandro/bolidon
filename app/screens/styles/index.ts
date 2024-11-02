import { ContentStyle } from "@shopify/flash-list"
import { isRTL } from "app/i18n"
import { spacing } from "app/theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"

export const $root: ViewStyle = {
  flex: 1,
}

export const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

export const $section: ViewStyle = {
  marginTop: spacing.md,
  marginBottom: spacing.md,
}

export const $row: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const $screenContentContainer: ViewStyle = {
  flex: 1,
}

export const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

export const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

export const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

export const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

export const $labelStyle: TextStyle = {
  textAlign: "left",
}

export const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

export const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

export const $imageContainer: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'space-between',
}

export const $image: ImageStyle = {
  width: 200,
  height: 200,
  marginBottom: spacing.sm,
}

export const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

export const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

export const $wrap: ViewStyle = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'space-between',
}