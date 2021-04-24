const express = require("express");

const { removeDocById } = require("../controllers/removeDoc");

const router = express.Router();

router.route("/:tableName/:docId").get(removeDocById);

module.exports = router;
