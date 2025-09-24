import { View, Text,Image,TextInput,TouchableOpacity } from 'react-native'
import ChatImage from "../../../assets/chat.png"
import React from 'react'
import { useNavigation } from '@react-navigation/native'


type NavigationProp = {
  navigate: (screen: string) => void;
};

const Signup = () => {
    const navigation = useNavigation<NavigationProp>();
  return (
    <View className='h-full w-full flex items-center bg-[#1E68D7] gap-8'>
      <View className='pt-8 h-[100%] w-full items-center gap-6 mt-[30%]'>
        <Text className='text-white text-4xl font-bold'>Signup</Text>
        <View className='w-[95%] h-[12%]'>
            <Text className='text-white text-lg font-semibold h-[40%] ml-2'>Email</Text>
            <TextInput className='h-[60%] rounded-2xl bg-[#3362A9] text-white px-4 text-xl' keyboardType="email-address"/>
        </View>
        <View className='w-[95%] h-[12%]'>
            <Text className='text-white text-lg font-semibold h-[40%] ml-2'>Password</Text>
            <TextInput className='h-[60%] rounded-2xl bg-[#3362A9] text-white px-4 text-xl' keyboardType='visible-password'/>
        </View>
        <View className='w-[95%] h-[12%]'>
            <Text className='text-white text-lg font-semibold h-[40%] ml-2'>Confirm password</Text>
            <TextInput className='h-[60%] rounded-2xl bg-[#3362A9] text-white px-4 text-xl' keyboardType='visible-password'/>
        </View>
        <View className='w-[95%] h-[8%] mt-4'>
            <TouchableOpacity className='bg-white h-full rounded-2xl flex justify-center items-center'>
                <Text className='text-[#1E68D7] font-bold text-xl'>Signup</Text>
            </TouchableOpacity>
        </View>
        <View className='w-[90%] h-[9%] mt-4'>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} className='h-full rounded-2xl flex justify-center items-end'>
                <Text className='text-white font-bold text-sm'>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Signup