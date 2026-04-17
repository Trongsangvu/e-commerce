import mongoose from "mongoose";

async function migrate() {
  await mongoose.connect("");

  const result = await mongoose.connection
    .collection("products")
    .updateMany(
      { imageUrl: { $exists: true } },
      { $rename: { imageUrl: "image_url" } },
    );

  console.log(
    `Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`,
  );

  await mongoose.disconnect();
}

migrate().catch(console.error);
