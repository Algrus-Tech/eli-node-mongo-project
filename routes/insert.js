const express = require("express");

const { insertOneIntoTable } = require("../controllers/insert");

const router = express.Router();

router.route("/:tableName/").post(insertOneIntoTable);

module.exports = router;
