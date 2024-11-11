import { Button, Card, Icon, PhotoGalleryControlled, Screen, Text, Toggle } from "@/components";
import { DatePickerControlled } from "@/components/DatePicker/DatePickerControlled";
import { SelectableControlled } from "@/components/Selectable/SelectableControlled";
import { TextFieldControlled } from "@/components/TextField/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { useStores } from "@/models";
import { Component, componentSchema } from "@/models/Component";
import { orderServiceSchema } from "@/models/OrderService";
import { AppStackScreenProps } from "@/navigators";
import { spacing } from "@/theme";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { FC } from "react";
import { ImageStyle, View, ViewStyle } from "react-native";
import { ComponentItemCard } from "../components/ComponentItemCard";
import { $row, $screenContainer, $textField, $title } from "../styles";

interface NewOrderServiceScreenProps extends AppStackScreenProps<"NewOrderService"> { }

export const NewOrderServiceScreen: FC<NewOrderServiceScreenProps> = observer(function NewOrderServiceScreen(_props) {
  const { navigation } = _props

  const [termsAndConditions, settermsAndConditions] = React.useState(false);
  const { handleSubmit, control } = useReactForm(orderServiceSchema);
  const { handleSubmit: handleSubmitComponent, control: controlComponent, reset: resetComponent } = useReactForm(componentSchema);

  const [components, setComponents] = React.useState<Component[]>([]);

  const { orderServiceStore: {
    createOrderService
  } } = useStores();

  const onSubmitHandler = async (data: any) => {
    console.log("🎁 new order service data", data);
    await createOrderService({
      ...data,
      components,
    });
    navigation.goBack();
  }

  const onSubmitComponentHandler = async (data: any) => {
    console.log("🎁 new component data", data);
    resetComponent();
    // await componentStore.createComponent(data);
    setComponents([...components, data]);
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
        name="description"
        control={control}
        containerStyle={$textField}
        labelTx="NewOrderServiceScreen.subtitleFieldLabel"
        placeholderTx="NewOrderServiceScreen.subtitleFieldPlaceholder"
        multiline
      />
      <View style={$componentGroupContainer}>
        <Text preset="subheading" tx="NewOrderServiceScreen.componentsCardTitle" />
        <Text preset="default" tx="NewOrderServiceScreen.componentsCardDescription" />
        <View style={$headerSeparator} />
        {
          components.map((_component, index) => (
            <View key={index} style={$row}>
              <View style={{ flex: 1 }}>
                <ComponentItemCard component={_component} />
              </View>
              <Icon icon="x" onPress={() => setComponents(components.filter((_, i) => i !== index))} />
            </View>
          ))
        }
        <View style={$headerSeparator} />
        <Card
          heading="NewOrderServiceScreen.addComponentCardTitle"
          ContentComponent={
            <View>
              <TextFieldControlled
                name="component"
                control={controlComponent}
                containerStyle={$textField}
                labelTx="NewOrderServiceScreen.componentFieldLabel"
                placeholderTx="NewOrderServiceScreen.componentFieldPlaceholder"
              />
              <Text preset="default" tx="NewOrderServiceScreen.urgencyLevelFieldLabel" />
              <SelectableControlled
                name="urgency"
                options={["aceptable", "bajo", "medio", "alto"]}
                control={controlComponent}
              />
            </View>
          }
          FooterComponent={
            <View style={$row}>
              <TextFieldControlled
                name="notes"
                control={controlComponent}
                containerStyle={[$textField, { flex: 1, marginRight: spacing.md }]}
                labelTx="NewOrderServiceScreen.notesFieldLabel"
                placeholderTx="NewOrderServiceScreen.notesFieldPlaceholder"
              />
              <Button
                tx="NewOrderServiceScreen.addOtherComponent"
                style={$iconAddComponentField}
                onPress={handleSubmitComponent(onSubmitComponentHandler)}
              />
            </View>
          }
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
