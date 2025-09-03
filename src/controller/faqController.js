const Faq = require('../model/faqModel');



exports.createFaq = async (req, res, next) => {
  try {
    const { question, answer } = req.body;

    const faq = await Faq.create({
      question,
      answer,
    
    });

    res.status(201).json({ data: faq });
  } catch (err) {
    next(err);
  }
};


exports.getFaqById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findById(id);
    res.status(200).json({ data: faq });
  } catch (err) {
    next(err);
  }
};

exports.deleteFaqById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndDelete(id);
    res.status(200).json({ data: faq });
  } catch (err) {
    next(err);
  }
};

exports.getFaqs = async (req, res, next) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json({ data: faqs });
  } catch (err) {
    next(err);
  }
};

exports.updateFaqById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ data: faq });
  } catch (err) {
    next(err);
  }
};