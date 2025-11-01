import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/eco_lab";

mongoose.set("strictQuery", true);

mongoose
  .connect(uri, {
    autoIndex: true,
  })
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch((err) => {
    console.error("❌ Помилка підключення до MongoDB:", err.message);
    process.exit(1);
  });

export default mongoose;
