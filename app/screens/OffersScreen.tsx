import { Card, Screen, Text } from "@/components";
import { AppStackScreenProps } from "@/navigators";
import { spacing } from "@/theme";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import { View, ViewStyle } from "react-native";
import { $screenContainer, $title, $wrap } from "./styles";

const offers = [
  {
    "title": "Lavado de chasis",
    "description": "Lavado de chasis con productos de alta calidad",
    "price": 18,
  },
  {
    "title": "Lavado de motor",
    "description": "Lavado de motor con productos de alta calidad",
    "price": 25,
  },
  {
    "title": "Lavado de llantas",
    "description": "Lavado de llantas con productos de alta calidad",
    "price": 10,
  },
  {
    "title": "Lavado de tapiz",
    "description": "Lavado de tapiz con productos de alta calidad",
    "price": 30,
  },
  {
    "title": "Lavado de carrocería",
    "description": "Lavado de carrocería con productos de alta calidad",
    "price": 15,
  },
  {
    "title": "Lavado de interiores",
    "description": "Lavado de interiores con productos de alta calidad",
    "price": 25,
  },
  {
    "title": "Lavado de vidrios",
    "description": "Lavado de vidrios con productos de alta calidad",
    "price": 10,
  }
]

interface OffersScreenProps extends AppStackScreenProps<"Offers"> { }

export const OffersScreen: FC<OffersScreenProps> = observer(function OffersScreen() {
  return (
    <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$screenContainer}>
      <Text preset="heading" tx="OffersScreen.title" />
      <Text style={$title} preset="default" tx="OffersScreen.description" />

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
