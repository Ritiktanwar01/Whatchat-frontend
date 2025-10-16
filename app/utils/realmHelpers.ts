import { ObjectId } from 'bson';
import { ChatFriend, Message } from '../db/message';
import { Realm } from '@realm/react';

type ChatUser = {
  email: string;
  name: string;
  mobile: string;
  profilePicture: string;
};

export const saveMessageToFriend = (
  realm: Realm,
  user: ChatUser,
  text: string,
  sender: 'me' | 'them'
) => {
  realm.write(() => {
    console.log("writing..")
    // Try to find existing ChatFriend
    let friend = realm
      .objects(ChatFriend)
      .filtered(`email == "${user.email}"`)[0];

    // If not found, create a new managed ChatFriend object
    if (!friend) {
      console.log("creating new one for",user.email,friend)
      realm.create(ChatFriend, {
        _id: new ObjectId(),
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        last_online: new Date().toISOString(),
        profilePicture: user.profilePicture,
        // messages will be auto-initialized by Realm
      });

      // Re-fetch to ensure we get the managed object with initialized messages
      friend = realm
        .objects(ChatFriend)
        .filtered(`email == "${user.email}"`)[0];
    }

    // Create a new managed Message object
    const newMessage = realm.create(Message, {
      _id: new ObjectId(),
      text,
      sender,
      timestamp: new Date(),
      seen: false,
    });

    // Push the new message into the managed list
    friend.messages.push(newMessage);
  });
};
