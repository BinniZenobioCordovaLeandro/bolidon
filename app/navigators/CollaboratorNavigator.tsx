import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Icon } from "app/components"
import { ProfileScreen, VehiclesScreen } from "app/screens"
import { OrderServiceScreen } from "app/screens/OrderServiceListScreen/OrderServiceListScreen"
import { colors, spacing, typography } from "app/theme"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { translate } from "../i18n"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type CollaboratorTabParamList = {
  Vehicles: undefined
  OrderServiceList: undefined
  Profile: undefined
}

export type CollaboratorTabScreenProps<T extends keyof CollaboratorTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<CollaboratorTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<CollaboratorTabParamList>()

export const CollaboratorNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
      initialRouteName="OrderServiceList"
    >
      <Tab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          tabBarAccessibilityLabel: translate("collaboratorNavigator.vehiclesTab"),
          tabBarLabel: translate("collaboratorNavigator.vehiclesTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="caretLeft" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderServiceList"
        component={OrderServiceScreen}
        options={{
          tabBarAccessibilityLabel: translate("collaboratorNavigator.podcastListTab"),
          tabBarLabel: translate("collaboratorNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="podcast" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarAccessibilityLabel: translate("collaboratorNavigator.profileTab"),
          tabBarLabel: translate("collaboratorNavigator.profileTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="lock" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
