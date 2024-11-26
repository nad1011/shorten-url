import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.index({ createdBy: 1, isPrivate: 1 });
UrlSchema.index({ shortId: 1, createdBy: 1 });

export { UrlSchema };
