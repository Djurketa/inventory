import React from "react";
import axios from "axios";
import { https } from "https";
function index() {
	axios.get("www.google.com").then(function (response) {
		console.log(response);
	});
	return <div>index</div>;
}

export default index;
