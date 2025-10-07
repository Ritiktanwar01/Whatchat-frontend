import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type ChatUser = {
    name: string;
    avatar: any;
    isOnline: boolean;
};

type Message = {
    id: string;
    text: string;
    sender: 'me' | 'them';
    time: string;
};

type ChatRouteProp = RouteProp<{ Chat: { user: ChatUser } }, 'Chat'>;

const ChatScreen = () => {
    const route = useRoute<ChatRouteProp>();
    const { user } = route.params;
    const navigation = useNavigation();
    const flatListRef = useRef<FlatList>(null);

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hey there!', sender: 'them', time: '3:40 PM' },
        { id: '2', text: 'Hi! How are you?', sender: 'me', time: '3:41 PM' },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: input,
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [newMessage, ...prev]); // prepend for inverted list
            setInput('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View
            className={`max-w-[70%] px-4 py-2 rounded-lg my-1 ${item.sender === 'me' ? 'bg-green-100 self-end' : 'bg-white self-start'
                }`}
        >
            <Text className="text-sm text-black">{item.text}</Text>
            <Text className="text-xs text-gray-500 text-right mt-1">{item.time}</Text>
        </View>
    );

    return (
        <View
            className='h-[100vh]'
        >
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
                <Image source={user.avatar} className="w-10 h-10 rounded-full mr-3" />
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-black">{user.name}</Text>
                    <Text className="text-xs text-gray-500">
                        {user.isOnline ? 'Online' : 'Last seen recently'}
                    </Text>
                </View>
            </View>
            <KeyboardAvoidingView className='h-[91vh]' behavior={'padding'}>
                {/* Messages */}
                <FlatList
                className='h-[90%]'
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={{ padding: 12 }}
                    keyboardShouldPersistTaps="handled"
                    inverted={true}
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
