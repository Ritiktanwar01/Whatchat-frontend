import { BSON } from 'realm';

export class Message extends Realm.Object<Message> {
  _id!: BSON.ObjectId;
  text!: string;
  sender!: string;
  timestamp!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Message',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      text: 'string',
      sender: 'string',
       read: { type: 'bool', default: false },
      timestamp: 'date',
    },
  };
}

export class User extends Realm.Object<User> {
  id!: BSON.ObjectId;
  name!: string;
  messages!: Realm.List<Message>;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
      messages: { type: 'list', objectType: 'Message' },
    },
  };
}
