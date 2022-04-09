import React from "react";
import ReactDOM from "react-dom";
import store from "./components/redux/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Zaglavelje from "./components/Zaglavlje";
import DbTable from "./components/DbTable";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Zaglavelje /> */}
      <DbTable tableName={"items"} dropdowns={["Dobaljač"]} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// reportWebVitals(console.log);
