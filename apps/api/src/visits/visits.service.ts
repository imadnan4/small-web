import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { normalizeAddress } from "../common/address";
import { SitesService } from "../sites/sites.service";
import { UsersService } from "../users/users.service";
import { CreateVisitDto } from "./create-visit.dto";
import { Visit, VisitDocument } from "./visit.schema";

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private readonly visitModel: Model<VisitDocument>,
    private readonly usersService: UsersService,
    private readonly sitesService: SitesService,
  ) {}

  async record(dto: CreateVisitDto) {
    const user = dto.user.trim();
    if (!(await this.usersService.exists(user))) {
      throw new BadRequestException("Unknown user");
    }

    const address = normalizeAddress(dto.address);
    if (!(await this.sitesService.exists(address))) {
      throw new NotFoundException(`No site at ${address}`);
    }

    const visit = await this.visitModel.create({
      user,
      address,
      visitedAt: new Date(),
      via: dto.via,
    });
    return visit.toObject();
  }

  async history(user: string, limit: string | number = 100) {
    const name = user.trim();
    if (!name) {
      throw new BadRequestException("A user is required");
    }

    const requestedLimit = Number(limit);
    const safeLimit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 200)
      : 100;

    const visits = await this.visitModel
      .find({ user: name })
      .sort({ visitedAt: -1 })
      .limit(safeLimit)
      .lean()
      .exec();

    const addresses = [...new Set(visits.map((visit) => visit.address))];
    const sites = await this.sitesService.summaries(addresses);
    const titles = new Map(sites.map((site) => [site.address, site.title]));

    return visits.map((visit) => ({
      ...visit,
      title: titles.get(visit.address) ?? visit.address,
    }));
  }
}
