import React, { useEffect, useRef, useState } from "react";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ClickAwayListener from "@mui/material/ClickAwayListener";
function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const [secondaryData, setSecondaryData] = useState([]);
	const customer_id = useRef(null);
	const [lastName, setLastName] = useState();

	function getSubtableData() {
		const id = customer_id.current.getAttribute("data-id");
		fetch(
			"http://localhost:8080/ords/bapoteka/database/getcustomerorders/" + id
		)
			.then((response) => response.json())
			.then((responseData) => {
				setSecondaryData(responseData.items);
				setOpen(!open);
			})
			.catch((error) => console.warn(error));
	}
	function selectElementContents(el) {
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}

	function lastNameEditClick(e) {
		e.target.setAttribute("contenteditable", "true");
		selectElementContents(e.target);
		setLastName(e.target.textContent);
		console.log(lastName);
	}

	return (
		<React.Fragment>
			{open && <div className="tester"></div>}
			{lastName}
			<tr className={open ? "active-row" : "inactive-row"}>
				<td>
					<IconButton
						ref={customer_id}
						data-id={row.customer_id}
						size="small"
						sx={{ padding: 0, height: "16px" }}
						onClick={getSubtableData}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</td>

				<td align="left">{row.cust_first_name}</td>
				<td align="left">
					<input value={row.cust_last_name} name="lastName" />
				</td>
				<td align="left">{row.cust_street_address1}</td>
				<td align="left">{row.cust_street_address2}</td>
				<td align="left">{row.cust_city}</td>
				<td align="left">{row.cust_state}</td>
				<td align="left">{row.cust_postal_code}</td>
				<td align="left">{row.cust_email}</td>
			</tr>
			<tr>
				<td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
					<Collapse in={open} unmountOnExit timeout="auto">
						<table className="secondary-table">
							<thead>
								<tr>
									<th align="left">order_id</th>
									<th align="left">customer_id</th>
									<th align="left">order_total</th>
									<th align="left">user_name</th>
								</tr>
							</thead>
							<tbody>
								{secondaryData?.map((row) => (
									<tr key={row.order_id}>
										<td align="left" component="th" scope="row">
											{row.order_id}
										</td>
										<td align="left">{row.customer_id}</td>
										<td align="left">{row.order_total}</td>
										<td align="left">{row.user_name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</Collapse>
				</td>
			</tr>
		</React.Fragment>
	);
}

function Test() {
	// set Collumn names
	const columnNames = [
		"",
		"Ime",
		"Prezime",
		"Ulica1",
		"Ulica2",
		"Grad",
		"Država",
		"Pošta",
		"E-mail",
	];
	const [primaryData, setPrimarydata] = useState({});
	//get primary table data
	useEffect(() => {
		fetch("http://localhost:8080/ords/bapoteka/database/getcustomers")
			.then((response) => response.json())
			.then((responseData) => {
				setPrimarydata(responseData);
			})
			.catch((error) => console.warn(error));
	}, []);
	//

	return (
		<table className="primary-table" aria-label="collapsible table">
			<thead>
				<tr>
					{columnNames.map((name) => {
						return <th align="left">{name}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{primaryData?.items?.map((row, i) => (
					<Row key={i} row={row} />
				))}
			</tbody>
		</table>
	);
}

export default Test;
