import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'urls',
  versionKey: false,
  autoIndex: true,
  expires: 3600 * 24 * 30, // 30 days
})
export class Url extends Document {
  @Prop({ required: true, unique: true, index: true })
  shortId: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ default: Date.now })
  lastAccessed: Date;

  @Prop({})
  qrCode: string;

  @Prop({})
  accessTimes: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  userId: MongooseSchema.Types.ObjectId;
}

const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.index({ userId: 1 });
UrlSchema.index({ shortId: 1, userId: 1 });

export { UrlSchema };
