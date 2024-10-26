import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { translate } from "../i18n"
import { TextStyle, ViewStyle } from "react-native"
import { colors, spacing, typography } from "app/theme"
import { OrderServiceScreen } from "app/screens/OrderServiceScreen/OrderServiceScreen"
import { Icon } from "app/components"

export type CollaboratorTabParamList = {
  OrderServicetList: undefined
}

export type CollaboratorNavigatorParamList = {
  OrderServicetList: undefined
}

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
    >
      <Tab.Screen
        name="OrderServicetList"
        component={OrderServiceScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="podcast" color={focused ? colors.tint : undefined} size={30} />
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
