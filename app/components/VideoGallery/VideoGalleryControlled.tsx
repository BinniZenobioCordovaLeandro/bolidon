import * as React from "react";
import { useController } from "react-hook-form";
import { Text } from "../Text";
import { VideoGallery } from "./VideoGallery";

export interface VideoGalleryControlledProps {
  name: string;
  control: any;
  rules?: any;
}

export const VideoGalleryControlled = (props: VideoGalleryControlledProps) => {
  const { name, control, rules } = props
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <>
      <VideoGallery
        value={field.value}
        onChangeText={field.onChange}
      />
      <Text preset="error">{fieldState.error ? fieldState.error.message : undefined}</Text>
    </>
  )
}