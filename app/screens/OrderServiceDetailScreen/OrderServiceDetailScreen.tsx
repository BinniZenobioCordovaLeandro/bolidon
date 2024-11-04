import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, View } from "react-native"
import { $image, $imageContainer, $root, $row, $screenContainer, $section } from "../styles"

interface OrderServiceDetailScreenProps extends AppStackScreenProps<"OrderServiceDetail"> { }

export const OrderServiceDetailScreen: FC<OrderServiceDetailScreenProps> = observer(function OrderServiceDetailScreen() {
  const { orderServiceStore: {
    selectedOrderService: orderService
  } } = useStores()

  return (
    <Screen style={$root} preset="scroll">
      <View style={$screenContainer}>
        <Text>Realizar a: {orderService?.kilometers} Kilometros</Text>
        <Text>Fecha de orden: {orderService?.pubDate}</Text>
        <View style={$section}>
          <Text preset="heading" text={orderService?.title} />
          <Text preset="default" text={orderService?.description} />
        </View>
        <View style={$section}>
          <Text preset="subheading" text="Componentes para cambio" />
          {
            orderService?.components.map((item, index) => (
              <View key={index} style={$row}>
                <Text>{item.component}</Text>
                <View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: item.priorityLevelColor }} />
              </View>
            ))
          }
        </View>
        <View style={$section}>
          <Text>Evidencia</Text>
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
    </Screen >
  )
})
