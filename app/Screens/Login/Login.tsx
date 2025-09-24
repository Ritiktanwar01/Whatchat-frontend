import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

type NavigationProp = {
  navigate: (screen: string) => void;
};

const Login = () => {
    const navigation = useNavigation<NavigationProp>();
  return (
    <View className='h-full w-full flex items-center bg-[#1E68D7] gap-8'>
      <View className='h-[20%] w-full flex justify-end items-center'>
        <Image source={require("../../../assets/chat.png")} className='w-24 h-24' />
      </View>
      <View className='pt-8 h-[80%] w-full items-center gap-4'>
        <Text className='text-white text-4xl font-bold'>Login</Text>
        <View className='w-[95%] h-[15%]'>
            <Text className='text-white text-lg font-semibold h-[40%] ml-2'>Email</Text>
            <TextInput className='h-[60%] rounded-2xl bg-[#3362A9] text-white px-4 text-xl' keyboardType="email-address"/>
        </View>
        <View className='w-[95%] h-[15%]'>
            <Text className='text-white text-lg font-semibold h-[40%] ml-2'>Password</Text>
            <TextInput className='h-[60%] rounded-2xl bg-[#3362A9] text-white px-4 text-xl' keyboardType='visible-password'/>
        </View>
        <View className='w-[95%] h-[8%] mt-4'>
            <TouchableOpacity className='bg-white h-full rounded-2xl flex justify-center items-center'>
                <Text className='text-[#1E68D7] font-bold text-xl'>Login</Text>
            </TouchableOpacity>
        </View>
        <View className='w-[90%] h-[10%] mt-4'>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} className='h-full rounded-2xl flex justify-center items-end'>
                <Text className='text-white font-bold text-sm'>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login