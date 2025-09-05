const Team = require('../model/teamModel');

exports.createTeam = async (req, res, next) => {
    try {
        const team = await Team.create(req.body);
        res.status(201).json({ data: team });
    } catch (err) {
        next(err);
    }
}


exports.updateTeamById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ data: team });
    } catch (err) {
        next(err);
    }
}

exports.getAllTeams = async (req, res, next) => {
    try {
        const team = await Team.find();
        res.status(200).json({ data: team });
    } catch (err) {
        next(err);
    }
}

exports.deleteTeamById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);
        res.status(200).json({ data: team });
    } catch (err) {
        next(err);
    }
}