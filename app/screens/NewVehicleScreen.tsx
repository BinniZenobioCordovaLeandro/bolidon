import { Button, Icon, Screen, Text } from "@/components";
import { TextFieldControlled } from "@/components/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useStores, vehicleSchema } from "@/models";
import { AppStackScreenProps } from "@/navigators";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import { Image, ImageStyle, View } from "react-native";
import { $container, $tapButton, $textField, $title, $wrap } from "./styles";

interface NewVehicleScreenProps extends AppStackScreenProps<"NewVehicle"> { }

export const NewVehicleScreen: FC<NewVehicleScreenProps> = observer(function NewVehicleScreen(_props) {
  const { navigation } = _props

  const { handleSubmit, control } = useReactForm(vehicleSchema);
  const { pickImage, error } = useImagePicker();

  const {
    vehicleStore: { registerVehicle }
  } = useStores();

  const [photos, setPhotos] = React.useState<string[]>([]);

  const onSubmitHandler = async (data: any) => {
    console.log("🎁 new vehicle data", data);
    await registerVehicle({
      ...data,
      photos,
    });
    navigation.navigate("OrderServiceList");
  }

  const onAddPhoto = async () => {
    const assets = await pickImage();
    if (assets) {
      setPhotos([...photos, ...assets]);
    }
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
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
      {
        error && <Text>{error}</Text>
      }
      <View style={$wrap}>
        {
          photos.map((item) => (
            <View key={item}>
              <Icon icon="x" style={$photoItemDelete} onPress={() => setPhotos(photos.filter((photo) => photo !== item))} />
              <Image
                style={$photoItem}
                source={{ uri: item }}
              />
            </View>
          ))
        }
        <View>
          <Button tx="NewVehicleScreen.photosAdd" style={$photoItem} onPress={onAddPhoto} />
        </View>
      </View>
      <Button
        tx="NewVehicleScreen.submitButton"
        style={$tapButton}
        onPress={handleSubmit(onSubmitHandler)}
      />
    </Screen>
  )
})

const $photoItem: ImageStyle = {
  width: 120,
  height: 120,
  marginBottom: 16,
  backgroundColor: "#f0f0f0",
}

const $photoItemDelete: ImageStyle = {
  position: "absolute",
  alignSelf: "center",
  zIndex: 1,
}
