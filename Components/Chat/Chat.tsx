import { View, Text,Image ,ImageSourcePropType, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../hooks/ServerConf';

export interface ContactCardProps {
  email: string;
  mobile: string;
  name: string;
  profilePicture: string;
}


type ChatItemProps = {
  user: ContactCardProps;
};

const Chat:React.FC<ChatItemProps> = ({user}) => {
  let isOnline = false;
  const navigation = useNavigation();
  const {profilePicture,name} = user
  return (
     <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-200"  onPress={() => navigation.navigate("chatPage" as never,{user})}>
      <View className="relative">
        <Image
          source={{ uri: `${API_BASE_URL}${profilePicture}` }}
          className="w-12 h-12 rounded-full"
        />
        {isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between">
          <Text className="text-base font-semibold text-black">{name}</Text>
          <Text className="text-xs text-gray-500">{"8:00 AM"}</Text>
        </View>
        <Text className="text-sm text-gray-600" numberOfLines={1}>
          {"Hard coded"}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Chat