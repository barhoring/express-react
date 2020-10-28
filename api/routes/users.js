var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("todo: fetch all users:");
});

module.exports = router;
