import { firebaseInitialize } from "@/config/firebase"
import "@expo/metro-runtime"
import * as SplashScreen from "expo-splash-screen"
import React from "react"
import App from "./app/app"

SplashScreen.preventAutoHideAsync()

firebaseInitialize()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
