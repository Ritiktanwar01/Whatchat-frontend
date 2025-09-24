import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatNav from '../ChatNav/ChatNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FriendLIst from '../../Screens/FriendLIst/FriendLIst';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import chatPage from '../../Screens/chatPage/chatPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function BotomChat() {
  const TabStack = () => (
    <Tab.Navigator screenOptions={({ route }) => (
      {
        headerShown: false,
        tabBarStyle: { height: 110, width: '100%', paddingTop: 20, justifyContent: 'space-evenly', alignItems: 'center' },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Chats") {
            iconName = focused ? "chatbox-outline" : "chatbox-sharp";
          } else if (route.name === "friends") {
            iconName = focused ? "people-outline" : "people-outline";
          }
          return iconName ? <Ionicons name={iconName} size={30} color={color} /> : null;
        },
        tabBarLabel: () => null,
      }
    )} >
      <Tab.Screen name="Chats" component={ChatNav} />
      <Tab.Screen name="friends" component={FriendLIst} />
    </Tab.Navigator>
  )
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabStack} />
      <Stack.Screen name="chatPage" component={chatPage} />
    </Stack.Navigator>
  );
}

export default BotomChat