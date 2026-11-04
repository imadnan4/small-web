import "dotenv/config";
import mongoose from "mongoose";
import { sanitizeSiteHtml } from "./common/sanitize";
import { Site, SiteSchema } from "./sites/site.schema";
import { SEED_SITES } from "./seed/sites";
import { SEED_USERS } from "./seed/users";
import { SEED_VISITS, SEED_VISIT_BASE_TIME } from "./seed/visits";
import { User, UserSchema } from "./users/user.schema";
import { Visit, VisitSchema } from "./visits/visit.schema";

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is not set. Copy apps/api/.env.example to apps/api/.env and add your connection string.",
    );
  }

  await mongoose.connect(mongoUri);

  const UserModel = mongoose.model(User.name, UserSchema);
  const SiteModel = mongoose.model(Site.name, SiteSchema);
  const VisitModel = mongoose.model(Visit.name, VisitSchema);

  await Promise.all([
    UserModel.createIndexes(),
    SiteModel.createIndexes(),
    VisitModel.createIndexes(),
  ]);

  for (const name of SEED_USERS) {
    await UserModel.updateOne({ name }, { $set: { name } }, { upsert: true });
  }

  for (const site of SEED_SITES) {
    const { html, text } = sanitizeSiteHtml(site.html);
    await SiteModel.updateOne(
      { address: site.address },
      {
        $set: {
          address: site.address,
          title: site.title,
          html,
          text,
          author: site.author,
        },
      },
      { upsert: true },
    );
  }

  for (const visit of SEED_VISITS) {
    const visitedAt = new Date(SEED_VISIT_BASE_TIME + visit.offsetMinutes * 60_000);
    await VisitModel.updateOne(
      { user: visit.user, address: visit.address, visitedAt },
      { $set: { via: visit.via } },
      { upsert: true },
    );
  }

  const [siteCount, userCount, visitCount] = await Promise.all([
    SiteModel.countDocuments(),
    UserModel.countDocuments(),
    VisitModel.countDocuments(),
  ]);

  console.log(
    `Seeded ${siteCount} sites, ${userCount} people, and ${visitCount} visits.`,
  );

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
