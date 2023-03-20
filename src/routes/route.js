const express = require("express");  // --> importing the express framework
const router = express.Router();
const candidateController = require("../controllrs/candidateController");  // --> importing the internModel module


router.post("/createcandidate", candidateController.createCandidate);  // --> POST api to create an intern


router.get("/getCandidate", candidateController.getCandidate);  // --> POST api to create an intern


module.exports = router;