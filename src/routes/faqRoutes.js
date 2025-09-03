const express = require('express');
// const { body, param, query } = require('express-validator');
const router = express.Router();

const {
  createFaq,
  getFaqs,
  getFaqById,
  updateFaqById,
  deleteFaqById
} = require('../controller/faqController');


router.post("/createfaq", createFaq);
router.get("/getfaqs", getFaqs);
router.get("/getfaq/:id", getFaqById);
router.put("/updatefaq/:id", updateFaqById);
router.delete("/deletefaq/:id", deleteFaqById);

module.exports = router;
