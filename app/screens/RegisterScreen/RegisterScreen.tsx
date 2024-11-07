import { useStores } from "app/models";
import { AppStackScreenProps } from "app/navigators";
import { Auth } from "app/services/api";
import { colors, spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { ComponentType, FC, useMemo, useRef, useState } from "react";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components";

interface RegisterScreenProps extends AppStackScreenProps<"Register"> { }

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
    const { navigation } = _props

    const authPasswordInput = useRef<TextInput>(null)
    const confirmAuthPasswordInput = useRef<TextInput>(null)

    const [authPassword, setAuthPassword] = useState("")
    const [confirmAuthPassword, setConfirmAuthPassword] = useState("")
    const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const {
        authenticationStore: { authEmail, setAuthEmail, validationError },
    } = useStores()

    const error = isSubmitted ? validationError : ""

    const submit = async () => {
        setIsSubmitted(true)
        if (authPassword !== confirmAuthPassword) return null;
        const created = await Auth.registerCredential(authEmail, authPassword);
        if (created) navigation.navigate("Login")
    }

    const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
        () =>
            function PasswordRightAccessory(props: TextFieldAccessoryProps) {
                return (
                    <Icon
                        icon={isAuthPasswordHidden ? "view" : "hidden"}
                        color={colors.palette.neutral800}
                        containerStyle={props.style}
                        size={20}
                        onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
                    />
                )
            },
        [isAuthPasswordHidden],
    )

    return (
        <Screen preset="auto"
            contentContainerStyle={$screenContentContainer}
            safeAreaEdges={["top", "bottom"]}>
            <Text testID="register-heading" tx="registerScreen.register" preset="heading" style={$logIn} />
            <Text tx="registerScreen.enterDetails" preset="subheading" style={$enterDetails} />

            <TextField
                value={authEmail}
                onChangeText={setAuthEmail}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                labelTx="registerScreen.emailFieldLabel"
                placeholderTx="registerScreen.emailFieldPlaceholder"
                helper={error}
                status={error ? "error" : undefined}
                onSubmitEditing={() => authPasswordInput.current?.focus()}
            />

            <TextField
                ref={authPasswordInput}
                value={authPassword}
                onChangeText={setAuthPassword}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isAuthPasswordHidden}
                labelTx="registerScreen.passwordFieldLabel"
                placeholderTx="registerScreen.passwordFieldPlaceholder"
                onSubmitEditing={() => confirmAuthPasswordInput.current?.focus()}
                RightAccessory={PasswordRightAccessory}
            />

            <TextField
                ref={confirmAuthPasswordInput}
                value={confirmAuthPassword}
                onChangeText={setConfirmAuthPassword}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isAuthPasswordHidden}
                labelTx="registerScreen.confirmPasswordFieldLabel"
                placeholderTx="registerScreen.confirmPasswordFieldPlaceholder"
                onSubmitEditing={submit}
                RightAccessory={PasswordRightAccessory}
            />

            <Button
                testID="register-button"
                tx="registerScreen.tapToRegister"
                style={$tapButton}
                preset="reversed"
                onPress={submit}
            />

        </Screen>
    )
});

const $screenContentContainer: ViewStyle = {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
}

const $logIn: TextStyle = {
    marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
    marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
    marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
    marginBottom: spacing.lg,
}
