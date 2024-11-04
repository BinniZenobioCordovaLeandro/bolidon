import * as React from "react";
import { useController } from "react-hook-form";
import { Text } from "../Text";
import { PhotoGallery } from "./PhotoGallery";

export interface PhotoGalleryControlledProps {
  name: string;
  control: any;
  rules?: any;
}

export const PhotoGalleryControlled = (props: PhotoGalleryControlledProps) => {
  const { name, control, rules } = props
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <>
      <PhotoGallery
        value={field.value}
        onChangeText={field.onChange}
      />
      <Text preset="error">{fieldState.error ? fieldState.error.message : undefined}</Text>
    </>
  )
}