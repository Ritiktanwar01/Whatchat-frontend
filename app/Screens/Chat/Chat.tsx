import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import ChatComponent from '../../../Components/Chat/Chat';
import { ChatFriend } from '../../db/message';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from '@realm/react';
import { useSocket } from '../../utils/SocketProvider';
import { saveMessageToFriend } from '../../utils/realmHelpers';
import {
  findLocalNameForContact,
  requestContactsPermission,
} from '../../../hooks/GetName';

const Chat = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const allFriends = useQuery(ChatFriend);
  const realm = useRealm();
  const { socket } = useSocket();

  const friendsWithMessages = useMemo(() => {
    return allFriends.filtered('messages.@size > 0');
  }, [allFriends]);

  useEffect(() => {
    requestContactsPermission();

    if (!socket) return;

    const handleIncoming = async (data: {
      from: any;
      message: string;
      timestamp?: number;
    }) => {
      const name = await findLocalNameForContact(data.from);
      const fallbackName = name ?? data.from.mobile ?? 'Unknown';
    
      saveMessageToFriend(
        realm,
        {
          ...data.from,
          name: fallbackName,
        },
        data.message,
        'them',
        data.timestamp
      );
    };
    
    socket.on('receive_message', handleIncoming);

    return () => {
      socket.off('receive_message', handleIncoming);
    };
  }, [socket, realm]);

  return (
    <View className="h-full w-full">
      <View className="pt-12 pl-6 flex-row justify-between items-center pr-4 h-[15vh]">
        <Text className="text-[#A3D993] font-bold text-3xl">ZappChat</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePic' as never)}>
          <Image
            className="w-8 h-8"
            source={require('../../../assets/Icons/dots.png')}
          />
        </TouchableOpacity>
      </View>

      <View className="h-[10vh] w-full">
        <View className="flex-row items-center bg-gray-200 rounded-full px-4 py-2 mx-4 my-2">
          <Image
            source={require('../../../assets/Icons/search-interface-symbol.png')}
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
        className="absolute h-16 w-16 z-10 bg-[#A3D993] right-6 bottom-10 rounded-full items-center justify-center"
      >
        <Image
          className="h-8 w-8"
          source={require('../../../assets/Icons/plus.png')}
        />
      </TouchableOpacity>

      <ScrollView className="h-[85vh] w-full">
        {friendsWithMessages.map((user, i) => (
          <ChatComponent user={user} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Chat;
