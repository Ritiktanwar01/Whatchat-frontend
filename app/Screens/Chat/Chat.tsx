import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

// 👇 Extend ChatFriend with isOnline
type ExtendedChatFriend = ChatFriend & {
  isOnline?: boolean;
};

const Chat: React.FC = () => {
  const navigation = useNavigation();
  const [text, setText] = useState<string>('');
  const allFriends = useQuery(ChatFriend);
  const realm = useRealm();
  const { socket } = useSocket();

  const [friendlist, setFriendlist] = useState<ExtendedChatFriend[]>(
    Array.from(allFriends).map(f => ({ ...(f as unknown as ChatFriend), isOnline: false }))
  );

  const friendsWithMessages = useMemo(() => {
    return friendlist.filter(f => f.messages.length > 0);
  }, [friendlist]);

  useEffect(() => {
    requestContactsPermission();

    if (!socket) return;

    // 📨 Handle incoming messages
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

    // 🟢 Initial presence sync
    const friendEmails = allFriends.map(f => f.email);
    socket.emit('get_active_friends', { friendEmails });

    socket.on('active_friends_list', ({ active }: { active: string[] }) => {
      console.log('✅ Active friends on load:', active);

      setFriendlist(prev =>
        prev.map(friend => 
          Object.assign({}, friend, { isOnline: active.includes(friend.email) })
        )
      );
    });

    socket.on('friend_online', ({ email }: { email: string }) => {
      console.log(`🟢 Friend online: ${email}`);
      setFriendlist(prev =>
        prev.map(friend => 
          friend.email === email ? Object.assign({}, friend, { isOnline: true }) : friend
        )
      );
    });

    socket.on('friend_offline', ({ email }: { email: string }) => {
      console.log(`🔴 Friend offline: ${email}`);
      setFriendlist(prev =>
        prev.map(friend =>
          friend.email === email ? Object.assign(friend, { isOnline: false }) : friend
        )
      );
    });

    return () => {
      socket.off('receive_message', handleIncoming);
      socket.off('active_friends_list');
      socket.off('friend_online');
      socket.off('friend_offline');
    };
  }, [socket, realm, allFriends]);

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
