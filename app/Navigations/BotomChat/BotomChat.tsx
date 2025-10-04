import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatNav from '../ChatNav/ChatNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import chatPage from '../../Screens/chatPage/chatPage';
import Groups from "../../Screens/Groups/Groups"
import Status from "../../Screens/Status/Status"
import Calls from "../../Screens/Calls/Calls"
import { Image } from 'react-native';

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
            return <Image className='w-9 h-9' source={require("../../../assets/Icons/Message.png")} />
          } else if (route.name === "Groups") {
            return <Image className='w-9 h-9' source={require("../../../assets/Icons/users.png")} />
          }
           else if (route.name === "Calls") {
            return <Image className='w-9 h-9' source={require("../../../assets/Icons/phone.png")} />
          }
           else if (route.name === "Status") {
            return <Image className='w-9 h-9' source={require("../../../assets/Icons/status.png")} />
          }
          return iconName ? <Ionicons name={iconName} size={30} color={color} /> : null;
        },
        tabBarLabel: () => null,
      }
    )} >
      <Tab.Screen name="Chats" component={ChatNav} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Calls" component={Calls} />
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