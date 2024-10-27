import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, ImageStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface OrderServiceDetailScreenProps extends AppStackScreenProps<"OrderServiceDetail"> { }

export const OrderServiceDetailScreen: FC<OrderServiceDetailScreenProps> = observer(function OrderServiceDetailScreen() {
  const { orderServiceStore: {
    orderService
  } } = useStores()

  return (
    <Screen style={$root} preset="scroll">
      <View style={$container}>
        <Text>Realizar a: {orderService?.kilometers} Kilometros</Text>
        <Text>Fecha de orden: {orderService?.pubDate}</Text>
        <View style={$section}>
          <Text preset="heading" text={orderService?.title} />
          <Text preset="default" text={orderService?.description} />
        </View>
        <View style={$section}>
          {
            orderService?.components.map((item, index) => (
              <View key={index}>
                <Text>{item.component} {item.urgencyLevel}</Text>
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

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $section: ViewStyle = {
  marginTop: spacing.md,
  marginBottom: spacing.md,
}

const $imageContainer: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'space-between',
}

const $image: ImageStyle = {
  width: 200,
  height: 200,
  marginBottom: spacing.sm,
}
