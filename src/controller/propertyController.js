// controllers/propertyController.js
const Property = require('../model/propertyModel');
// const { normalizeFeaturesToString } = require('../model/propertyModel');

const { normalizeFeaturesToString, normalizeAmenitiesToArray } = require('../model/propertyModel');

// Utility: simple https URL check
const isHttpUrl = (s) => typeof s === 'string' && /^https?:\/\//i.test(s);

// CREATE
exports.createProperty = async (req, res, next) => {
  try {
    const {
      images = [],
      type,
      title,
      location,
      price,
      features,
      amenities, // <— new
      status,
    } = req.body;

    if (!Array.isArray(images)) {
      return res.status(400).json({ error: 'images must be an array of URLs' });
    }
    const bad = images.find(u => !isHttpUrl(u));
    if (bad) return res.status(400).json({ error: `Invalid image URL: ${bad}` });

    const doc = await Property.create({
      images,
      type,
      title,
      location,
      price,
      features: normalizeFeaturesToString(features),
      amenities: normalizeAmenitiesToArray(amenities), // <—
      status
    });

    res.status(201).json({ data: doc });
  } catch (err) {
    next(err);
  }
};

// LIST
exports.getProperties = async (req, res, next) => {
  try {
    const props = await Property.find().sort({ createdAt: -1 }).lean();
    res.json({ data: props });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getPropertyById = async (req, res, next) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ error: 'Property not found' });
    res.json({ data: prop });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (payload.features !== undefined) {
      payload.features = normalizeFeaturesToString(payload.features);
    }
    if (payload.amenities !== undefined) {
      payload.amenities = normalizeAmenitiesToArray(payload.amenities); // <—
    }
    if (payload.images) {
      if (!Array.isArray(payload.images)) {
        return res.status(400).json({ error: 'images must be an array of URLs' });
      }
      const bad = payload.images.find(u => !isHttpUrl(u));
      if (bad) return res.status(400).json({ error: `Invalid image URL: ${bad}` });
    }

    const updated = await Property.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Property not found' });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const del = await Property.findByIdAndDelete(id);
    if (!del) return res.status(404).json({ error: 'Property not found' });
    res.json({ data: { id: del._id, deleted: true } });
  } catch (err) {
    next(err);
  }
};
