import { Button, PhotoGalleryControlled, Screen, Text, Toggle } from "@/components";
import { DatePickerControlled } from "@/components/DatePicker/DatePickerControlled";
import { SelectableControlled } from "@/components/Selectable/SelectableControlled";
import { TextFieldControlled } from "@/components/TextField/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { useStores } from "@/models";
import { orderServiceSchema } from "@/models/OrderService";
import { AppStackScreenProps } from "@/navigators";
import { spacing } from "@/theme";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import { ImageStyle, View, ViewStyle } from "react-native";
import { $screenContainer, $textField, $title } from "../styles";

interface NewOrderServiceScreenProps extends AppStackScreenProps<"NewOrderService"> { }

export const NewOrderServiceScreen: FC<NewOrderServiceScreenProps> = observer(function NewOrderServiceScreen(_props) {
  const { navigation } = _props

  const [termsAndConditions, settermsAndConditions] = React.useState(false);
  const { handleSubmit, control } = useReactForm(orderServiceSchema);
  useStores()

  const onSubmitHandler = async (data: any) => {
    console.log("🎁 new order service data", data);
    // await orderServiceStore.createOrderService(data);
    navigation.goBack();
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$screenContainer}>
      <Text style={$title} preset="heading" tx="NewOrderServiceScreen.title" />
      <TextFieldControlled
        name="kilometers"
        control={control}
        containerStyle={$textField}
        labelTx="NewOrderServiceScreen.kilometersFieldLabel"
        placeholderTx="NewOrderServiceScreen.kilometersFieldPlaceholder"
      />
      <View style={$headerSeparator} />
      <TextFieldControlled
        name="title"
        control={control}
        containerStyle={$textField}
        labelTx="NewOrderServiceScreen.titleFieldLabel"
        placeholderTx="NewOrderServiceScreen.titleFieldPlaceholder"
      />
      <TextFieldControlled
        name="subtitle"
        control={control}
        containerStyle={$textField}
        labelTx="NewOrderServiceScreen.subtitleFieldLabel"
        placeholderTx="NewOrderServiceScreen.subtitleFieldPlaceholder"
      />
      <View style={$componentGroupContainer}>
        <Text preset="subheading" tx="NewOrderServiceScreen.componentsCardTitle" />
        <Text preset="default" tx="NewOrderServiceScreen.componentsCardDescription" />
        <View style={$headerSeparator} />
        <TextFieldControlled
          name="components"
          control={control}
          containerStyle={$textField}
          labelTx="NewOrderServiceScreen.componentFieldLabel"
          placeholderTx="NewOrderServiceScreen.componentFieldPlaceholder"
        />
        <Text preset="default" tx="NewOrderServiceScreen.urgencyLevelFieldLabel" />
        <SelectableControlled
          options={["aceptable", "bajo", "medio", "alto"]}
          name="urgencyLevel"
          control={control}
        />
        <Button
          tx="NewOrderServiceScreen.addOtherComponent"
          style={$iconAddComponentField}
          onPress={() => {
            console.log("🎁 add other component");            
          }}
        />
      </View>
      <PhotoGalleryControlled
        name="photos"
        control={control}
      />
      <TextFieldControlled
        name="price"
        control={control}
        containerStyle={$textField}
        keyboardType="numeric"
        labelTx="NewOrderServiceScreen.priceFieldLabel"
        placeholderTx="NewOrderServiceScreen.priceFieldPlaceholder"
      />
      <Text preset="default" tx="NewOrderServiceScreen.estimatedDueDateFieldLabel" />
      <DatePickerControlled
        name="estimatedDueDate"
        control={control}
        containerStyle={$textField}
      />
      <View style={$headerSeparator} />
      <Toggle
        value={termsAndConditions}
        onValueChange={settermsAndConditions}
        labelTx="NewOrderServiceScreen.termsAndConditions"
        labelPosition="left"
        variant="switch"
        containerStyle={$textField}
      />
      <Button
        disabled={!termsAndConditions}
        tx="NewOrderServiceScreen.submitButton"
        onPress={handleSubmit(onSubmitHandler)}
      />
    </Screen>
  )
})

const $headerSeparator: ViewStyle = {
  marginVertical: spacing.sm,
}

const $iconAddComponentField: ImageStyle = {
  alignSelf: "flex-end",
  marginBottom: spacing.md,
}

const $componentGroupContainer: ViewStyle = {
  marginVertical: spacing.md,
}
