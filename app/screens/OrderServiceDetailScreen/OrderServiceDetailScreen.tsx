import { translate } from "@/i18n"
import { Button, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, View } from "react-native"
import { ComponentItemCard } from "../components/ComponentItemCard"
import { $image, $imageContainer, $screenContainer, $section } from "../styles"

interface OrderServiceDetailScreenProps extends AppStackScreenProps<"OrderServiceDetail"> { }

export const OrderServiceDetailScreen: FC<OrderServiceDetailScreenProps> = observer(function OrderServiceDetailScreen() {
  const { orderServiceStore: {
    selectedOrderService: orderService
  } } = useStores()

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$screenContainer}>
      <View>
        <Text preset="heading" >
          {translate("OrderServiceDetailScreen.kilometers", { kilometers: orderService?.kilometers })}
        </Text>
        <Text>
          {
            translate("OrderServiceDetailScreen.estimatedDueDate", {
              date: orderService?.formattedEstimatedDueDate.textLabel,
            })
          }
        </Text>
        <View style={$section}>
          <Text preset="heading" text={orderService?.title} />
          <Text preset="default" text={orderService?.description} />
        </View>
        <View style={$section}>
          <Text preset="heading" tx="OrderServiceDetailScreen.components" />
          {
            orderService?.components.map((item, index) => (
              <ComponentItemCard key={index} component={item} />
            ))
          }
        </View>
        <View style={$section}>
          <Text preset="heading" tx="OrderServiceDetailScreen.photos" />
          <View style={$imageContainer}>
            {
              orderService?.photos.map((item, index) => (
                <View key={index} style={$image}>
                  <Image source={{ uri: item }} style={$image} />
                </View>
              ))
            }
          </View>
        </View>
      </View>
        <Button
          tx="OrderServiceDetailScreen.submitButton"
          onPress={() => {
            console.log("Submit order service")
          }}
        />
    </Screen >
  )
})
