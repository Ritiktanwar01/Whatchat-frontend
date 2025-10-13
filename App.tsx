import { NavigationContainer } from "@react-navigation/native";
import "./globals.css"
import { StatusBar } from "react-native";
import AuthNav from "./app/Navigations/AuthNav/AuthNav";
import { useState } from "react";
import {RealmProvider} from "@realm/react"
import {Message} from "./app/db/message"
import BotomChat from "./app/Navigations/BotomChat/BotomChat";

export default function App() {
  const [Auth, setAuth] = useState(false)
  return (
    <RealmProvider schema={[Message]} deleteRealmIfMigrationNeeded>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {Auth ? <BotomChat /> : <AuthNav />}
      </NavigationContainer>
      </RealmProvider>
  );
}