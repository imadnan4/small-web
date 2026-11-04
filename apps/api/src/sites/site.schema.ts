import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SiteDocument = HydratedDocument<Site>;

@Schema({ timestamps: true })
export class Site {
  @Prop({ required: true, unique: true })
  address!: string;

  @Prop({ required: true, trim: true, maxlength: 160 })
  title!: string;

  @Prop({ required: true })
  html!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true })
  author!: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);

SiteSchema.index(
  { title: "text", text: "text" },
  { weights: { title: 5, text: 1 }, name: "site_search" },
);
