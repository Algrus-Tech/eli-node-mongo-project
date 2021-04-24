const express = require("express");

const { fetchData, fetchDataWithLimit } = require("../controllers/getData");

const router = express.Router();

router.route("/:tableName/").get(fetchData);

router.route("/:limit/:tableName").get(fetchDataWithLimit);

module.exports = router;
