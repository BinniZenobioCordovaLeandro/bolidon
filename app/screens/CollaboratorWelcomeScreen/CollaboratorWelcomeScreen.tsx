import { Button, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

const welcomeLogo = require("../../../assets/images/logo.png")

interface CollaboratorWelcomeScreenProps extends AppStackScreenProps<"CollaboratorWelcome"> { }

export const CollaboratorWelcomeScreen: FC<CollaboratorWelcomeScreenProps> = observer(function CollaboratorWelcomeScreen(_props) {
  const { navigation } = _props

  const goNext = () => {
    navigation.navigate("Collaborator", { screen: "OrderServicetList" })
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="CollaboratorWelcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="CollaboratorWelcomeScreen.exciting" preset="subheading" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="CollaboratorWelcomeScreen.postscript" />

        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="CollaboratorWelcomeScreen.letsGo"
          onPress={goNext}
        />
      </View>
    </View>
  )
})


const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "20%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}


const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}
