import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UsersService } from "../users/users.service";
import { isValidAddress, normalizeAddress } from "../common/address";
import { sanitizeSiteHtml } from "../common/sanitize";
import { CreateSiteDto } from "./create-site.dto";
import { Site, SiteDocument } from "./site.schema";

@Injectable()
export class SitesService {
  constructor(
    @InjectModel(Site.name) private readonly siteModel: Model<SiteDocument>,
    private readonly usersService: UsersService,
  ) {}

  list() {
    return this.siteModel
      .find()
      .sort({ title: 1 })
      .select("address title author")
      .lean()
      .exec();
  }

  async summaries(addresses: string[]) {
    return this.siteModel
      .find({ address: { $in: addresses } })
      .select("address title")
      .lean()
      .exec();
  }

  async exists(rawAddress: string): Promise<boolean> {
    const address = normalizeAddress(rawAddress);
    if (!isValidAddress(address)) {
      return false;
    }
    return Boolean(await this.siteModel.exists({ address }));
  }

  async findByAddress(rawAddress: string) {
    const address = normalizeAddress(rawAddress);
    if (!isValidAddress(address)) {
      throw new NotFoundException(`No site at ${rawAddress}`);
    }

    const site = await this.siteModel.findOne({ address }).lean().exec();
    if (!site) {
      throw new NotFoundException(`No site at ${address}`);
    }
    return site;
  }

  async create(dto: CreateSiteDto) {
    const address = normalizeAddress(dto.address);
    if (!isValidAddress(address)) {
      throw new BadRequestException("Addresses look like tidepool.zz");
    }

    const author = dto.author.trim();
    if (!(await this.usersService.exists(author))) {
      throw new BadRequestException("Unknown author");
    }

    const title = dto.title.trim();
    if (!title) {
      throw new BadRequestException("A title is required");
    }

    const { html, text } = sanitizeSiteHtml(dto.html);
    if (!text) {
      throw new BadRequestException("The page needs some readable text");
    }

    try {
      const site = await this.siteModel.create({ address, title, html, text, author });
      return site.toObject();
    } catch (error) {
      if (isDuplicateKey(error)) {
        throw new ConflictException("That address is already taken");
      }
      throw error;
    }
  }

  async search(query: string) {
    const q = query.trim();
    if (q.length < 2) {
      return [];
    }

    const sites = await this.siteModel
      .find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } },
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
      .lean()
      .exec();

    return sites.map((site) => ({
      address: site.address,
      title: site.title,
      author: site.author,
      snippet: makeSnippet(site.text, q),
    }));
  }
}

function makeSnippet(text: string, query: string): string {
  const lowerText = text.toLowerCase();
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const firstMatch = Math.min(
    ...terms.map((term) => {
      const index = lowerText.indexOf(term);
      return index === -1 ? Number.POSITIVE_INFINITY : index;
    }),
  );

  if (!Number.isFinite(firstMatch)) {
    return text.slice(0, 180);
  }

  const start = Math.max(0, firstMatch - 60);
  const end = Math.min(text.length, start + 200);
  return `${start > 0 ? "..." : ""}${text.slice(start, end)}${end < text.length ? "..." : ""}`;
}

function isDuplicateKey(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: number }).code === 11000
  );
}
