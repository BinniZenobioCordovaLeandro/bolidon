import { Card, Screen, Text } from "@/components";
import { useStores } from "@/models";
import { AppStackScreenProps } from "@/navigators";
import { spacing } from "@/theme";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { $screenContainer, $title, $wrap } from "./styles";


interface OffersScreenProps extends AppStackScreenProps<"Offers"> { }

export const OffersScreen: FC<OffersScreenProps> = observer(function OffersScreen() {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    offerStore: { offers, fetchOffers }
  } = useStores()

  React.useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await fetchOffers()
      setIsLoading(false)
    })()
  }, [])
  

  return (
    <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$screenContainer}>
      <Text preset="heading" tx="OffersScreen.title" />
      <Text style={$title} preset="default" tx="OffersScreen.description" />
      {
        isLoading && (
          <ActivityIndicator />
        )
      }

      <View style={$wrap}>
        {
          offers.map((offer, index) => (
            <Card
              HeadingComponent={
                <Text preset="bold" text={offer.title} />
              }
              ContentComponent={
                <Text preset="default" text={offer.description} />
              }
              FooterComponent={
                <Text preset="default" text={`S/. ${offer.price}`} />
              }
              key={index}
              style={$card}
            />
          ))
        }
      </View>
    </Screen>
  )
})

const $card: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minWidth: "49%",
}
