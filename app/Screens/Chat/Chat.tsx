import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import ChatComponent from '../../../Components/Chat/Chat'



const Chat = () => {
    const [showSearch, setShowSearch] = useState(false)
    return (
        <View>
            <View className='w-full h-[18vh] bg-[#1E68D7] items-center flex-row px-6 justify-between'>
                <Text className='text-white font-bold text-2xl space-x-1'>What's Chat</Text>
                <TouchableOpacity className='w-7 h-7' onPress={() => setShowSearch(!showSearch)}>
                    <Image className='w-full h-full' source={require('../../../assets/Icons/search.png')} />
                </TouchableOpacity>
            </View>
            {
                showSearch ? (
                    <View className='w-full h-[8vh] bg-[#1E68D7] flex-row px-6 justify-center'>
                        <TextInput placeholder='Search' className='w-[90%] h-10 bg-white rounded-md px-4 text-black' />
                    </View>
                ) : <View></View>
            }
            <FlatList
                className='h-[82vh] pb-[10vh] bg-transparent'
                renderItem={() => <ChatComponent />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={[1, 2, 3, 4, 5]}
            />
        </View>
    )
}

export default Chat