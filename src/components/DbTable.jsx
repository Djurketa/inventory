import { ConstructionOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { FormControlLabel } from "@mui/material/FormControlLabel";
function DbTable({ tableName, dropdowns }) {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    fetch(`./${tableName}.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTableData(data);
        setTableColumns(Object.getOwnPropertyNames(data[0]));
      });
  }, []);

  function parseInput(row, column) {
    return (
      <input
        column={column}
        list={column}
        id={row.id}
        onChange={handleNameChange}
        nama={row.id}
        value={row[column]}
      />
    );
  }
  function handleNameChange(e) {
    const payload = {
      id: e.target.id,
      data: e.target.value,
      column: e.target.getAttribute("column"),
    };
    const newState = tableData.map((obj) => {
      if (obj.id == payload.id) {
        return { ...obj, [payload.column]: payload.data };
      }
      return obj;
    });
    setTableData(newState);
  }

  return (
    <>
      <form action="">
        <datalist id="Dobaljač">
          <option value="1">Nektar Doo</option>
          <option value="1">Jelen Doo</option>
        </datalist>
        <table className="primary-table">
          <thead>
            <tr>
              {tableColumns.map((column, i) => {
                return (
                  <th key={i} align="left">
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, i) => {
              return (
                <tr>
                  {tableColumns.map((column) => {
                    return <td>{parseInput(row, column)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </>
  );
}

export default DbTable;
