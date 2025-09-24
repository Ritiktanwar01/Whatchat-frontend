import { View, Text, Image, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react'

const FriendListComponent = () => {
  const [requestsent, setRequestsent] = React.useState(false)
  return (
    <View className='w-[100%] h-[12vh] flex-row items-center px-4 border-gray-400 border-t-[0.5px]'>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80' }} className='w-[60px] h-[60px] rounded-full mr-[10%]' />
      <Text className='text-2xl font-medium'>Laura</Text>
      <View className='flex-row ml-auto'>
        <TouchableOpacity>
          <Feather name='check' size={30} color='green' className='ml-auto' onPress={() => setRequestsent(false)} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name='cross' size={30} color='red' className='ml-4' onPress={() => setRequestsent(true)} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FriendListComponent