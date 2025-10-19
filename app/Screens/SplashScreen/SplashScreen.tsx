import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../utils/MMKVSetup';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate text
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

    // Navigation logic
    const auth = storage.getString('auth');
    const parsed = typeof auth === 'string' ? JSON.parse(auth) : null;

    const timeout = setTimeout(() => {
      if (parsed?.loginState) {
        if (parsed.mobile && parsed.mobile.length === 10) {
          navigation.navigate('Home' as never);
        } else {
          navigation.navigate('Login' as never);
        }
      } else {
        navigation.navigate('email' as never);
      }
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
