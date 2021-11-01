import { Input, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar() {
  const [searchVal, setSearchVal] = React.useState("");

  return (
    <div className="navbar">
      <Input
        id="standard-adornment-amount"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            {" "}
            <SearchIcon />{" "}
          </InputAdornment>
        }
      />
      <div className="navbar__options">
        <ul>
          <li>
            <HelpIcon />{" "}
          </li>
          <li>
            <SettingsIcon />{" "}
          </li>
          <li>
            <PersonIcon />{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
