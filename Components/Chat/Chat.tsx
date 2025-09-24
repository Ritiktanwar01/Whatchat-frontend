import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ChatComponent = () => {
  const navigation = useNavigation<any>()
  const [isOnline, setIsOnline] = React.useState(true)
  const [unseenMessages, setUnseenMessages] = React.useState(3)
  const OnlineComp = ()=>{
    return (
      isOnline && <View className='w-[15px] h-[15px] bg-green-500 rounded-full absolute top-[8vh] left-[16%] border-[3px] border-white' />
    )
  }
  const UnreadMessageComponent = ()=>{
    return (
      unseenMessages > 0 && <View className='w-[25px] h-[25px] bg-red-500 rounded-full absolute top-[5vh] right-[10%] justify-center items-center border-[3px] border-white'>
        <Text className='text-white font-semibold'>{unseenMessages}</Text>
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("chatPage")} className='w-[100%] h-[12vh] flex-row items-center px-4 border-gray-400 border-t-[0.5px]'>
      <Image source={{uri:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}} className='w-[60px] h-[60px] rounded-full mr-[10%]'/>
      <Text className='text-2xl font-medium'>Laura</Text>
      <OnlineComp />
      <UnreadMessageComponent />

    </TouchableOpacity>
  )
}

export default ChatComponent