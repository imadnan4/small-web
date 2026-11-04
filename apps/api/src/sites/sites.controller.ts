import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateSiteDto } from "./create-site.dto";
import { SitesService } from "./sites.service";

@Controller("sites")
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  list() {
    return this.sitesService.list();
  }

  @Get("search")
  search(@Query("q") query = "") {
    return this.sitesService.search(query);
  }

  @Get(":address")
  find(@Param("address") address: string) {
    return this.sitesService.findByAddress(address);
  }

  @Post()
  create(@Body() dto: CreateSiteDto) {
    return this.sitesService.create(dto);
  }
}
