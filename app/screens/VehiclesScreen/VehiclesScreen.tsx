import { useStores, Vehicle } from "app/models";
import { CollaboratorTabScreenProps } from "app/navigators";
import { delay } from "app/utils/delay";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  EmptyState,
  Icon,
  ListView,
  Screen,
  Text,
  Toggle,
} from "../../components";
import { translate } from "../../i18n";
import { VehicleCard } from "../components/VehicleCard";
import { $emptyState, $emptyStateImage, $heading, $labelStyle, $listContentContainer, $row, $screenContentContainer, $toggle } from "../styles";

export const VehiclesScreen: FC<CollaboratorTabScreenProps<"Vehicles">> = observer(function VehiclesScreen(_props) {
  const { navigation } = _props
  const { vehicleStore: {
    vehiclesForList,
    favoritesOnly,
    setProp,
    favorites,
    vehicles,
    fetchVehicles,
    hasFavorite,
    toggleFavorite,
    selectVehicle,
  } } = useStores()

  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await fetchVehicles()
      setIsLoading(false)
    })()
  }, [])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([fetchVehicles(), delay(3750)])
    setRefreshing(false)
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
    >
      <ListView<Vehicle>
        contentContainerStyle={$listContentContainer}
        data={vehiclesForList.slice()}
        extraData={favorites.length + vehicles.length}
        refreshing={refreshing}
        estimatedItemSize={177}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={
                favoritesOnly
                  ? "VehiclesScreen.noFavoritesEmptyState.heading"
                  : undefined
              }
              contentTx={
                favoritesOnly
                  ? "VehiclesScreen.noFavoritesEmptyState.content"
                  : undefined
              }
              button={favoritesOnly ? "" : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <View style={$row} >
              <Text preset="heading" tx="VehiclesScreen.title" />
              <Icon
                icon="addCircleOutline"
                onPress={
                  () => navigation.navigate("NewVehicle")
                }
              />
            </View>
            {(favoritesOnly || vehiclesForList.length > 0) && (
              <View style={$toggle}>
                <Toggle
                  value={favoritesOnly}
                  onValueChange={() =>
                    setProp("favoritesOnly", !favoritesOnly)
                  }
                  variant="switch"
                  labelTx="VehiclesScreen.onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  accessibilityLabel={translate("VehiclesScreen.accessibility.switch")}
                />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            isFavorite={hasFavorite(item)}
            onPressFavorite={() => toggleFavorite(item)}
            onPressItem={() => {
              selectVehicle(item);
              navigation.navigate("OrderServiceList");
            }}
          />
        )}
      />
    </Screen>
  )
})
