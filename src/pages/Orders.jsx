import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useGetSuppliersQuery } from "../redux_api/nomenclatures";

export default function Orders() {
	const [fillteredSuppliers, setFillteredSuppliers] = useState("");
	//prima id logovanog korisnika

	const { data, isFetching } = useGetSuppliersQuery({ user_id: 1 });
	if (isFetching) {
		return <LinearProgress color="secondary" />;
	}
	const suppliers = data;

	const suppliersSelectList = suppliers.map((supplier) => {
		return { label: supplier.name, id: supplier.id };
	});

	function handleFilteredSuppliersKeyUp(event) {
		const val = event.target.value.toLowerCase();
		setFillteredSuppliers(val);
	}
	function handleFilteredSuppliersChange(event, value) {
		if (value != null) {
			setFillteredSuppliers(value.label.toLowerCase());
		} else {
			setFillteredSuppliers("");
		}
	}

	return (
		<>
			<Autocomplete
				onKeyUp={handleFilteredSuppliersKeyUp}
				onChange={handleFilteredSuppliersChange}
				size="small"
				selectOnFocus
				sx={{ m: 2, bgcolor: "white", width: 300 }}
				options={suppliersSelectList}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="standard"
						label="Pretraga dobavljaca"
					/>
				)}
			/>
			<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "" }}>
				{suppliers.map((supplier, i) => {
					if (
						supplier.name.toLowerCase().includes(fillteredSuppliers) ||
						fillteredSuppliers == ""
					) {
						return (
							<Link
								key={i}
								to={`/dobavljac/${supplier.name}`}
								state={{ supplierId: supplier.id }}>
								<Card sx={{ width: 200, m: 2 }}>
									<CardMedia
										component="img"
										height="80"
										image={supplier["img-url"]}
									/>
									<CardContent>
										<Typography gutterBottom variant="h6" component="div">
											{supplier.name}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						);
					}
				})}
			</Box>
		</>
	);
}
