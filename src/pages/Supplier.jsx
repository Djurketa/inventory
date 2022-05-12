import React, { useRef, useState } from "react";
import { useGetItemsQuery } from "../redux_api/nomenclatures";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Autocomplete, TextField, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConstructionOutlined } from "@mui/icons-material";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "barcode", headerName: "Barcode", width: 150 },
	{ field: "name", headerName: "Naziv", width: 300 },
	{ field: "price", headerName: "Cijena", width: 70 },
	{
		field: "price_pdv",
		headerName: "Cijena sa PDV-om",
		type: "number",
		width: 150,
	},
	{ field: "qty", headerName: "Količina", width: 70 },
	{ field: "total_price", headerName: "Ukupna cijena", width: 150 },
	{ field: "total_pdv", headerName: "Ukupan PDV", width: 150 },

	// {
	// 	field: "fullName",
	// 	headerName: "Full name",
	// 	description: "This column has a value getter and is not sortable.",
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (params) =>
	// 		`${params.row.firstName || ""} ${params.row.lastName || ""}`,
	// },
];

function Supplier({ state }) {
	const { supplierName } = useParams();
	const { supplierId } = useLocation().state;
	const [item, setItem] = useState();
	const [items, setItems] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	const qtyRef = useRef("");
	const { data, isFetching } = useGetItemsQuery();
	if (isFetching) {
		return <LinearProgress color="secondary" />;
	}
	// data from responce
	const selectListItems = data;
	const defaultProps = {
		options: selectListItems,
		getOptionLabel: (option) => option.name,
	};

	function handleSelectListChange(event, value) {
		if (value) {
			if (items.filter((e) => e.id === value.id).length == 0) {
				setItem(value);
			}
		}
	}
	function handleQuantityChange(event) {
		console.log(event.target.value);
	}
	function handleDeleteRowsClick(e) {
		const filtered = item.filter(function (e) {
			return this.indexOf(e.id) < 0;
		}, selectionModel);
		setItem(filtered);
	}

	return (
		<>
			<Box sx={{ display: "flex" }}>
				{JSON.stringify(item)}
				<Autocomplete
					{...defaultProps}
					onChange={handleSelectListChange}
					id="auto-complete"
					autoComplete
					size="small"
					sx={{ m: 2, bgcolor: "white", width: 500, pl: 1 }}
					renderInput={(params) => (
						<>
							<TextField
								{...params}
								label={supplierName + " - lista artikala"}
								variant="standard"
							/>
						</>
					)}
				/>
				<TextField
					inputRef={(qtyRef) => qtyRef && qtyRef.focus()}
					onChange={handleQuantityChange}
					sx={{ m: 2, bgcolor: "white", width: 100, pl: 1 }}
					id="standard-basic"
					size="small"
					label="Količina"
					variant="standard"
				/>
			</Box>
			<Box sx={{ m: 2, p: 1, bgcolor: "white" }}>
				{/* <Typography sx={{ m: 2 }} variant="button">
					Izabrani artikli
				</Typography> */}
				<Button
					onClick={handleDeleteRowsClick}
					// sx={{ ml: 10 }}
					size="small"
					variant="contained"
					startIcon={<DeleteIcon />}>
					Obriši selektovane redove
				</Button>
			</Box>
			<Box sx={{ m: 2, bgcolor: "white", height: "calc(100%  - 200px) " }}>
				<DataGrid
					rows={item}
					columns={columns}
					pageSize={11}
					rowsPerPageOptions={[11]}
					checkboxSelection={true}
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
				/>
			</Box>
		</>
	);
}

export default Supplier;
