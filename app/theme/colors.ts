// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#FFEBE8",
  primary200: "#FFC7B3",
  primary300: "#FF9A80",
  primary400: "#FF6E4D",
  primary500: "#FF3B1A",
  primary600: "#CC2F14",

  secondary100: "#E8F4FF",
  secondary200: "#B3D9FF",
  secondary300: "#80BFFF",
  secondary400: "#4DA6FF",
  secondary500: "#1A8CFF",

  accent100: "#FFF4E8",
  accent200: "#FFE0B3",
  accent300: "#FFCC80",
  accent400: "#FFB84D",
  accent500: "#FFA31A",

  angry100: "#FFE8E8",
  angry500: "#FF1A1A",

  overlay20: "rgba(255, 59, 26, 0.2)",
  overlay50: "rgba(255, 59, 26, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
