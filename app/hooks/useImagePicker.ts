import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useImagePicker = () => {
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access camera roll is required!');
      return false;
    }
    return true;
  }

  const pickImage = async (): Promise<string[] | null> => {
    const isAllowed = await requestPermission();
    if (!isAllowed) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets.map((asset) => asset.uri);
    }
    return null;
  };

  const pickCamera = async (): Promise<string[] | null> => {
    const isAllowed = await requestPermission();
    if (!isAllowed) return null;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets.map((asset) => asset.uri);
    }
    return null;
  }

  return {
    pickImage,
    pickCamera,
    error,
  };
};

