import React, { FC } from "react"
import { Image, View } from "react-native"
import { AutoImage, ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { $carImage, $container, $logo, $logoContainer, $tagline, $title } from "./styles"

const carImage = require("../../../assets/images/demo-explorer.avif")
const reactNativeLiveLogo = require("../../../assets/images/demo/rnl-logo.png")
const reactNativeNewsletterLogo = require("../../../assets/images/demo/rnn-logo.png")

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { navigation } = _props
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="HomeScreen.title" style={$title} />
      <Text tx="HomeScreen.tagLine" style={$tagline} />

      <AutoImage source={carImage} style={$carImage} />

      <ListItem
        tx="HomeScreen.offers"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Image source={reactNativeNewsletterLogo} style={$logo} />
          </View>
        }
        onPress={() => openLinkInBrowser("")}
      />
      <ListItem
        tx="HomeScreen.serviceOrder"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Image source={reactNativeLiveLogo} style={$logo} />
          </View>
        }
        onPress={() => navigation.navigate("OrderServicetList")}
      />
    </Screen>
  )
}
