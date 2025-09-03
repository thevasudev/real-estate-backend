const Contact = require('../model/contactModel');

// POST /api/contact
exports.createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, subject, message } = req.body;

    const contact = await Contact.create({
      firstName,
      lastName,
      phone,
      email,
      subject,
      message
    });

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// GET /api/contact (list all messages)
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};

// GET /api/contact/:id
exports.getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/contact/:id
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
