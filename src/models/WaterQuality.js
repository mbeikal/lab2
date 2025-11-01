import mongoose from "mongoose";

const HeavyMetalsSchema = new mongoose.Schema(
  {
    lead: Number,
    arsenic: Number,
    mercury: Number,
  },
  { _id: false }
);

const MetricsSchema = new mongoose.Schema(
  {
    ph: { type: Number, min: 0, max: 14 },
    dissolvedOxygen: Number,
    turbidity: Number,
    nitrates: Number,
    heavyMetals: { type: HeavyMetalsSchema, default: {} },
  },
  { _id: false }
);

const WaterQualitySchema = new mongoose.Schema(
  {
    stationId: { type: String, required: true, index: true, trim: true },
    body: { type: String, required: true, trim: true },
    city: { type: String, trim: true, index: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere", required: true }, // [lng, lat]
    },
    timestamp: { type: Date, required: true, index: true },
    metrics: { type: MetricsSchema, default: {} },
    source: { type: String, default: "manual" },
  },
  { timestamps: true }
);

export default mongoose.model("WaterQuality", WaterQualitySchema);
