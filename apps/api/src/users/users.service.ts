import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  list() {
    return this.userModel.find().sort({ name: 1 }).select("name").lean().exec();
  }

  async exists(name: string): Promise<boolean> {
    return Boolean(await this.userModel.exists({ name }));
  }
}
