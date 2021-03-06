import React, { useRef, useState } from "react";
import { useGetItemsQuery } from "../redux_api/nomenclatures";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Autocomplete, TextField, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import { CustomFooterTotalComponent } from "../components/CustomFooterTotalComponent";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "barcode", headerName: "Barcode", width: 150 },
	{ field: "name", headerName: "Naziv", width: 300 },
	{ field: "pack", headerName: "Pakovanje", width: 200 },
	{ field: "price", headerName: "Cijena", width: 70 },
	{
		field: "price_pdv",
		headerName: "Cijena sa PDV-om",
		type: "number",
		width: 150,
	},
	{ field: "qty", headerName: "Količina", width: 70 },
	{ field: "total_price", headerName: "Ukupna cijena", width: 150 },
	{ field: "total_with_pdv", headerName: "Ukupna sa PDV-om", width: 150 },

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
	const [itemInputValue, setItemInputValue] = React.useState("");
	const [items, setItems] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	const [quantity, setQuantity] = useState({});
	const { data, isFetching } = useGetItemsQuery();
	if (isFetching) {
		return <LinearProgress color="secondary" />;
	}
	const selectListItems = data;
	const defaultProps = {
		options: selectListItems,
		getOptionLabel: (option) => option.name,
		renderOption: (option) => (
			<React.Fragment>
				{console.log(option)}
				<h1 key={option.key}>{option.key}</h1>
			</React.Fragment>
		),
	};

	function handleItemChange(event, value) {
		// if (value) {
		// if (items.filter((e) => e.id === value.id).length == 0) {
		setItem(value);
		setItemInputValue(value.name);
		// }
		// }
	}
	function handleQuantityChange(event) {
		const value = event.target.value;
		setQuantity(value);
	}
	function handleDeleteRowsClick(e) {
		const filtered = items.filter(function (e) {
			return this.indexOf(e.id) < 0;
		}, selectionModel);
		setItems(filtered);
	}
	function handleAddClick(event) {
		if (items.filter((e) => e.id === item.id).length == 0 && quantity) {
			const qtyObj = {
				qty: quantity,
				total_price: parseFloat(quantity * item.price).toFixed(2),
				total_with_pdv: parseFloat(quantity * item.price_pdv).toFixed(2),
			};
			if (items.filter((e) => e.id === item.id).length == 0) {
				setItems([...items, { ...item, ...qtyObj }]);
			}
			setItemInputValue("");
			setItem("");
			setQuantity("");
		} else {
			alert("Artikal je već na listi");
		}
	}

	return (
		<>
			<Box sx={{ display: "flex", m: 1, bgcolor: "white", ps: 1 }}>
				<Autocomplete
					{...defaultProps}
					onChange={handleItemChange}
					value={item}
					inputValue={itemInputValue}
					id="auto-complete"
					autoComplete
					size="small"
					sx={{ minWidth: 500, flex: 0.4 }}
					renderInput={(params) => (
						<>
							<TextField
								{...params}
								label={supplierName + " - lista artikala"}
								varisant="standard"
							/>
						</>
					)}
				/>
				<TextField
					value={quantity}
					inputRef={(qtyRef) => {
						if (item) {
							qtyRef && qtyRef.focus();
						}
					}}
					onChange={handleQuantityChange}
					sx={{ minWidth: 100, ml: 1, flex: 0.1 }}
					id="standard-basic"
					size="small"
					label="Količina"
					type="number"
					variasnt="standard"
					onFocus={(event) => {
						event.target.select();
					}}
				/>
				<Box
					sx={{
						m: "auto 10px",
						flex: 0.5,
						display: "flex",
						justifyContent: "space-between",
					}}>
					<Button
						onClick={handleAddClick}
						sx={{ width: 100 }}
						variant="contained"
						color="success"
						startIcon={<AddBoxIcon />}
						size="small">
						Dodaj
					</Button>
					<Button
						sx={{ width: 100 }}
						variant="contained"
						startIcon={<SaveIcon />}
						size="small">
						Naruči
					</Button>
				</Box>
			</Box>
			<Box sx={{ m: 1, ps: 1, bgcolor: "white" }}>
				<Button
					onClick={handleDeleteRowsClick}
					// sx={{ ml: 10 }}
					size="small"
					variant="contained"
					startIcon={<DeleteIcon />}>
					Obriši selektovane redove
				</Button>
			</Box>
			<Box sx={{ m: 1, bgcolor: "white", height: "calc(100%  - 200px) " }}>
				<DataGrid
					density="compact"
					rows={items}
					columns={columns}
					pageSize={11}
					editMode="cell"
					rowsPerPageOptions={[11]}
					checkboxSelection={true}
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
					footer={<div>dsa</div>}
				/>
			</Box>
		</>
	);
}

export default Supplier;
