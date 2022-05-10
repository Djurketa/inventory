import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Supplier({ state }) {
	const { supplierName } = useParams();
	const { supplierId } = useLocation().state;
	console.log(supplierId);
	return <div>op{supplierName}</div>;
}

export default Supplier;
