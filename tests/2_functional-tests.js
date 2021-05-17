const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // Convert an invalid input such as 32g: GET request to /api/convert.
  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  // Convert with no number such as kg: GET request to /api/convert.
  suite("Test Correct response of valid input to api/convert", function () {
    test("valid whole number input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=4gal")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(res.body.initNum, 4, "incorrect initNum read");
          assert.equal(res.body.initUnit, "gal", "incorrect initUnit read");
          assert.equal(res.body.returnNum, 15.14164, "incorrect conversion");
          assert.equal(res.body.returnUnit, "L", "incorrect return unit");
          assert.equal(
            res.body.string,
            "4 gallons converts to 15.14164 liters",
            "incorrect string response"
          );
          done();
        });
    });
    test("valid fraction input", function () {
      chai
        .request(server)
        .get("/api/convert?input=1/2km")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(res.body.initNum, 0.5, "incorrect initNum read");
          assert.equal(res.body.initUnit, "km", "incorrect initUnit read");
          assert.equal(res.body.returnNum, 0.31069, "incorrect conversion");
          assert.equal(res.body.returnUnit, "mi", "incorrect return unit");
          assert.equal(
            res.body.string,
            "0.5 kilometers converts to 0.31069 miles",
            "incorrect string response"
          );
        });
    });
  });

  // const chai = require("chai");
  // const assert = chai.assert;

  // const server = require("../server");

  // const chaiHttp = require("chai-http");
  // chai.use(chaiHttp);

  // suite("Functional Tests", function () {
  //   suite("Integration tests with chai-http", function () {
  //     // #1
  //     test("Test GET /hello with no name", function (done) {
  //       chai
  //         .request(server)
  //         .get("/hello")
  //         .end(function (err, res) {
  //           assert.equal(res.status, 200);
  //           assert.equal(res.text, "hello Guest");
  //           done();
  //         });
  //     });
});
