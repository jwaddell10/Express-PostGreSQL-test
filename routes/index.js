var express = require("express");
var router = express.Router();
const { getAllUsernames } = require("../db/queries.js");
const { insertUsername } = require("../db/queries.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  console.log('this is running?')
	try {
		const usernames = await getAllUsernames();
		console.log("usernames", usernames);
		res.json(usernames);
	} catch (error) {
		console.log("error", error);
	}
});

router.get("/new", function (req, res, next) {
	const htmlForm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New User Form</title>
    </head>
    <body>
      <h1>Enter Username</h1>
      <form action="/submit" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `;

	res.send(htmlForm);
});

router.post("/new", async function (req, res, next) {
	try {
		const createdUser = await insertUsername();
		console.log(createdUser, "this is createdUser");
	} catch (error) {
		console.log("error", error);
	}
});

module.exports = router;
