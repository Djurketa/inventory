import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const [secondaryData, setSecondaryData] = useState([]);
	const customer_id = useRef(null);

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

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						ref={customer_id}
						data-id={row.customer_id}
						aria-label="expand row"
						size="small"
						onClick={getSubtableData}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>

				<TableCell align="center">{row.cust_first_name}</TableCell>
				<TableCell align="center">{row.cust_last_name}</TableCell>
				<TableCell align="center">{row.cust_street_address1}</TableCell>
				<TableCell align="center">{row.cust_street_address2}</TableCell>
				<TableCell align="center">{row.cust_city}</TableCell>
				<TableCell align="center">{row.cust_state}</TableCell>
				<TableCell align="center">{row.cust_postal_code}</TableCell>
				<TableCell align="center">{row.cust_email}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Table
							className="tabela"
							sx={{ minWidth: 650 }}
							size="small"
							aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>order_id</TableCell>
									<TableCell align="right">customer_id</TableCell>
									<TableCell align="right">order_total</TableCell>
									<TableCell align="right">user_name</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{secondaryData?.map((row) => (
									<TableRow key={row.order_id}>
										<TableCell component="th" scope="row">
											{row.order_id}
										</TableCell>
										<TableCell>{row.customer_id}</TableCell>
										<TableCell align="right">{row.order_total}</TableCell>
										<TableCell align="right">{row.user_name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

function Test() {
	const [primaryData, setPrimarydata] = useState({});

	useEffect(() => {
		fetch("http://localhost:8080/ords/bapoteka/database/getcustomers")
			.then((response) => response.json())
			.then((responseData) => {
				setPrimarydata(responseData);
			})
			.catch((error) => console.warn(error));
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table size="small" aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell align="center">cust_first_name</TableCell>
						<TableCell align="center">cust_last_name</TableCell>
						<TableCell align="center">cust_street_address1</TableCell>
						<TableCell align="center">cust_street_address2</TableCell>
						<TableCell align="center">cust_city</TableCell>
						<TableCell align="center">cust_state</TableCell>
						<TableCell align="center">cust_postal_code</TableCell>
						<TableCell align="center">cust_email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{primaryData?.items?.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Test;
