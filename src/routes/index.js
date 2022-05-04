import React from "react";
import { Routes, Route } from "react-router-dom";
import Portal from "../pages/Portal";
import Orders from "../pages/Orders";
import Invoice from "../pages/Invoice";
import Nomenclatures from "../pages/Nomenclatures";
import Reports from "../pages/Reports";
import Suppliers from "../pages/Suppliers";
import Mapping from "../pages/Mapping";
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
			{/* <Route exact path="/podesavanja" element={<Settings />}></Route> */}
		</Routes>
	);
}

export default index;
