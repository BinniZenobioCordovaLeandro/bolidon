import { Button, Screen, Text, Toggle } from "@/components";
import { TextFieldControlled } from "@/components/TextField/TextFieldControlled";
import { useReactForm } from "@/hooks/useForm";
import { offerSchema, useStores } from "@/models";
import { AppStackScreenProps } from "@/navigators";
import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";
import { FC } from "react";
import { $screenContainer, $tapButton, $textField, $title } from "./styles";

interface NewOfferScreenProps extends AppStackScreenProps<"NewOffer"> {}

export const NewOfferScreen: FC<NewOfferScreenProps> = observer(function NewOfferScreen(_props) {
  const { navigation } = _props;
  const [termsAndConditions, settermsAndConditions] = React.useState(false);

  const {
    offerStore: { createOffer }
  } = useStores();

  const { handleSubmit, control } = useReactForm(offerSchema);

  const onSubmitHandler = async (data: any) => {
    await createOffer(data);
    navigation.navigate("Offers");
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <Text style={$title} preset="heading" tx="NewOfferScreen.title" />
      <TextFieldControlled
        name="title"
        control={control}
        containerStyle={$textField}
        labelTx="NewOfferScreen.titleFieldLabel"
        placeholderTx="NewOfferScreen.titleFieldPlaceholder"
      />
      <TextFieldControlled
        name="description"
        control={control}
        containerStyle={$textField}
        labelTx="NewOfferScreen.descriptionFieldLabel"
        placeholderTx="NewOfferScreen.descriptionFieldPlaceholder"
      />
      <TextFieldControlled
        name="price"
        control={control}
        containerStyle={$textField}
        labelTx="NewOfferScreen.priceFieldLabel"
        placeholderTx="NewOfferScreen.priceFieldPlaceholder"
        keyboardType="numeric"
      />
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
        style={$tapButton}
        tx="NewOfferScreen.submitButton"
        onPress={handleSubmit(onSubmitHandler)}
      />
    </Screen>
  )
})
