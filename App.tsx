import { NavigationContainer } from "@react-navigation/native";
import "./globals.css"
import { StatusBar } from "react-native";
import { RealmProvider } from "@realm/react"
import { Task } from "./app/db/models";
import AuthNav from "./app/Navigations/AuthNav/AuthNav";
import { useState } from "react";
import BotomChat from "./app/Navigations/BotomChat/BotomChat";

export default function App() {
  const [Auth, setAuth] = useState(true)
  return (
    <RealmProvider schema={[Task.schema]}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {Auth ? <BotomChat /> : <AuthNav />}
      </NavigationContainer>
    </RealmProvider>
  );
}