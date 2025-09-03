const Property = require('../model/propertyModel');

// Utility: simple https URL check
const isHttpUrl = (s) => typeof s === 'string' && /^https?:\/\//i.test(s);

exports.createProperty = async (req, res, next) => {
  try {
    const {
      images = [],           // array of Firebase download URLs from frontend
      type,
      title,
      location,
      price,
      features = [],
      status
    } = req.body;

    // Validate
    if (!Array.isArray(images)) {
      return res.status(400).json({ error: 'images must be an array of URLs' });
    }
    const bad = images.find(u => !isHttpUrl(u));
    if (bad) {
      return res.status(400).json({ error: `Invalid image URL: ${bad}` });
    }

    const doc = await Property.create({
      images,
      type,
      title,
      location,
      price,
      features,
      status
    });

    res.status(201).json({ data: doc });
  } catch (err) {
    next(err);
  }
};

exports.getProperties = async (req, res, next) => {
  try {
    const props = await Property.find().sort({ createdAt: -1 }).lean();
    res.json({ data: props });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ error: 'Property not found' });
    res.json({ data: prop });
  } catch (err) {
    next(err);
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Optional: validate images if provided
    if (req.body.images) {
      if (!Array.isArray(req.body.images)) {
        return res.status(400).json({ error: 'images must be an array of URLs' });
      }
      const bad = req.body.images.find(u => !isHttpUrl(u));
      if (bad) return res.status(400).json({ error: `Invalid image URL: ${bad}` });
    }

    const updated = await Property.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Property not found' });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

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
