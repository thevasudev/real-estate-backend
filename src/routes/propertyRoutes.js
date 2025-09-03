// src/routes/propertyRoutes.js
const express = require('express');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require('../controller/propertyController');

const router = express.Router();

router.post('/createProperty', createProperty);
router.get('/getProperties', getProperties);
router.get('/getProperty/:id', getPropertyById);
router.put('/updateProperty/:id', updateProperty);
router.delete('/deleteProperty/:id', deleteProperty);

module.exports = router;
