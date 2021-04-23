const express = require("express");

const { fetchData } = require("../controllers/getData");

const router = express.Router();

router.route("/:tableName/").get(fetchData);

module.exports = router;
