const express = require('express');
const { createTeam, getAllTeams,  updateTeamById, deleteTeamById } = require('../controller/teamController');

const router = express.Router();

router.post('/createTeam', createTeam);
router.get('/getTeams', getAllTeams);
// router.get('/getTeam/:id', getTeamById);
router.put('/updateTeam/:id', updateTeamById);
router.delete('/deleteTeam/:id', deleteTeamById);

module.exports = router;