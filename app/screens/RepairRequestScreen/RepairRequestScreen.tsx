import { Button, PhotoGalleryControlled, Screen, Text } from "@/components";
import { TextFieldControlled } from "@/components/TextField/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { AppStackScreenProps } from "@/navigators";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import * as zod from 'zod';
import { $screenContainer, $tapButton, $textField, $title } from "../styles";

const requestServiceSchema = zod.object({
  kilometers: zod.number().min(0, "Kilometers must be at least 0"),
  description: zod.string().min(6, "Description must be at least 6 characters"),
  photos: zod.array(zod.string().min(3, "Photos must be at least 6 characters")),
  termsAndConditions: zod.boolean().refine(value => value === true, { message: "You must accept the terms and conditions" })
});

interface RepairRequestScreenProps extends AppStackScreenProps<"RepairRequest"> { }

export const RepairRequestScreen: FC<RepairRequestScreenProps> = observer(function RepairRequestScreen(_props) {
  const { navigation } = _props

  const { handleSubmit, control } = useReactForm(requestServiceSchema);

  const onSubmitHandler = async () => {
    navigation.navigate("OrderServiceList");
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <Text style={$title} preset="heading" tx="RepairRequestScreen.title" />
      <TextFieldControlled
        name="kilometers"
        control={control}
        containerStyle={$textField}
        labelTx="RepairRequestScreen.kilometersFieldLabel"
        placeholderTx="RepairRequestScreen.kilometersFieldPlaceholder"
      />
      <TextFieldControlled
        name="description"
        control={control}
        containerStyle={$textField}
        multiline
        labelTx="RepairRequestScreen.descriptionFieldLabel"
        placeholderTx="RepairRequestScreen.descriptionFieldPlaceholder"
      />
      <PhotoGalleryControlled
        name="photos"
        control={control}
      />
      <Button
        tx="NewVehicleScreen.submitButton"
        style={$tapButton}
        onPress={handleSubmit(onSubmitHandler)}
      />
    </Screen>
  )
})

