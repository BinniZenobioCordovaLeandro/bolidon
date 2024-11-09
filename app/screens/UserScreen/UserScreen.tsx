import { Button, PhotoGalleryControlled, Screen, Text } from "@/components";
import { TextFieldControlled } from "@/components/TextField/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { userSchema, useStores } from "@/models";
import { AppStackScreenProps } from "@/navigators";
import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";
import { FC } from "react";
import { $screenContainer, $tapButton, $textField, $title } from "../styles";

interface UserScreenProps extends AppStackScreenProps<"User"> {}

export const UserScreen: FC<UserScreenProps> = observer(function UserScreen(_props) {
  const { navigation } = _props

  const {
    authenticationStore: { user, updateUser },
  } = useStores();

  const { handleSubmit, control } = useReactForm(userSchema);

  const onSubmitHandler = async (data: any) => {
    updateUser(data);
    navigation.goBack();
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <Text style={$title} preset="heading" tx="UserScreen.title" />
      <TextFieldControlled
        name="name"
        control={control}
        containerStyle={$textField}
        labelTx="UserScreen.nameFieldLabel"
        placeholderTx="UserScreen.nameFieldPlaceholder"
        defaultValue={user?.name}
      />
      <PhotoGalleryControlled
        name="photos"
        control={control}
      />
      <Button
        tx="UserScreen.submitButton"
        style={$tapButton}
        onPress={handleSubmit(onSubmitHandler)}
      />
    </Screen>
  )
})


