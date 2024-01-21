import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from 'mongoose'
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false, timestamps: { createdAt: 'created_at' } })
export class User extends AbstractDocument {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: Date, required: true, default: now() })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);