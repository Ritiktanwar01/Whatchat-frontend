import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../utils/MMKVSetup';
import { Refresh_Access_token } from '../../../hooks/Auth';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const isTokenStale = (createdAtStr: string | undefined): boolean => {
    if (!createdAtStr) return true;
    const createdAt = new Date(createdAtStr);
    const now = new Date();
    const ageInMs = now.getTime() - createdAt.getTime();
    return ageInMs > 24 * 60 * 60 * 1000; // 1 day in ms
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const handleAuthFlow = async () => {
      const auth = storage.getString('auth');
      const parsed = typeof auth === 'string' ? JSON.parse(auth) : null;

      if (parsed?.access_token_created_at && isTokenStale(parsed.access_token_created_at)) {
        const refreshed = await Refresh_Access_token();
        if (!refreshed) {
          navigation.navigate('email' as never);
          return;
        }
      }

      if (parsed?.loginState) {
        if (parsed.mobile && parsed.mobile.length === 10) {
          navigation.navigate('Home' as never);
        } else {
          navigation.navigate('Login' as never);
        }
      } else {
        navigation.navigate('email' as never);
      }
    };

    const timeout = setTimeout(() => {
      handleAuthFlow();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="h-full w-full flex justify-center items-center bg-white">
      <Animated.Text
        style={{ opacity: fadeAnim }}
        className="text-[48px] font-bold text-[#A3D993] tracking-wider"
      >
        zappchat
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
