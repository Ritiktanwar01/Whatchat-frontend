import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfilePicScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // ✅ restrict to images only
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }

        const asset = response.assets?.[0];
        if (asset?.uri) {
          setImageUri(asset.uri);
        }
      }
    );
  };

  const uploadImage = () => {
    if (!imageUri) {
      Alert.alert('No image selected');
      return;
    }

    // 🔥 Replace with your upload logic
    console.log('Uploading image:', imageUri);
    Alert.alert('Image uploaded successfully!');
    navigation.navigate('Home' as never); // ✅ Navigate after upload
  };

  const skipUpload = () => {
    navigation.navigate('Home' as never); // ✅ Skip and go to next screen
  };

  return (
    <View className="flex-1 items-center bg-white pt-20 px-6">
      <Text className="text-2xl font-bold mb-6 text-black text-center">
        Upload Profile Picture
      </Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require('../../../assets/Icons/profile-placeholder.png')
          }
          className="w-36 h-36 rounded-full bg-gray-200 mb-6"
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#A3D993] px-10 py-3 rounded-full mb-4"
        onPress={uploadImage}
      >
        <Text className="text-white font-bold text-base">Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={skipUpload}>
        <Text className="text-sm text-gray-500 underline">Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicScreen;
