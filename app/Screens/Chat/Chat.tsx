import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useMemo, useState,useEffect } from 'react';
import ChatComponent from '../../../Components/Chat/Chat';
import { ChatFriend } from '../../db/message';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@realm/react';

const Chat = () => {
    const navigation = useNavigation();
    const [text, setText] = useState<string>('');

    const allFriends = useQuery(ChatFriend);

    
    const friendsWithMessages = useMemo(() => {
        return allFriends.filtered('messages.@size > 0');
    }, [allFriends]);

     useEffect(() => {
        // console.log('All users in Realm:', JSON.stringify(allFriends, null, 2));
    }, [allFriends]);

    return (
        <View className='h-full w-full'>
            <View id='header' className='pt-12 pl-6 flex-row justify-between items-center pr-4 h-[15vh]'>
                <Text className='text-[#A3D993] font-bold text-3xl'>ZappChat</Text>
                <TouchableOpacity onPress={() => Alert.alert("coming soon")}>
                    <Image className='w-8 h-8' source={require("../../../assets/Icons/dots.png")} />
                </TouchableOpacity>
            </View>

            <View className='h-[10vh] w-full'>
                <View className="flex-row items-center bg-gray-200 rounded-full px-4 py-2 mx-4 my-2">
                    <Image
                        source={require("../../../assets/Icons/search-interface-symbol.png")}
                        className="w-5 h-5 mr-2 tint-gray-500"
                    />
                    <TextInput
                        className="flex-1 text-base text-black"
                        placeholder="Search"
                        placeholderTextColor="#888"
                        value={text}
                        onChangeText={setText}
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('AddFriends' as never)}
                className='absolute h-16 w-16 z-10 bg-[#A3D993] right-6 bottom-10 rounded-full items-center justify-center'
            >
                <Image className='h-8 w-8' source={require("../../../assets/Icons/plus.png")} />
            </TouchableOpacity>

            <ScrollView className='h-[85vh] w-full'>
                {friendsWithMessages.map((user, i) => (
                    <ChatComponent user={user} key={i} />
                ))}
            </ScrollView>
        </View>
    );
};

export default Chat;
