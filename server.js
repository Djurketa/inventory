const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,DELETE, PUT");
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token",
		"Origin, X-Requested-With, Content-Type, Accept,Authorization"
	);
	if ("OPTIONS" == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});
const config = process.env;
const path = require("path");

// app.use(express.static(path.resolve(__dirname, "public")));

app.get("/api/suppliers", (req, res) => {
	res.sendFile(path.join(__dirname, "src/JSON", "suppliers.json"));
});
app.get("/api/items", (req, res) => {
	res.sendFile(path.join(__dirname, "src/JSON", "items.json"));
});
app.listen(process.env.PORT || 1337, () => {
	console.log("server is running ");
});
