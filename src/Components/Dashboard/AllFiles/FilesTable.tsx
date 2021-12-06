import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import File from "./File";
import Analyze from "../Analyze/Analyze";
function createData(
  name: string,
  createdAt: string,
  lastModify: string,
  size: string
) {
  return { name, createdAt, lastModify, size };
}

export default function FilesTable({ files, user, archived }) {
  const [openAnalyze, setOpenAnalyze] = React.useState(false);
  const handleOpenAnalyze = () => setOpenAnalyze(true);
  const handleCloseAnalyze = () => {
    setDocTo(null);
    setOpenAnalyze(false);
  };
  const [docToAnalyze, setDocTo] = React.useState<any>(null);

  const setDocToAnalyze = (file) => {
    console.log("clicked: ", { docToAnalyze, openAnalyze });
    setDocTo(file);
    setOpenAnalyze(true);
  };

  return (
    <div className="recent">
      <div className="recet__table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell align="right">Fecha de creación</TableCell>
                <TableCell align="right">Última edición</TableCell>
                <TableCell align="right">Tamaño</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files &&
                files
                  .filter((file) => (archived ? file.archived : !file.archived))
                  .map((file) => (
                    <File
                      setDocToAnalyze={setDocToAnalyze}
                      archived={archived}
                      file={file}
                      user={user}
                    />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Analyze
        docToAnalyze={docToAnalyze}
        openAnalyze={openAnalyze}
        handleCloseAnalyze={handleCloseAnalyze}
        handleOpenAnalyze={handleOpenAnalyze}
      />
    </div>
  );
}
