import { NavigationContainer } from "@react-navigation/native";
import "./globals.css"
import { StatusBar } from "react-native";
import AuthNav from "./app/Navigations/AuthNav/AuthNav";
import { RealmProvider } from "@realm/react"
import { Message } from "./app/db/message"
import { User } from "./app/db/message";
import { SocketProvider } from "./app/utils/SocketProvider";

export default function App() {
  return (
    <RealmProvider schema={[User, Message]} deleteRealmIfMigrationNeeded>
      <SocketProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <AuthNav />
        </NavigationContainer>
      </SocketProvider>
    </RealmProvider>
  );
}