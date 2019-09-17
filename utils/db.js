var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:curry@localhost:5432/onetool");

exports.newUser = function(username, email) {
  return db.query(
    "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id",
    [username, email]
  );
};
