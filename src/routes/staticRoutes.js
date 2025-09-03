const express = require('express');
const router = express.Router();

const {
    createStatic,
    getAllStatics,
    getStaticById,
    updateStaticById,
    deleteStaticById
} = require('../controller/staticController');

router.post("/createStatic", createStatic);
router.get("/getAllStatics", getAllStatics);
router.get("/getStatic/:id", getStaticById);
router.put("/updateStatic/:id", updateStaticById);
router.delete("/deleteStatic/:id", deleteStaticById);

module.exports = router;

