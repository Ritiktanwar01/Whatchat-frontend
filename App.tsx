import { NavigationContainer } from "@react-navigation/native";
import "./globals.css"
import { StatusBar } from "react-native";
import AuthNav from "./app/Navigations/AuthNav/AuthNav";
import { RealmProvider } from "@realm/react"
import { Message,ChatFriend } from "./app/db/message"
import { useFirebaseNotifications } from "./hooks/useFirebaseSetup";

export default function App() {
  // useFirebaseNotifications()
  return (
    <RealmProvider schema={[ChatFriend, Message]} deleteRealmIfMigrationNeeded>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <AuthNav />
        </NavigationContainer>
    </RealmProvider>
  );
}