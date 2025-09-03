const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');

function signToken(admin) {
  const payload = {
    sub: admin._id.toString(),
    role: admin.role,
    type: 'admin'
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d'
  });
  return token;
}

// POST /login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // must explicitly select password because we set select:false
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await admin.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    admin.lastLoginAt = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = signToken(admin);

    res.json({
      token,
      token_type: 'Bearer',
      expires_in: process.env.JWT_EXPIRES || '7d',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// OPTIONAL: seed a super admin (remove/lock down in prod)
// POST /seed
exports.seedSuperAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const exists = await Admin.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ error: 'Admin already exists' });

    const admin = await Admin.create({ name, email: email.toLowerCase(), password, role: 'superadmin' });
    res.status(201).json({ data: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (err) {
    next(err);
  }
};
