import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import { auth } from "../../firebase.config";
import { AuthContext } from "../../AuthCtx";

import { signOut } from "firebase/auth";
import { helperFunctions } from "../../Utils/helpers";
import { FilesContext } from "../../FilesCtx";

import {
  DrawerHeader,
  AppBar,
  SideBarDrawer,
  SideBarToolBar,
} from "./SideBarElements";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MiniDrawer(props) {
  const { files, getFiles } = React.useContext(FilesContext);

  const inputEl = React.useRef(null);
  const { user, userData } = React.useContext(AuthContext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSuccess(false);

      return;
    }

    setOpenSuccess(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [searchVal, setSearchVal] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    const res = helperFunctions.SearchFile(files, e.target.value);
    setSearchResult(res);
  };

  const upload = async (e) => {
    var files = e.target.files;
    var docToUpload = files[0];

    const metaData = {
      contentType: docToUpload.type,
    };
    const snapshot = await helperFunctions.UploadFile(
      user.uid,
      docToUpload.name,
      docToUpload,
      metaData
    );

    if (!snapshot) return alert("Ocurrió un error al subir el documento");
    const { name, lastname, userLevel } = userData;

    const saveFileDataRes = await helperFunctions.SaveFileData(
      snapshot,
      user.uid,
      name,
      lastname,
      userLevel
    );
    if (!saveFileDataRes)
      return alert("Ocurrió un error al subir el documento");

    setOpenSuccess(true);
    getFiles();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <SideBarToolBar
          searchResult={searchResult}
          setSearching={setSearching}
          searching={searching}
          handleSearch={handleSearch}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          handleDrawerOpen={handleDrawerOpen}
          handleSignOut={handleSignOut}
          openMenu={openMenu}
          searchVal={searchVal}
          open={open}
        />
      </AppBar>
      {/* Sidebar menu */}
      <SideBarDrawer
        userData={userData}
        handleDrawerClose={handleDrawerClose}
        inputEl={inputEl}
        open={open}
        theme={theme}
        upload={upload}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Archivo cargado exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}
