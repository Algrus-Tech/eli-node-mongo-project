const express = require("express");

const { updateAndInsertDoc } = require("../controllers/updateInsert");

const router = express.Router();

router.route("/:tableName/").post(updateAndInsertDoc);

module.exports = router;
