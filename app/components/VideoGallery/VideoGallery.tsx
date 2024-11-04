import { Button, Icon, Text, Video } from "@/components";
import { useImagePicker } from "@/hooks/useImagePicker";
import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";
import { ImageStyle, View, ViewStyle } from "react-native";
import { $wrap } from "../../screens/styles";

export interface VideoGalleryProps {
  value: string[],
  onChangeText: (text: string[]) => void
  containerStyle?: ViewStyle,
}

export const VideoGallery = observer(function VideoGallery(props: VideoGalleryProps) {
  const { value: videos, onChangeText, containerStyle } = props;

  const { pickVideo, error } = useImagePicker();

  const onAddVideo = async () => {
    const assets = await pickVideo();
    if (assets) {
      if (!videos) return setVideos(assets);
      setVideos([...videos, ...assets]);
    }
  }

  const setVideos = (photos: string[]) => {
    onChangeText(photos)
  }

  return (
    <View style={[$wrap, containerStyle]}>
      {videos &&
        videos.map((item) => (
          <View key={item}>
            <Icon icon="x" style={$videoItemDelete} onPress={() => setVideos(videos.filter((photo) => photo !== item))} />
            <Video
              source={{ uri: item }}
              style={$videoItem}
              resizeMode="cover"
              controls
            />
          </View>
        ))
      }
      <View>
        {
          error && <Text>{error}</Text>
        }
        <Button tx="VideoGalleryComponent.addVideo" style={$videoItem} onPress={onAddVideo} />
      </View>
    </View>
  )
})

const $videoItem: ImageStyle = {
  width: 120,
  height: 120,
  marginBottom: 16,
  backgroundColor: "#f0f0f0",
}

const $videoItemDelete: ImageStyle = {
  position: "absolute",
  alignSelf: "center",
  zIndex: 1,
}
