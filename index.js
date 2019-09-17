const express = require("express");
const app = express();
const db = require("./utils/db");
const axios = require("axios");
const bodyParser = require("body-parser");
let secrets = require("./secrets");
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (request, response) => {
  try {
    let result = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${
        secrets.SECRET
      }&response=${request.body["g-recaptcha-response"]}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
      }
    );
    let data = result.data || {};
    if (data.success) {
      db.newUser(request.body.username, request.body.email);
      response.sendStatus(200);
    } else if (!data.success) {
      throw {
        success: false,
        error: "response not valid"
      };
    }
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
});
app.listen(8080, function() {
  console.log("Hello Registration");
});
