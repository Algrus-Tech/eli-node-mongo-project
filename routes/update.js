const express = require("express");

const { updateDoc } = require("../controllers/update");

const router = express.Router();

router.route("/:tableName/").post(updateDoc);

module.exports = router;
