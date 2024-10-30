import { Button } from "app/components";
import { spacing } from "app/theme";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from 'expo-web-browser';
import { observer } from "mobx-react-lite";
import * as React from "react";
import { ViewStyle } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const FacebookSignIn = observer(function FacebookSignIn() {

  const [, response, promptAsync] = Facebook.useAuthRequest({
    androidClientId: "AIzaSyDiBS0WaT82KYa5uqjBRru4p0vZ2iXxA9k",
    iosClientId: "AIzaSyBgfUeP_I2SqK8Fo7sI5A-PChcgI2L1LtM",
    webClientId: "AIzaSyCLz3T1RBCnH6Eo9PxxcmqS0qpkoWOspwQ",
  });

  const prompWithFacebook = async () => {
    console.log("🎸 prompWithFacebook");
    await promptAsync();
    console.log("🎸 response", response);
    if (response?.type === "success")
      return response?.authentication?.accessToken;
    else
      return null;
  };

  return (
    <>
      <Button
        testID="login-facebook-button"
        tx="loginScreen.tapToLogInWithFacebook"
        style={$tapButtonFacebook}
        preset="reversed"
        onPress={() => prompWithFacebook()}
      />
    </>
  )
})

const $tapButtonFacebook: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#4267B2",
}