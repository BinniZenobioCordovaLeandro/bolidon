import { useVideoPlayer, VideoView } from 'expo-video';
import { observer } from "mobx-react-lite"; // @mst remove-current-line
import * as React from "react";
import { View, ViewStyle } from "react-native";

export interface VideoProps {
  uri: string,
}

export const Video = observer(function Video(_props: VideoProps) {
  const { uri: videoSource } = _props;

  const ref = React.useRef(null);
  const [, setIsPlaying] = React.useState(true);

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  React.useEffect(() => {
    const subscription = player.addListener('playingChange', isPlaying => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View style={$videoContainer}>
      <VideoView
        ref={ref}
        style={$video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
    </View>
  )
})

const $videoContainer: ViewStyle = {
  position: "relative",
  width: 120,
  height: 120,
}

const $video: ViewStyle = {
  marginBottom: 16,
  backgroundColor: "#f0f0f0",
}
