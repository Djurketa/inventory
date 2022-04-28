import React from "react";
import { Routes, Route } from "react-router-dom";
import Portal from "../pages/portal";
import Orders from "../pages/orders";
import Invoice from "../pages/invoice";
import Nomenclatures from "../pages/nomenclatures";
import Reports from "../pages/reports";
import Suppliers from "../pages/suppliers";
import Mapping from "../pages/mapping";
import Settings from "../pages/settings";
function index() {
	return (
		<Routes>
			<Route exact path="/portal" element={<Portal />}></Route>
			<Route exact path="/narudzbenice" element={<Orders />}></Route>
			<Route exact path="/fakture" element={<Invoice />}></Route>
			<Route exact path="/izvjestaji" element={<Reports />}></Route>
			<Route exact path="/sifrarnici" element={<Nomenclatures />}></Route>
			<Route exact path="/dobavljaci" element={<Suppliers />}></Route>
			<Route exact path="/artikli" element={<Mapping />}></Route>
			<Route exact path="/podesavanja" element={<Settings />}></Route>
		</Routes>
	);
}

export default index;
