import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate("Login" as never);
    }, 2000);
  }, []);
  return (
    <View className='h-full w-full flex justify-center items-center bg-[#1E68D7] gap-4'>
        <Image source={require("../../../assets/chat.png")} className='w-32 h-32' />
        <Text className='text-white text-2xl font-bold'>What's Chat</Text>
    </View>
  )
}

export default SplashScreen