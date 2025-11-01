import AirQuality from "../models/AirQuality.js";

function buildFilter(q) {
  const filter = {};
  if (q.city) filter.city = new RegExp(q.city, "i");
  if (q.stationId) filter.stationId = q.stationId;

  if (q.from || q.to) {
    filter.timestamp = {};
    if (q.from) filter.timestamp.$gte = new Date(q.from);
    if (q.to) filter.timestamp.$lte = new Date(q.to);
  }

  return filter;
}

export async function list(req, res, next) {
  try {
    const filter = buildFilter(req.query);
    const limit = Math.min(parseInt(req.query.limit || "50"), 200);
    const skip = Math.max(parseInt(req.query.skip || "0"), 0);
    const sort = req.query.sort || "-timestamp";

    const [data, total] = await Promise.all([
      AirQuality.find(filter).sort(sort).skip(skip).limit(limit),
      AirQuality.countDocuments(filter),
    ]);

    res.json({ success: true, data, meta: { total, limit, skip } });
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const doc = await AirQuality.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, error: "Не найдено" });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const payload = req.body;

    if (
      !payload.stationId ||
      !payload.city ||
      !payload.timestamp ||
      !payload.location
    ) {
      return res
        .status(400)
        .json({
          success: false,
          error: "stationId, city, timestamp и location обязательны",
        });
    }

    const doc = await AirQuality.create(payload);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const updated = await AirQuality.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, error: "Не найдено" });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const deleted = await AirQuality.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, error: "Не найдено" });
    res.json({ success: true, message: "Удалено" });
  } catch (err) {
    next(err);
  }
}
