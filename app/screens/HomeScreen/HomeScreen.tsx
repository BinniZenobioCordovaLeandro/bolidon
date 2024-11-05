import React, { FC } from "react"
import { View } from "react-native"
import { AutoImage, Icon, ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"
import { $carImage, $container, $logoContainer, $tagline, $title } from "./styles"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { navigation } = _props
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="HomeScreen.title" style={$title} />
      <Text tx="HomeScreen.tagLine" style={$tagline} />

      <AutoImage source={{
        uri: "https://www.prorack.com.au/sites/aufiles/files/styles/cars_list/public/17219.jpg",
      }} style={$carImage} />

      <ListItem
        tx="HomeScreen.offers"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Icon icon="offers" size={40} />
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
            <Icon icon="serviceOrder" size={40} />
          </View>
        }
        onPress={() => navigation.navigate("OrderServiceList")}
      />
      <ListItem
        tx="HomeScreen.diagnosticAI"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Icon icon="diagnosticAI" size={40} />
          </View>
        }
        onPress={() => navigation.navigate("AssistedDiagnosis")}
      />
      <ListItem
        tx="HomeScreen.repair"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Icon icon="repair" size={40} />
          </View>
        }
        onPress={() => navigation.navigate("RepairRequest")}
      />
    </Screen>
  )
}
