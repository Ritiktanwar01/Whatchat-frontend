import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import MessageIn from '../../../Components/MessageIn/MessageIn'
import MessageOut from '../../../Components/MessageOut/MessageOut'
import { useNavigation } from '@react-navigation/native'
import {io} from "socket.io-client"

const chatPage = () => {
    const navigation = useNavigation<any>()
    return (
        <View className='w-full bg-transparent h-[100vh]'>
            <View className='w-full h-[15vh] bg-[#1E68D7] items-center flex-row px-2 gap-2'>
                <TouchableOpacity className='w-7 h-7 mt-6' onPress={() => navigation.goBack()}>
                    <Image className='w-full h-full' source={require('../../../assets/Icons/back.png')} />
                </TouchableOpacity>
                <View className='h-full justify-center pt-8 w-[70%]'>
                    <View className='flex-row items-center gap-4'>
                        <Image className='w-[45px] h-[45px] rounded-full' source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80' }} />
                        <Text className='text-white font-bold mt-[-1.5rem]'>Laura</Text>
                    </View>
                    <Text className='text-white ml-[22%] mt-[-1.5rem]'>Online</Text>
                </View>
            </View>
            <KeyboardAvoidingView behavior='height' className='w-full h-[90vh] justify-between'>
                <ScrollView className='w-full h-[100%] px-2 bg-green-400'>
                    <MessageIn />
                    <MessageOut />
                    <MessageIn />
                    <MessageOut />
                    <MessageIn />
                    <MessageOut />
                </ScrollView>
                <View className='w-full h-[8vh] bg-white flex-row items-center px-2 gap-2'>
                    <TextInput className='w-[88%] my-[2%] h-[100%] bg-white rounded-full px-4 text-black placeholder:text-black' placeholder='Type a message...' />
                    <TouchableOpacity className='w-10 h-10 bg-[#1E68D7] rounded-full items-center justify-center'>
                        <Image className='w-4 h-4' source={require('../../../assets/Icons/send.png')} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default chatPage