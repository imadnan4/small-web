import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateVisitDto } from "./create-visit.dto";
import { VisitsService } from "./visits.service";

@Controller("visits")
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  record(@Body() dto: CreateVisitDto) {
    return this.visitsService.record(dto);
  }

  @Get("history")
  history(@Query("user") user = "", @Query("limit") limit?: string) {
    return this.visitsService.history(user, limit);
  }
}
