const multer = require('multer');

const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB per file (tweak as needed)
});

module.exports = uploadMemory;
