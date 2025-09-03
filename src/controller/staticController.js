const Static = require('../model/staticModel');

exports.createStatic = async (req, res, next) => {
    try {
        const static = await Static.create(req.body);
        res.status(201).json({ data: static });
    } catch (err) {
        next(err);
    }
};

exports.getAllStatics = async (req, res, next) => {
    try {
        const static = await Static.find();
        res.status(200).json({ data: static });
    } catch (err) {
        next(err);
    }
};

exports.getStaticById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const static = await Static.findById(id);
        res.status(200).json({ data: static });
    } catch (err) {
        next(err);
    }
};

exports.updateStaticById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const static = await Static.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ data: static });
    } catch (err) {
        next(err);
    }
};

exports.deleteStaticById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const static = await Static.findByIdAndDelete(id);
        res.status(200).json({ data: static });
    } catch (err) {
        next(err);
    }
};

