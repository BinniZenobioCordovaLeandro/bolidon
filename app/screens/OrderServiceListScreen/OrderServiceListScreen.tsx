import { spacing } from "@/theme"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native"
import {
  EmptyState,
  Icon,
  ListView,
  Screen,
  Text,
  Toggle,
} from "../../components"
import { translate } from "../../i18n"
import { useStores } from "../../models"
import { OrderService } from "../../models/OrderService"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { delay } from "../../utils/delay"
import { OrderServiceCard } from "../components/OrderServiceCard"
import { VehicleCard } from "../components/VehicleCard"
import { $emptyState, $emptyStateImage, $heading, $labelStyle, $listContentContainer, $row, $screenContentContainer, $toggle } from "../styles"

export const OrderServiceScreen: FC<HomeTabScreenProps<"OrderServiceList">> = observer(
  function OrderServiceScreen(_props) {
    const { navigation } = _props
    const { orderServiceStore: {
      fetchOrderServices,
      orderServicesForList,
      favorites,
      orderServices,
      favoritesOnly,
      setProp,
      hasFavorite,
      toggleFavorite,
      editOrderService,
    }, vehicleStore: {
      selectedVehicle,
      dismissSelectedVehicle,
    },
      authenticationStore: {
        isCollaborator
      }
    } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // initially, kick off a background refresh without the refreshing UI
    useEffect(() => {
      ; (async function load() {
        setIsLoading(true)
        await fetchOrderServices(selectedVehicle?.guid)
        setIsLoading(false)
      })()
    }, [selectedVehicle])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([fetchOrderServices(selectedVehicle?.guid), delay(3750)])
      setRefreshing(false)
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <ListView<OrderService>
          contentContainerStyle={$listContentContainer}
          data={orderServicesForList.slice()}
          extraData={favorites.length + orderServices.length}
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
                    ? "demoPodcastListScreen.noFavoritesEmptyState.heading"
                    : undefined
                }
                contentTx={
                  favoritesOnly
                    ? "demoPodcastListScreen.noFavoritesEmptyState.content"
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
              {
                isCollaborator && (
                  <View>
                    <Icon icon="x" style={$iconCloseVehicle} onPress={dismissSelectedVehicle} />
                    <VehicleCard
                      vehicle={selectedVehicle}
                      isFavorite
                      onPressFavorite={() => { }}
                      onPressItem={() => { }}
                    />
                  </View>
                )
              }
              {
                isCollaborator && (
                  <View style={$separator} />
                )
              }
              {isCollaborator && (
                <View style={$row}>
                  <Text preset="heading" tx="demoPodcastListScreen.title" />
                  <Icon
                    icon="addCircleOutline"
                    onPress={() => navigation.navigate("NewOrderService")}
                  />
                </View>
              )}
              {(favoritesOnly || orderServicesForList.length > 0) && (
                <View style={$toggle}>
                  <Toggle
                    value={favoritesOnly}
                    onValueChange={() =>
                      setProp("favoritesOnly", !favoritesOnly)
                    }
                    variant="switch"
                    labelTx="demoPodcastListScreen.onlyFavorites"
                    labelPosition="left"
                    labelStyle={$labelStyle}
                    accessibilityLabel={translate("demoPodcastListScreen.accessibility.switch")}
                  />
                </View>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <OrderServiceCard
              episode={item}
              isFavorite={hasFavorite(item)}
              onPressFavorite={() => toggleFavorite(item)}
              onPressItem={() => {
                editOrderService(item);
                navigation.navigate("OrderServiceDetail");
              }}
            />
          )}
        />
      </Screen>
    )
  },
)

const $iconCloseVehicle: ImageStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  padding: 10,
}

const $separator: ViewStyle = {
  height: spacing.xl,
}