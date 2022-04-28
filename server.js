const fs = require("fs");
const https = require("https");
const options = {
	key: fs.readFileSync("certs/server-key.pem"),
	cert: fs.readFileSync("certs/server-crt.pem"),
	ca: fs.readFileSync("certs/ca-crt.pem"),
	requestCert: true,
	rejectUnauthorized: true,
};
https
	.createServer(options, function (req, res) {
		console.log(
			new Date() +
				" " +
				req.connection.remoteAddress +
				" " +
				req.method +
				" " +
				req.url
		);
		res.writeHead(200);
		res.end("OK!\n");
	})
	.listen(1337);
