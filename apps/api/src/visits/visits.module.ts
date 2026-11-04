import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SitesModule } from "../sites/sites.module";
import { UsersModule } from "../users/users.module";
import { Visit, VisitSchema } from "./visit.schema";
import { VisitsController } from "./visits.controller";
import { VisitsService } from "./visits.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
    UsersModule,
    SitesModule,
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
