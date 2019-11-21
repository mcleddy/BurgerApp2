var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function(req, res) {
  burger.insertOne([
    "burgerName"
  ], [
    req.body.burgerName
  ], function(data) {
    // Send back the ID of the new quote
    res.redirect("/");
  });
});

router.put("/burgers/:id",  function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: true
  }, condition, function(data) {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
