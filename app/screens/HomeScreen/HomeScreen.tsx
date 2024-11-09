import { useStores } from "@/models"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { AutoImage, Icon, ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { $carImage, $container, $logoContainer, $tagline, $title } from "./styles"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { navigation } = _props
  const { vehicleStore: {
    vehiclesForList,
    fetchVehicles,
  } } = useStores()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await fetchVehicles()
      setIsLoading(false)
    })()
  }, [])

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="HomeScreen.title" style={$title} />
      <Text tx="HomeScreen.tagLine" style={$tagline} />

      {
        isLoading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            {vehiclesForList.map((vehicle) => (
              <AutoImage key={vehicle.guid} source={{uri: vehicle.thumbnail}} style={$carImage} maxWidth={400} />
            ))}
          </View>
        )
      }

      <ListItem
        tx="HomeScreen.offers"
        bottomSeparator
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        LeftComponent={
          <View style={$logoContainer}>
            <Icon icon="offers" size={40} />
          </View>
        }
        onPress={() => navigation.navigate("Offers")}
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
