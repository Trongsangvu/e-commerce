import cron, { ScheduledTask } from "node-cron";
import { Product } from "../models/product.model";
import { computeProductBadges } from "../utils/badge.util";

export class BadgeJob {
  private job: ScheduledTask | null = null;

  public start() {
    this.job = cron.schedule("0 0 * * *", async () => {
      console.log("🔄 Badge job running...");

      const products = await Product.find({});

      for (const product of products) {
        const badges = computeProductBadges(product);

        await Product.updateOne({ _id: product._id }, { $set: { badges } });
      }

      console.log("✅ Badge job done");
    });
  }

  public stop() {
    this.job?.stop();
    console.log("🛑 Badge job stopped");
  }
}
