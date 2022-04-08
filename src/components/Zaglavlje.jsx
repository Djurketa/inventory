import React, { useEffect, useState } from "react";
import { getZaglavljeAsync, setTableCell } from "./redux/slices/zaglavljeSlice";
import { useDispatch, useSelector } from "react-redux";

function Zaglavlje() {
	const dispatch = useDispatch();
	const tableData = useSelector((state) => state.zaglavlje);

	useEffect(() => {
		dispatch(getZaglavljeAsync());
	}, []);

	function handleNameChange(e) {
		const payload = {
			id: e.target.id,
			data: e.target.value,
			column: e.target.getAttribute("column"),
		};
		dispatch(setTableCell(payload));
	}
	function parseInput(row, name) {
		return (
			<input
				column={name}
				id={row.customer_id}
				onChange={handleNameChange}
				nama={row.customer_id}
				value={row[name]}
			/>
		);
	}
	return (
		<table className="primary-table" aria-label="collapsible table">
			<thead>
				<tr>
					{tableData.columnNames.map((name, i) => {
						return (
							<th key={i} align="left">
								{name}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{tableData?.items?.map((row, i) => (
					<tr key={i}>
						<td align="center">
							<button width="10px"> edit+ </button>
						</td>
						<td align="left">{row.cust_first_name}</td>
						<td align="left">{parseInput(row, "cust_last_name")}</td>
						<td align="left">{parseInput(row, "cust_street_address1")}</td>
						<td align="left">{parseInput(row, "cust_street_address2")}</td>
						<td align="left">{parseInput(row, "cust_city")}</td>
						<td align="left">{parseInput(row, "cust_state")}</td>
						<td align="left">{parseInput(row, "cust_postal_code")}</td>
						<td align="left">{parseInput(row, "cust_email")}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Zaglavlje;
