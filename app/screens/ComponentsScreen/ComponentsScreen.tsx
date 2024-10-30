import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
import React, { FC, ReactElement, useEffect } from "react"
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  SectionList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { ListItem, Screen, Text } from "../../components"
import { TxKeyPath, isRTL } from "../../i18n"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { spacing } from "../../theme"

const reactNativeLiveLogo = require("../../../assets/images/demo/rnl-logo.png")

export interface Demo {
  name: string
  description: TxKeyPath
  data: ReactElement[]
}

export const ComponentsScreen: FC<HomeTabScreenProps<"Components">> = function ComponentsScreen(
  _props,
) {
  const listRef = React.useRef<SectionList>(null)

  const { componentStore } = useStores()

  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await componentStore.fetchComponents()
      setIsLoading(false)
    })()
  }, [componentStore])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([componentStore.fetchComponents(), delay(3750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <SectionList
        ref={listRef}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        contentContainerStyle={$sectionListContentContainer}
        stickySectionHeadersEnabled={false}
        sections={[
          {
            name: new Date().toLocaleDateString(),
            description: "Proximos cambios",
            subtitle: `Estamos a menos de 500 km para realizar estos ${componentStore.components.length} cambios`,
            data: [...componentStore.components],
          },
        ]}
        renderItem={({ item }) => {
          return (
            <ListItem
              text={item.parsedServiceComponent}
              bottomSeparator
              rightIcon={isRTL ? "caretLeft" : "caretRight"}
              LeftComponent={
                <View style={$logoContainer}>
                  <Image source={reactNativeLiveLogo} style={$logo} />
                </View>
              }
              onPress={() => openLinkInBrowser("")}
            />
          )
        }}
        renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="ComponentsScreen.jumpStart" />
          </View>
        }
        renderSectionHeader={({ section }) => {
          return (
            <View>
              <Text preset="heading" style={$demoItemName}>
                {section.name}
              </Text>
              <Text style={$demoItemTitle}>{section.description}</Text>
              <Text style={$demoItemSubtitle}>{section.subtitle}</Text>
            </View>
          )
        }}
        ListEmptyComponent={isLoading ? <ActivityIndicator /> : null}
      />
    </Screen>
  )
}

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

const $logoContainer: ViewStyle = {
  marginEnd: spacing.md,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
  alignSelf: "stretch",
}

const $screenContainer: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.xxxl,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.md,
}

const $demoItemTitle: TextStyle = {
  fontWeight: "bold",
}

const $demoItemSubtitle: TextStyle = {
  marginBottom: spacing.xxl,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.xxl,
}
