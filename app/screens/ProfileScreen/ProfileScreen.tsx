import React, { FC } from "react"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { useStores } from "../../models"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { colors, spacing } from "../../theme"
import { $logoContainer } from "../HomeScreen/styles"
import { $title } from "../styles"

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = function ProfileScreen(
  _props,
) {
  const {
    authenticationStore: { logout, authEmail },
  } = useStores()

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text
        style={$reportBugsLink}
        tx="ProfileScreen.suggestFeature"
        onPress={() => openLinkInBrowser("https://docs.google.com/forms/d/e/1FAIpQLSeVlMhXwz7OFjQRov5UAevUXCECQlX_XoJ8G-XKxq5STC_-9Q/viewform?usp=sf_link")}
      />
      <Text style={$title} preset="heading" tx="ProfileScreen.title" />
      <Text text={authEmail} preset="subheading" />
      <ListItem
        tx="ProfileScreen.profile"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Icon icon="offers" size={40} />
          </View>
        }
        onPress={() => openLinkInBrowser("")}
      />
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logout} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginVertical: spacing.xxxl,
}