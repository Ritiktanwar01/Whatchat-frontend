import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import { ObjectId } from 'bson';
import { Message as RealmMessage, ChatFriend } from '../../db/message';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSocket } from '../../utils/SocketProvider';

type ChatUser = {
    name: string;
    profilePicture: string;
    isOnline: boolean;
    email: string;
    mobile: string;
};

type Message = {
    _id: string;
    text: string;
    sender: 'me' | 'them';
    time: string;
};

type ChatRouteProp = RouteProp<{ Chat: { user: ChatUser } }, 'Chat'>;

const ChatScreen = () => {
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const realm = useRealm();
    const { socket } = useSocket();

    const route = useRoute<ChatRouteProp>();
    const { user } = route.params;
    const navigation = useNavigation();

    const allFriends = useQuery(ChatFriend);
    const queriedFriend = useMemo(() => {
        return allFriends.filtered(`email == "${user.email}"`)[0];
    }, [allFriends, user.email]);

    const queriedMessages = queriedFriend?.messages ?? [];

    const mapRealmMessageToUI = (m: RealmMessage): Message => ({
        _id: m._id.toHexString(),
        text: m.text,
        sender: m.sender,
        time: m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    const mappedMessages = useMemo(() => {
        return queriedMessages.map(mapRealmMessageToUI).reverse();
    }, [queriedMessages]);

    // ✅ Update profile picture on screen visit
    useEffect(() => {
        if (!queriedFriend) return;

        realm.write(() => {
            queriedFriend.profilePicture = user.profilePicture;
        });
    }, [queriedFriend, user.profilePicture]);

    // ✅ Handle incoming socket messages
    useEffect(() => {
        if (!socket) return;

        const handleIncoming = (msg: { message: string }) => {
            saveMessageToFriend(msg.message, 'them');
        };

        socket.on('receive_message', handleIncoming);
        return () => {
            socket.off('receive_message', handleIncoming);
        };
    }, [socket]);

    const saveMessageToFriend = (text: string, sender: 'me' | 'them') => {
        realm.write(() => {
            let friendObject = queriedFriend;

            if (!friendObject) {
                friendObject = realm.create('ChatFriend', {
                    _id: new ObjectId(),
                    email: user.email,
                    name: user.name,
                    mobile: user.mobile,
                    last_online: new Date().toISOString(),
                    profilePicture: user.profilePicture,
                    messages: [],
                });
            }

            const newMessage = realm.create('Message', {
                _id: new ObjectId(),
                text,
                sender,
                timestamp: new Date(),
                seen: false,
            });

            friendObject.messages.push(newMessage);
        });
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const text = input.trim();
        saveMessageToFriend(text, 'me');
        socket?.emit('send_message', { to: user.email, message: text });
        setInput('');
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View
            className={`max-w-[70%] px-4 py-2 rounded-lg my-1 ${
                item.sender === 'me' ? 'bg-green-100 self-end' : 'bg-white self-start'
            }`}
        >
            <Text className="text-sm text-black">{item.text}</Text>
            <Text className="text-xs text-gray-500 text-right mt-1">{item.time}</Text>
        </View>
    );

    return (
        <View className="h-[100vh]">
            {/* Header */}
            <View className="flex-row items-center px-1 py-4 bg-white border-b border-gray-200 h-[13vh]">
                <TouchableOpacity
                    className="w-10 h-10 justify-center items-center mr-3"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        className="h-5 w-5"
                        source={require('../../../assets/Icons/back.png')}
                    />
                </TouchableOpacity>
                <Image source={{ uri: user.profilePicture }} className="w-10 h-10 rounded-full mr-3" />
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-black">{user.name}</Text>
                    <Text className="text-xs text-gray-500">
                        {user.isOnline ? 'Online' : 'Last seen recently'}
                    </Text>
                </View>
            </View>

            {/* Chat */}
            <KeyboardAvoidingView className="h-[91vh]" behavior="padding">
                <FlatList
                    className="h-[90%]"
                    ref={flatListRef}
                    data={mappedMessages}
                    keyExtractor={(item) => item._id}
                    renderItem={renderMessage}
                    contentContainerStyle={{ padding: 12 }}
                    keyboardShouldPersistTaps="handled"
                    inverted
                    showsVerticalScrollIndicator={false}
                />

                {/* Input */}
                <View className="flex-row items-center px-4 py-4 bg-white border-t border-gray-200 h-[10vh]">
                    <TextInput
                        className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm text-black"
                        placeholder="Type a message"
                        placeholderTextColor="#888"
                        value={input}
                        onChangeText={setInput}
                    />
                    <TouchableOpacity onPress={sendMessage} className="ml-2">
                        <Image
                            className="h-8 w-8"
                            source={require('../../../assets/Icons/send.png')}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatScreen;
