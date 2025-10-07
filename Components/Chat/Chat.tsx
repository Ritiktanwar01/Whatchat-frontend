import { View, Text,Image ,ImageSourcePropType, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

type ChatUser = {
  name: string;
  avatar: ImageSourcePropType;
  lastMessage: string;
  time: string;
  isOnline: boolean;
};

type ChatItemProps = {
  user: ChatUser;
};

const Chat:React.FC<ChatItemProps> = ({user}) => {
  const navigation = useNavigation();
  const {avatar,isOnline,name,time,lastMessage} = user
  return (
     <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-200"  onPress={() => navigation.navigate("chatPage", { user })}>
      <View className="relative">
        <Image
          source={avatar}
          className="w-12 h-12 rounded-full"
        />
        {isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between">
          <Text className="text-base font-semibold text-black">{name}</Text>
          <Text className="text-xs text-gray-500">{time}</Text>
        </View>
        <Text className="text-sm text-gray-600" numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Chat