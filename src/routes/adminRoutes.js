const express = require('express');
// const { body } = require('express-validator');
const { login, seedSuperAdmin } = require('../controller/adminController');
const { requireAdminAuth } = require('../middleware/auth');

const router = express.Router();

router.post("/login", login);
router.post("/seed", seedSuperAdmin);

router.get('/me', requireAdminAuth, (req, res) => {
  res.json({
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role
    }
  });
});

module.exports = router;
