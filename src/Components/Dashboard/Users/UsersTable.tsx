import * as React from "react";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 130 },
  { field: "name", headerName: "Nombre", width: 130, disableColumnMenu: true },
  {
    field: "lastname",
    headerName: "Apellidos",
    width: 130,
    disableColumnMenu: true,
  },
  { field: "email", headerName: "Correo", width: 250, disableColumnMenu: true },
  {
    field: "userLevel",
    headerName: "Nivel de usuario",
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "creationDate",
    headerName: "Fecha de registro",
    width: 170,
    resizable: true,
    disableColumnMenu: true,
  },

  {
    field: "isAdmin",
    headerName: "Tipo usuario",
    description: "This column has a value getter and is not sortable.",
    width: 160,
    disableColumnMenu: true,
  },
  {
    field: "isAdmin",
    headerName: "Tipo usuario",
    width: 160,
    disableColumnMenu: true,
  },
  {
    field: "isActive",
    headerName: "Estado",
    description: "This column has a value getter and is not sortable.",
    disableColumnMenu: true,
    width: 160,
  },
];

export default function UsersTable({ users, setSelectedUser }) {
  const [rows, setRows] = React.useState([]);

  const generateRows = () => {
    var genRows = [];
    users.map((user) => {
      const {
        uid,
        name,
        lastname,
        email,
        userLevel,
        creationDate,
        isAdmin,
        isActive,
      } = user;
      let row = {
        id: uid,
        lastname,
        name,
        email,
        userLevel,
        creationDate,
        isAdmin: isAdmin ? "Adminsitrador" : "Empleado",
        isActive: isActive ? "Activo" : "Por validar",
      };
      genRows.push(row);
    });

    setRows(genRows);
  };

  React.useEffect(() => {
    generateRows();
  }, [users]);
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        onSelectionModelChange={(id) => setSelectedUser(id[0])}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
}
