import Realm from "realm";

export class Message extends Realm.Object {
  static schema = {
    name: 'Message',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      text: 'string',
      sender: 'string',
      timestamp: 'date',
    },
  };
}
