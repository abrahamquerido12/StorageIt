import { TableCell, TableRow } from "@mui/material";
import React, { useContext } from "react";

import MenuItem from "@mui/material/MenuItem";

import { StyledMenu } from "../Common/Menu";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import { parse, format } from "exif-date";
import { db } from "../../../firebase.config";
import { AuthContext } from "../../../AuthCtx";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { helperFunctions } from "../../../Utils/helpers";
import { FilesContext } from "../../../FilesCtx";

export default function File({ file, user, archived }) {
  const { files, getFiles } = useContext(FilesContext);

  const bytesToMegaBytes = (bytes) => bytes / (1024 * 1024);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await helperFunctions
      .DeleteFile(file.uid)
      .then(() => {
        handleClose();
        getFiles();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleRestore = async () => {
    await helperFunctions
      .RestoreFile(file.uid)
      .then(() => {
        handleClose();
        getFiles();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setAsQuickAccess = async () => {
    const userRef = doc(db, `users/${user.uid}`);
    await updateDoc(userRef, {
      quickAccessFiles: arrayUnion(file.uid),
    });

    handleClose();
    // getQuickAccessFiles();
  };

  return (
    <TableRow
      key={file.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {file.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {file.userId === user.uid
          ? "Tú"
          : `${file.userName} ${file.userLastname}`}
      </TableCell>
      <TableCell align="right">{format(new Date(file.createdAt))}</TableCell>
      <TableCell align="right">{format(new Date(file.lastModify))}</TableCell>
      <TableCell align="right">{formatBytes(file.size)}</TableCell>
      <TableCell align="right">
        <button onClick={handleClick}>...</button>
      </TableCell>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!archived && (
          <MenuItem onClick={handleClose} disableRipple>
            <FileDownloadIcon />
            <a
              style={{ textDecoration: "none", color: "black" }}
              href={file.path}
              target="_blank"
              rel="noreferrer"
            >
              Descargar
            </a>
          </MenuItem>
        )}
        <MenuItem onClick={setAsQuickAccess} disableRipple>
          <PushPinIcon />
          Anclar a acceso rápido
        </MenuItem>
        {!archived ? (
          <MenuItem onClick={handleDelete} disableRipple>
            <DeleteIcon />
            Eliminar
          </MenuItem>
        ) : (
          <MenuItem onClick={handleRestore} disableRipple>
            <RestoreFromTrashIcon />
            Restaurar{" "}
          </MenuItem>
        )}
      </StyledMenu>
    </TableRow>
  );
}
