import * as React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";

import { Country } from "../models/country";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 160 },
  { field: "capital", headerName: "Capital", width: 160 },
  { field: "region", headerName: "Region", width: 160 },
  { field: "population", headerName: "Population", width: 160 },
];

type Props = {
  countries: Country[];
};

const DataGridCountry = ({ countries }: Props) => {
  const handleOnCellClick = (params: GridCellParams) => {
    const accept = window.confirm(
      `Do you want to delete ${params.id} from your list?`
    );
    if (!accept) return;

    alert("Mock deletion. Not really deleting. 😉");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={countries}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick={true}
        onCellClick={handleOnCellClick}
      />
    </div>
  );
};

export default DataGridCountry;
