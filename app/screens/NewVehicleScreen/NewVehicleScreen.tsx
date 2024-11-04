import { Button, PhotoGallery, Screen, Text } from "@/components";
import { TextFieldControlled } from "@/components/TextField/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { useStores, vehicleSchema } from "@/models";
import { AppStackScreenProps } from "@/navigators";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import { $screenContainer, $tapButton, $textField, $title } from "../styles";

interface NewVehicleScreenProps extends AppStackScreenProps<"NewVehicle"> { }

export const NewVehicleScreen: FC<NewVehicleScreenProps> = observer(function NewVehicleScreen(_props) {
  const { navigation } = _props

  const { handleSubmit, control } = useReactForm(vehicleSchema);

  const {
    vehicleStore: { createVehicle: registerVehicle }
  } = useStores();

  const [photos, setPhotos] = React.useState<string[]>([]);

  const onSubmitHandler = async (data: any) => {
    await registerVehicle({
      ...data,
      photos,
    });
    navigation.navigate("OrderServiceList");
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <Text style={$title} preset="heading" tx="NewVehicleScreen.title" />
      <TextFieldControlled
        name="plate"
        control={control}
        containerStyle={$textField}
        labelTx="NewVehicleScreen.plateFieldLabel"
        placeholderTx="NewVehicleScreen.plateFieldPlaceholder"
      />
      <TextFieldControlled
        name="brand"
        control={control}
        containerStyle={$textField}
        labelTx="NewVehicleScreen.brandFieldLabel"
        placeholderTx="NewVehicleScreen.brandFieldPlaceholder"
      />
      <TextFieldControlled
        name="model"
        control={control}
        containerStyle={$textField}
        labelTx="NewVehicleScreen.modelFieldLabel"
        placeholderTx="NewVehicleScreen.modelFieldPlaceholder"
      />
      <TextFieldControlled
        name="year"
        control={control}
        containerStyle={$textField}
        keyboardType="number-pad"
        labelTx="NewVehicleScreen.yearFieldLabel"
        placeholderTx="NewVehicleScreen.yearFieldPlaceholder"
      />
      <TextFieldControlled
        name="color"
        control={control}
        containerStyle={$textField}
        labelTx="NewVehicleScreen.colorFieldLabel"
        placeholderTx="NewVehicleScreen.colorFieldPlaceholder"
      />
      <TextFieldControlled
        name="kilometers"
        control={control}
        containerStyle={$textField}
        keyboardType="number-pad"
        labelTx="NewVehicleScreen.kilometersFieldLabel"
        placeholderTx="NewVehicleScreen.kilometersFieldPlaceholder"
      />
      <TextFieldControlled
        name="engine"
        control={control}
        containerStyle={$textField}
        labelTx="NewVehicleScreen.engineFieldLabel"
        placeholderTx="NewVehicleScreen.engineFieldPlaceholder"
      />
      <TextFieldControlled
        name="transmission"
        control={control}
        containerStyle={$textField}
        labelTx="NewVehicleScreen.transmissionFieldLabel"
        placeholderTx="NewVehicleScreen.transmissionFieldPlaceholder"
      />
      <Text preset="subheading" tx="NewVehicleScreen.photosTitle" />
      <PhotoGallery
        value={photos}
        onChangeText={setPhotos}
      />
      <Button
        tx="NewVehicleScreen.submitButton"
        style={$tapButton}
        onPress={handleSubmit(onSubmitHandler)}
      />
    </Screen>
  )
})
