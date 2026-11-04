import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export const VISIT_VIA = [
  "typed",
  "link",
  "back",
  "forward",
  "history",
  "search",
  "publish",
] as const;

export type VisitVia = (typeof VISIT_VIA)[number];
export type VisitDocument = HydratedDocument<Visit>;

@Schema()
export class Visit {
  @Prop({ required: true, trim: true })
  user!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  visitedAt!: Date;

  @Prop({ required: true, enum: VISIT_VIA })
  via!: VisitVia;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

VisitSchema.index({ user: 1, visitedAt: -1 });
VisitSchema.index({ user: 1, address: 1, visitedAt: 1 }, { unique: true });
