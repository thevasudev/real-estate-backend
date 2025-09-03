const express = require('express');
const { createContact, getContacts, getContactById, deleteContact } = require('../controller/contactController');

const router = express.Router();

router.post('/createContact', createContact);
router.get('/getContacts', getContacts);
router.get('/getContact/:id', getContactById);
router.delete('/deleteContact/:id', deleteContact);

module.exports = router;
