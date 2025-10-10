import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatNav from '../ChatNav/ChatNav';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import chatPage from '../../Screens/chatPage/chatPage';
import Groups from "../../Screens/Groups/Groups"
import Status from "../../Screens/Status/Status"
import Calls from "../../Screens/Calls/Calls"
import { Image, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function BotomChat() {

  const TabStack = () => (
    <Tab.Navigator screenOptions={({ route }) => (
      {
        headerShown: false,
        tabBarStyle: { height: 110, width: '100%', paddingTop: 28, justifyContent: 'space-evenly', alignItems: 'center' },
        tabBarIcon: ({ focused, color }) => {

          if (route.name === "Chats") {

            if (focused) {
              return (
              <View className='items-center w-14'>
                <View className='bg-[#53a73986] w-24 h-14 flex-row items-center justify-center rounded-[20px]'>
                 <Image className='w-9 h-9' source={require("../../../assets/Icons/message2.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Chats</Text>
              </View>
            )
            }
            return (
              <View className='items-center w-14'>
                <View className='w-24 h-14 flex-row items-center justify-center rounded-[20px]'>
                 <Image className='w-9 h-9' source={require("../../../assets/Icons/Message.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Chats</Text>
              </View>
            )
          } else if (route.name === "Groups") {

            if (focused) {
               return (
              <View className='items-center w-14'>
                <View className='w-24 h-14 bg-[#53a73986] flex-row items-center justify-center rounded-[20px]'>
                  <Image className='w-9 h-9' source={require("../../../assets/Icons/people.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Groups</Text>
              </View>
            )
            }
             return (
              <View className='items-center w-14'>
                <View className='w-24 h-14 flex-row  items-center justify-center rounded-[20px]'>
                  <Image className='w-9 h-9' source={require("../../../assets/Icons/users.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Groups</Text>
              </View>
            )
          }
          else if (route.name === "Calls") {
            if (focused) {
              return (
              <View className='items-center w-14'>
                <View className='bg-[#53a73986] w-24 h-14 flex-row items-center justify-center rounded-[20px]'>
                  <Image className='w-8 h-8' source={require("../../../assets/Icons/call.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Calls</Text>
              </View>
            )
            }
            return (
              <View className='items-center w-14'>
                <View className='w-24 h-14 flex-row items-center justify-center rounded-[20px]'>
                  <Image className='w-8 h-8' source={require("../../../assets/Icons/phone.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Calls</Text>
              </View>
            )
          }
          else if (route.name === "Status") {
            if (focused) {
              return (
                <View className='items-center w-14'>
                  <View className='w-24 h-14 bg-[#53a73986] flex-row items-center justify-center rounded-[20px]'>
                    <Image className='w-9 h-9' source={require("../../../assets/Icons/updates.png")} />
                  </View>
                  <Text className='font-medium text-sm mt-1'>Status</Text>
                </View>
              )
            }
            return (
              <View className='items-center w-14'>
                <View className='w-24 h-14 flex-row items-center justify-center rounded-[20px]'>
                  <Image className='w-9 h-9' source={require("../../../assets/Icons/status.png")} />
                </View>
                <Text className='font-medium text-sm mt-1'>Status</Text>
              </View>
            )
          }

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