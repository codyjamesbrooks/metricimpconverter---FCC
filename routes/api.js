"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    let initNum = convertHandler.getNum(req.query.input);
    if (initNum === "invalid number") return res.send("invalid number");

    let initUnit = convertHandler.getUnit(req.query.input);
    if (initUnit === "invalid unit") return res.send("invalid unit");

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: returnString,
    });
  });
};
