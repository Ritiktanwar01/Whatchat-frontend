import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../../Screens/Chat/Chat';
import chatPage from '../../Screens/chatPage/chatPage';

const ChatNav = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}
export default ChatNav