/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { colors } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models"
import { CollaboratorNavigator, CollaboratorTabParamList } from "./CollaboratorNavigator"
import { HomeNavigator, HomeTabParamList } from "./HomeNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  Home: NavigatorScreenParams<HomeTabParamList>
  Collaborator: NavigatorScreenParams<CollaboratorTabParamList>
  // 🔥 Your screens go here
  CollaboratorWelcome: undefined
  OrderServiceDetail: undefined
  Vehicles: undefined
  NewVehicle: undefined
  NewOrderService: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const generateOptions = (custom: object) => {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.palette.neutral800,
    },
    headerTintColor: colors.palette.neutral100,
    ...custom,
  }
}

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated, isCollaboratorRole },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          {
            isCollaboratorRole ? (
              <>
                <Stack.Screen name="CollaboratorWelcome" component={Screens.CollaboratorWelcomeScreen} />
                <Stack.Screen name="Collaborator" component={CollaboratorNavigator} />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
                <Stack.Screen name="Home" component={HomeNavigator} />
              </>
            )
          }
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Register" component={Screens.RegisterScreen} options={generateOptions} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      <Stack.Screen name="OrderServiceDetail" component={Screens.OrderServiceDetailScreen} options={generateOptions} />
      <Stack.Screen name="Vehicles" component={Screens.VehiclesScreen} />
      <Stack.Screen name="NewVehicle" component={Screens.NewVehicleScreen} options={generateOptions} />
      <Stack.Screen name="NewOrderService" component={Screens.NewOrderServiceScreen} options={generateOptions} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
