import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../Screens/SplashScreen/SplashScreen';
import Login from '../../Screens/Login/Login';
import Signup from '../../Screens/Signup/Signup';
import OtpScreen from '../../Screens/OtpScreen/OtpScreen';
import EmailScreen from '../../Screens/EmailLogin/EmailScreen';
import BotomChat from '../BotomChat/BotomChat';

const AuthNav = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name='email' component={EmailScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'OTP Verification' }} />
      <Stack.Screen name='Home' component={BotomChat} />

    </Stack.Navigator>
  )
}
export default AuthNav