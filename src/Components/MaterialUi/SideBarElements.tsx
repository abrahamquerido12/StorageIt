import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import HomeIcon from "@mui/icons-material/Home";
import Logo from "../../assets/images/logo.png";

import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { auth, db, storage } from "../../firebase.config";
import { collection, addDoc } from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { AuthContext } from "../../AuthCtx";

import MenuItem from "@mui/material/MenuItem";
import { StyledMenu } from "../Dashboard/Common/Menu";

import { getAuth, signOut } from "firebase/auth";
import { helperFunctions } from "../../Utils/helpers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { FilesContext } from "../../FilesCtx";
import { Link } from "react-router-dom";
import SearchMenu from "../Navigation/SearchMenu";
import DocResultInfo from "../Navigation/DocResultInfo";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AdvancedSearch from "../Navigation/AdvancedSearch";

const drawerWidth = 240;
export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const SideBarDrawer = ({
  open,
  handleDrawerClose,
  theme,
  inputEl,
  upload,
  userData,
}) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img src={Logo} alt="logo" />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            inputEl.current.click();
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Subir archivo"} />
          <input
            ref={inputEl}
            type="file"
            className="btn sidebar__upload-btn"
            onChange={upload}
            style={{ display: "none" }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Inicio"} />
          </ListItem>
        </Link>
        {/* admin */}
        {userData.isAdmin && (
          <Link to="/users">
            <ListItem button>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItem>
          </Link>
        )}
        <Link to="/all-files">
          <ListItem button>
            <ListItemIcon>
              <InsertDriveFileIcon />
            </ListItemIcon>
            <ListItemText primary={"Archivos"} />
          </ListItem>
        </Link>
        <Link to="/archived">
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={"Eliminados"} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export const SideBarToolBar = ({
  open,
  handleDrawerOpen,
  searchVal,
  handleSearch,
  handleClick,
  anchorEl,
  openMenu,
  handleClose,
  handleSignOut,
  setSearching,
  searchResult,
  searching,
}) => {
  const [anchorElSearch, setAnchorElSearch] =
    React.useState<null | HTMLElement>(null);
  const openSearch = Boolean(anchorEl);
  const handleClickSearch = (event: any) => {
    setAnchorElSearch(event.currentTarget);
  };
  const handleCloseSearch = () => {
    setAnchorElSearch(null);
  };

  const [focus, setFocus] = React.useState(false);
  const [openDocInfo, setOpenDocInfo] = React.useState(false);
  const handleDocInfoOpen = () => setOpenDocInfo(true);

  const [selectedFile, setSelectedFile] = React.useState<any>({});

  const handleFocus = () => {
    setSearching(true);
  };

  const handleBlur = () => {
    if (!selectedFile.name) {
      setSearching(false);
    }
  };

  const handleSelectedFile = (file) => {
    setSelectedFile(file);

    setOpenDocInfo(true);
  };

  const handleDocInfoClose = () => {
    setSelectedFile({});
    setOpenDocInfo(false);
  };

  const [openAS, setOpenAS] = React.useState(false);
  const handleOpenAS = () => setOpenAS(true);
  const handleCloseAS = () => setOpenAS(false);

  console.log(openAS);

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <div className="navbar">
        <Input
          id="standard-adornment-amount"
          value={searchVal}
          onChange={(e) => handleSearch(e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          startAdornment={
            <InputAdornment position="start">
              {" "}
              <SearchIcon />{" "}
            </InputAdornment>
          }
        />
        <div className="navbar__options">
          <ul>
            <li onClick={handleOpenAS}>
              <ManageSearchIcon />{" "}
            </li>
            <li onClick={handleClick}>
              <PersonIcon />{" "}
            </li>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSignOut} disableRipple>
                Cerrar Sesión
              </MenuItem>
            </StyledMenu>
          </ul>
        </div>
        {searching && (
          <SearchMenu
            setSelectedFile={handleSelectedFile}
            searchResult={searchResult}
          />
        )}
        <DocResultInfo
          handleDocInfoClose={handleDocInfoClose}
          file={selectedFile}
          openDocInfo={openDocInfo}
          setOpenDocInfo={setOpenDocInfo}
        />
      </div>
      {openAS && (
        <AdvancedSearch
          handleCloseAS={handleCloseAS}
          handleOpenAS={handleOpenAS}
          openAS={openAS}
          setOpenAS={setOpenAS}
        />
      )}
    </Toolbar>
  );
};
