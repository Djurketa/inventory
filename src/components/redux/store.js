import { configureStore } from "@reduxjs/toolkit";
// import { surveyApi } from "../services/surveyApi";
import zaglavlje from "./slices/zaglavljeSlice";
// import surveysReducer from "../slices/surveysSlice";
export default configureStore(
	{
		reducer: {
			// aleksa: [],
			zaglavlje: zaglavlje,
			// surveys: surveysReducer,
			// [surveyApi.reducerPath]: surveyApi.reducer,
		},
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
