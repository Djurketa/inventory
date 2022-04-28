import { configureStore } from "@reduxjs/toolkit";
export default configureStore(
	{
		reducer: {
			app: [{ user_id: 1231, main_ou_id: 100, ou_id: 200 }],
			// surveys: surveysReducer,
			// [surveyApi.reducerPath]: surveyApi.reducer,
		},
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
