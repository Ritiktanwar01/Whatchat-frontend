import { NavigationContainer } from "@react-navigation/native";
import "./globals.css"
import { StatusBar, Text, View } from "react-native";
import AuthNav from "./app/Navigations/AuthNav/AuthNav";
import { useState } from "react";
import ChatNav from "./app/Navigations/ChatNav/ChatNav";
import BotomChat from "./app/Navigations/BotomChat/BotomChat";
 
export default function App() {
  const [Auth,setAuth] = useState(true)
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
     {Auth ? <BotomChat /> : <AuthNav/>}
    </NavigationContainer>
  );
}