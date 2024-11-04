import { Button, Icon, Text } from "@/components";
import { useImagePicker } from "@/hooks/useImagePicker";
import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";
import { Image, ImageStyle, View, ViewStyle } from "react-native";
import { $wrap } from "../../screens/styles";

export interface PhotoGalleryProps {
  value: string[],
  onChangeText: (text: string[]) => void
  containerStyle?: ViewStyle,
}

export const PhotoGallery = observer(function PhotoGallery(props: PhotoGalleryProps) {
  const { value: photos, onChangeText, containerStyle } = props;

  const { pickImage, error } = useImagePicker();

  const onAddPhoto = async () => {
    const assets = await pickImage();
    if (assets) {
      if (!photos) return setPhotos(assets);
      setPhotos([...photos, ...assets]);
    }
  }

  const setPhotos = (photos: string[]) => {
    onChangeText(photos)
  }

  return (
    <View style={[$wrap, containerStyle]}>
      {photos &&
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
        {
          error && <Text>{error}</Text>
        }
        <Button tx="NewVehicleScreen.photosAdd" style={$photoItem} onPress={onAddPhoto} />
      </View>
    </View>
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
