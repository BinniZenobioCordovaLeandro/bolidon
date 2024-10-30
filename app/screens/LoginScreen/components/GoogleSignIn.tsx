import { Button } from "app/components";
import { useStores } from "app/models";
import { spacing } from "app/theme";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { observer } from "mobx-react-lite";
import * as React from "react";
import { ViewStyle } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const GoogleSignIn = observer(function GoogleSignIn() {

  const {
    authenticationStore: { authenticateWithGoogle }
  } = useStores()

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1080449776857-757rbket5frqmjkp04r21f59j0hv48it.apps.googleusercontent.com",
    iosClientId: "1080449776857-igqbhbsrq7kpcpinkaq2o19nd5tonrbf.apps.googleusercontent.com",
    webClientId: "1080449776857-757rbket5frqmjkp04r21f59j0hv48it.apps.googleusercontent.com",
  });

  const prompWithGoogle = async () => {
    console.log("🎸 prompWithGoogle");
    await promptAsync();
    console.log("🎸 response", response);
    if (response?.type === "success" && response?.authentication?.accessToken)
      authenticateWithGoogle(response.authentication.accessToken);
    else
      return null;
  };

  return (
    <>
      <Button
        testID="login-google-button"
        tx="loginScreen.tapToLogInWithGoogle"
        style={$tapButtonGoogle}
        preset="reversed"
        onPress={() => prompWithGoogle()}
      />
    </>
  )
})

const $tapButtonGoogle: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#DB4437",
}
