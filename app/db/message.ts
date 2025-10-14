import { BSON } from 'realm';

export class Message extends Realm.Object<Message> {
  _id!: BSON.ObjectId;
  sender!: 'me' | 'them';
  text!: string;
  timestamp!: Date;
  seen!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Message',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      sender: { type: 'string', indexed: true },
      text: 'string',
      timestamp: 'date',
      seen: 'bool',
    },
  };
}

export class ChatFriend extends Realm.Object<ChatFriend> {
  _id!: BSON.ObjectId;
  email!: string;
  name!: string;
  mobile!: string;
  last_online!: string;
  profilePicture!: string; 
  messages!: Realm.List<Message>;

  static schema: Realm.ObjectSchema = {
    name: 'ChatFriend',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      email: { type: 'string', indexed: true },
      name: 'string',
      mobile: 'string',
      last_online: 'string',
      profilePicture: 'string', // ✅ Added here
      messages: { type: 'list', objectType: 'Message' },
    },
  };
}
