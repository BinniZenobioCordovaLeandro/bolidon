import { Vehicle } from "app/models"
import { observer } from "mobx-react-lite"
import React, { ComponentType, useMemo } from "react"
import {
    AccessibilityProps,
    Image,
    ImageSourcePropType,
    ImageStyle,
    Platform,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from "react-native"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated"
import {
    Button,
    ButtonAccessoryProps,
    Card,
    Icon,
    Text,
} from "../../components"
import { translate } from "../../i18n"
import { colors, spacing } from "../../theme"

const ICON_SIZE = 14

export const VehicleCard = observer(function EpisodeCard({
    vehicle,
    isFavorite,
    onPressFavorite,
    onPressItem,
}: {
    vehicle: Vehicle
    isFavorite: boolean
    onPressFavorite: () => void
    onPressItem: () => void
}) {
    const liked = useSharedValue(isFavorite ? 1 : 0)

    const imageUri = useMemo<ImageSourcePropType>(() => {
        return { uri: vehicle.thumbnail };
    }, [vehicle.thumbnail])

    // Grey heart
    const animatedLikeButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
                },
            ],
            opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        }
    })

    // Pink heart
    const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: liked.value,
                },
            ],
            opacity: liked.value,
        }
    })

    /**
     * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
     * @see https://reactnative.dev/docs/accessibility#accessibilityactions
     */
    const accessibilityHintProps = useMemo(
        () =>
            Platform.select<AccessibilityProps>({
                ios: {
                    accessibilityLabel: vehicle.parsedTitle,
                    accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
                        action: isFavorite ? "unfavorite" : "favorite",
                    }),
                },
                android: {
                    accessibilityLabel: vehicle.parsedTitle,
                    accessibilityActions: [
                        {
                            name: "longpress",
                            label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
                        },
                    ],
                    onAccessibilityAction: ({ nativeEvent }) => {
                        if (nativeEvent.actionName === "longpress") {
                            handlePressFavorite()
                        }
                    },
                },
            }),
        [vehicle, isFavorite],
    )

    const handlePressFavorite = () => {
        onPressFavorite()
        liked.value = withSpring(liked.value ? 0 : 1)
    }

    const handlePressCard = () => {
        onPressItem();
    }

    const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
        () =>
            function ButtonLeftAccessory() {
                return (
                    <View>
                        <Animated.View
                            style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
                        >
                            <Icon
                                icon="heart"
                                size={ICON_SIZE}
                                color={colors.palette.neutral800} // dark grey
                            />
                        </Animated.View>
                        <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
                            <Icon
                                icon="heart"
                                size={ICON_SIZE}
                                color={colors.palette.primary400} // pink
                            />
                        </Animated.View>
                    </View>
                )
            },
        [],
    )

    return (
        <Card
            style={$item}
            verticalAlignment="force-footer-bottom"
            onPress={handlePressCard}
            onLongPress={handlePressFavorite}
            HeadingComponent={
                <View style={$metadata}>
                    <Text
                        style={$metadataText}
                        size="xxs"
                        accessibilityLabel={vehicle.plateAccesibility.accessibilityLabel}
                    >
                        {vehicle.plateAccesibility.textLabel}
                    </Text>
                </View>
            }
            ContentComponent={
                <>
                    <Text>
                        {vehicle.parsedTitle}
                    </Text>
                    <Text>
                        {vehicle.kilometers} km
                    </Text>
                </>
            }
            {...accessibilityHintProps}
            RightComponent={<Image source={imageUri} style={$itemThumbnail} />}
            FooterComponent={
                <Button
                    onPress={handlePressFavorite}
                    onLongPress={handlePressFavorite}
                    style={[$favoriteButton, isFavorite && $unFavoriteButton]}
                    accessibilityLabel={
                        isFavorite
                            ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
                            : translate("demoPodcastListScreen.accessibility.favoriteIcon")
                    }
                    LeftAccessory={ButtonLeftAccessory}
                >
                    <Text
                        size="xxs"
                        accessibilityLabel={vehicle.plateAccesibility.accessibilityLabel}
                        weight="medium"
                        text={
                            isFavorite
                                ? translate("demoPodcastListScreen.unfavoriteButton")
                                : translate("demoPodcastListScreen.favoriteButton")
                        }
                    />
                </Button>
            }
        />
    )
})




const $item: ViewStyle = {
    padding: spacing.md,
    marginTop: spacing.md,
    minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
    height: "100%",
    width: "50%",
    marginTop: spacing.sm,
    borderRadius: 50,
    alignSelf: "flex-start",
}



const $iconContainer: ViewStyle = {
    height: ICON_SIZE,
    width: ICON_SIZE,
    flexDirection: "row",
    marginEnd: spacing.sm,
}

const $metadata: TextStyle = {
    color: colors.textDim,
    marginTop: spacing.xs,
    flexDirection: "row",
}

const $metadataText: TextStyle = {
    color: colors.textDim,
    marginEnd: spacing.md,
    marginBottom: spacing.xs,
}

const $favoriteButton: ViewStyle = {
    borderRadius: 17,
    marginTop: spacing.md,
    justifyContent: "flex-start",
    backgroundColor: colors.palette.neutral300,
    borderColor: colors.palette.neutral300,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxxs,
    paddingBottom: 0,
    minHeight: 32,
    alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
    borderColor: colors.palette.primary100,
    backgroundColor: colors.palette.primary100,
}
