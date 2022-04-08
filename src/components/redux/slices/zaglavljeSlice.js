import { SettingsEthernet } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = "http://localhost:8080";
// const baseUrl = "https://surveyapp2022.herokuapp.com";

const defaultState = {
	columnNames: [
		"",
		"Ime",
		"Prezime",
		"Ulica1",
		"Ulica2",
		"Grad",
		"Država",
		"Pošta",
		"E-mail",
	],
};
export const getZaglavljeAsync = createAsyncThunk(
	"zaglavlje/getZaglavljeAsync",
	async (payload) => {
		const response = await fetch(
			baseUrl + "/ords/bapoteka/database/getcustomers"
		);
		if (response.ok) {
			const survey = await response.json();
			return survey;
		}
	}
);
export const zaglavljeSlice = createSlice({
	name: "zaglavlje",
	initialState: defaultState,
	reducers: {
		setTableCell: (state, { payload }) => {
			const newArr = state.items.map((obj) => {
				if (obj.customer_id == payload.id) {
					return { ...obj, [payload.column]: payload.data };
				}
				return obj;
			});
			console.log(payload, newArr);
			return { ...state, ...{ items: newArr } };
		},
	},
	extraReducers: {
		[getZaglavljeAsync.fulfilled]: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { setTableCell } = zaglavljeSlice.actions;
export default zaglavljeSlice.reducer;
