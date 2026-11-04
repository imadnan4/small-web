import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SitesModule } from "./sites/sites.module";
import { UsersModule } from "./users/users.module";
import { VisitsModule } from "./visits/visits.module";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is not set. Copy apps/api/.env.example to apps/api/.env and add your connection string.",
  );
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    UsersModule,
    SitesModule,
    VisitsModule,
  ],
})
export class AppModule {}
