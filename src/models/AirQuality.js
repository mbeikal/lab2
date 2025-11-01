import mongoose from 'mongoose';

const PollutantsSchema = new mongoose.Schema({
  pm25: { type: Number, min: 0 },
  pm10: { type: Number, min: 0 },
  no2:  { type: Number, min: 0 },
  so2:  { type: Number, min: 0 },
  co:   { type: Number, min: 0 },
  o3:   { type: Number, min: 0 }
}, { _id: false });

const WeatherSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number
}, { _id: false });

const AirQualitySchema = new mongoose.Schema({
  stationId: { type: String, required: true, index: true, trim: true },
  city:      { type: String, required: true, index: true, trim: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere', required: true } // [lng, lat]
  },
  timestamp: { type: Date, required: true, index: true },
  pollutants: { type: PollutantsSchema, default: {} },
  weather: { type: WeatherSchema, default: {} },
  source: { type: String, default: 'manual' }
}, { timestamps: true });

export default mongoose.model('AirQuality', AirQualitySchema);
