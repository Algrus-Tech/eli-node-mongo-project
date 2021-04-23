const express = require("express");

const { insertMultiIntoTable } = require("../controllers/insertMulti");

const router = express.Router();

router.route("/:tableName/").post(insertMultiIntoTable);

module.exports = router;
