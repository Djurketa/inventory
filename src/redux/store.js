import { configureStore } from "@reduxjs/toolkit";
import { nomenclaturesApi } from "../redux_api/nomenclatures";

export default configureStore(
	{
		reducer: {
			askd: [{ user_id: 1231, main_ou_id: 100, ou_id: 200 }],
			[nomenclaturesApi.reducerPath]: nomenclaturesApi.reducer,
			// surveys: surveysReducer,
			// [surveyApi.reducerPath]: surveyApi.reducer,
		},
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
