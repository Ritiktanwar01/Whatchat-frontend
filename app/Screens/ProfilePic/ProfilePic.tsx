import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { API_BASE_URL } from '../../../hooks/ServerConf';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../utils/MMKVSetup';

const ProfilePicScreen = () => {
  const navigation = useNavigation();
  const [imageAsset, setImageAsset] = useState<Asset | null>(null);

  const checkMediaPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    const result = await PermissionsAndroid.request(permission);
    return result === PermissionsAndroid.RESULTS.GRANTED;
  };

  const pickImage = async () => {
    const hasPermission = await checkMediaPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access images without permission.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
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
          setImageAsset(asset);
        }
      }
    );
  };

  const uploadImage = async () => {
    if (!imageAsset?.uri) {
      Alert.alert('No image selected');
      return;
    }

    const authDataString = storage.getString('auth');
    if (!authDataString) {
      Alert.alert('Missing auth info');
      return;
    }

    const authData = JSON.parse(authDataString);
    const accessToken = authData.access_token;
    const userId = authData.user_id || authData.mobile || '';

    if (!accessToken || !userId) {
      Alert.alert('Invalid auth data');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('image', {
      uri: imageAsset.uri,
      type: imageAsset.type || 'image/jpeg',
      name: imageAsset.fileName || 'upload.jpg',
    });

    try {
      const response = await fetch(`${API_BASE_URL}/updatePic`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`, // ✅ DO NOT set Content-Type manually
        },
      });

      const result = await response.json();
      console.log('Upload response:', result);

      if (response.ok) {
        navigation.navigate('Home' as never);
      } else {
        Alert.alert('Upload failed', result?.message || 'Server error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload failed', 'Network or server error');
    }
  };

  const skipUpload = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <View className="flex-1 items-center bg-white pt-20 px-6">
      <Text className="text-2xl font-bold mb-6 text-black text-center">
        Upload Profile Picture
      </Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            imageAsset?.uri
              ? { uri: imageAsset.uri }
              : { uri: `${API_BASE_URL}/media/uploads/profile/people.png` }
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
