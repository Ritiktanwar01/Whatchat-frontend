import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import FriendListComponent from '../../../Components/FriendListComp/FriendListComp'

const FriendLIst = () => {
  return (
    <View>
      <View className='w-full h-[18vh] bg-[#1E68D7] items-center flex-row px-6 justify-between'>
        <Text className='text-white font-bold text-2xl space-x-1'>What's Chat</Text>
      </View>
      <ScrollView>
        <FriendListComponent />
      </ScrollView>
    </View>
  )
}

export default FriendLIst