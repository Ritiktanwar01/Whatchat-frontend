import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../utils/MMKVSetup';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    const auth = storage.getString('auth')
    if (typeof auth === 'string') {
    const parsed = JSON.parse(auth);

    
    if (parsed.loginState){
      if (  parsed.mobile && parsed.mobile.length === 10) {
        setTimeout(() => {
          navigation.navigate('Home' as never)
        }, 2000);
        return;
      }else{
        setTimeout(() => {
        navigation.navigate('Login' as never)
      }, 2000);
      return;
      }
    }else{
      setTimeout(() => {
      navigation.navigate("email" as never);
    }, 2000);
    return;
    }
} else {
  setTimeout(() => {
      navigation.navigate("email" as never);
    }, 2000);
}
  }, []);
  return (
    <View className='h-full w-full flex justify-center items-center bg-[#1E68D7] gap-4'>
        <Image source={require("../../../assets/chat.png")} className='w-32 h-32' />
        <Text className='text-white text-2xl font-bold'>What's Chat</Text>
    </View>
  )
}

export default SplashScreen