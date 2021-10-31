const express = require("express");
const exhbs = require("express-handlebars");

const app = express();
const port = 80;

app.engine(
	"hbs",
	exhbs({
		defaultLayout: "main",
		extname: ".hbs",
	})
);

app.set("view engine", "hbs");

app.get("/", function (req, res) {
	res.render("home");
});

app.get("/signup", function (req, res) {
	res.render("signup");
});

app.get("/signin", function (req, res) {
	res.render("signin");
});

app.listen(port, () => {
	console.log(`Listening at Port : ${port}`);
});
