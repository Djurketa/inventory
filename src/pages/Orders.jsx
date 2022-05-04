import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import suppliers_service from "../JSON/suppliers.json";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Orders() {
	const [suppliers, setSuppliers] = useState([]);
	const [fillteredSuppliers, setFillteredSuppliers] = useState("");
	useEffect(() => {
		//sumulacija async servisa
		setTimeout(function () { setSuppliers(suppliers_service); }, 100);
	}, []);
	//za listu pretraga display and return value
	const suppliersSelectList = suppliers.map(supplier => {
		return { label: supplier.name, id: supplier.id };

	});

	function handleFilteredSuppliersKeyUp(event) {
		const val = event.target.value.toLowerCase();
		setFillteredSuppliers(val);
	}
	function handleFilteredSuppliersChange(event, value) {
		if (value != null) { setFillteredSuppliers(value.label.toLowerCase()); } else {
			setFillteredSuppliers("");
		};
	}

	return <>
		<Autocomplete
			onKeyUp={handleFilteredSuppliersKeyUp}
			onChange={handleFilteredSuppliersChange}
			size="small"
			sx={{ m: 1, bgcolor: 'white', width: 300 }}
			disablePortal
			id="combo-box-demo"
			options={suppliersSelectList}
			renderInput={(params) => <TextField {...params} label="Pretraga dobavljaca" />}
		/>
		<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
			{suppliers.map((suplier, i) => {
				if (suplier.name.toLowerCase().includes(fillteredSuppliers) || fillteredSuppliers == "") {
					return <Card key={i} sx={{ width: 200, m: 1 }}>
						<CardMedia
							component="img"
							height="80"
							image={suplier["img-url"]}
						/>
						<CardContent>
							<Typography gutterBottom variant="h6" component="div">
								{suplier.name}
							</Typography>
						</CardContent>
					</Card>;
				}
			})}
		</Box>
	</>;
}

