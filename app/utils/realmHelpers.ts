import { ObjectId } from 'bson';
import { ChatFriend, Message } from '../db/message';
import { Realm } from '@realm/react';

type ChatUser = {
  email: string;
  name?: string;
  mobile: string;
  profilePicture: string;
};

const toDateFromUnix = (unix: number): Date => new Date(unix);

export const saveMessageToFriend = (
  realm: Realm,
  user: ChatUser,
  text: string,
  sender: 'me' | 'them',
  serverTimestamp?: number
) => {
  realm.write(() => {
    let friend = realm
      .objects(ChatFriend)
      .filtered(`email == "${user.email}"`)[0];

    if (!friend) {
      friend = realm.create(ChatFriend, {
        _id: new ObjectId(),
        email: user.email,
        name: user.name || user.mobile || 'Unknown',
        mobile: user.mobile,
        last_online: new Date().toISOString(),
        profilePicture: user.profilePicture,
        messages: [],
      });
    }

    const timestamp = serverTimestamp
      ? toDateFromUnix(serverTimestamp)
      : new Date();

    const newMessage = realm.create(Message, {
      _id: new ObjectId(),
      text,
      sender,
      timestamp,
      seen: false,
    });

    friend.messages.push(newMessage);
  });
};
