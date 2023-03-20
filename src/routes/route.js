const express = require("express");  // --> importing the express framework
const router = express.Router();
const candidateController = require("../controllrs/candidateController");  // --> importing the candidate Model module


router.post("/createcandidate", candidateController.createCandidate);  


router.get("/getCandidate", candidateController.getCandidate);  


module.exports = router;