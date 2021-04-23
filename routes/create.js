const express = require("express");

const { createTable } = require("../controllers/create");

const router = express.Router();

router.route("/:tableName").get(createTable);

module.exports = router;
