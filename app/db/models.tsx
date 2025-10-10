import { BSON, ObjectSchema } from 'realm';

export class Task {
  _id: BSON.ObjectId;
  description: string;
  isComplete: boolean;
  createdAt: Date;

  constructor(description: string) {
    this._id = new BSON.ObjectId();
    this.description = description;
    this.isComplete = false;
    this.createdAt = new Date();
  }

  static schema: ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: { type: 'bool', default: false },
      createdAt: 'date',
    },
  };
}
