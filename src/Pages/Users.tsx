import React, { useContext, useEffect, useState } from "react";
import UsersTable from "../Components/Dashboard/Users/UsersTable";
import { helperFunctions } from "../Utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../Components/MaterialUi/Modal";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../AuthCtx";
import { useHistory } from "react-router";

export default function Users() {
  const history = useHistory();
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [openSuccess, setOpenSuccess] = useState(false);

  //user level menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElUserType, setAnchorElUserType] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openUserTypeMenu = Boolean(anchorElUserType);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserTypeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUserType(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseUserType = () => {
    setAnchorElUserType(null);
  };

  const getUsers = async () => {
    const usersArr = await helperFunctions.GetUsersList();

    setUsers(usersArr);
  };

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClickOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const setSelectedUserData = (id) => {
    const data = users.find((user) => user.uid === id);
    setSelectedUser(data);
    handleModalClickOpen();
  };

  const activateUser = async () => {
    const { uid } = selectedUser;
    await helperFunctions
      .SetUserActive(uid, true)
      .then(() => {
        console.log("Actualiazdo con éxito");
        getUsers();
        handleModalClose();
        setOpenSuccess(true);
      })

      .catch((e) => console.log("Ocurrió un error: ", e));
  };
  const deactivateUser = async () => {
    const { uid } = selectedUser;
    await helperFunctions
      .SetUserActive(uid, false)
      .then(() => {
        console.log("Actualiazdo con éxito");
        getUsers();
        handleModalClose();
        setOpenSuccess(true);
      })

      .catch((e) => console.log("Ocurrió un error: ", e));
  };

  const changeLevelUser = async (level) => {
    const { uid } = selectedUser;
    await helperFunctions
      .ChangeLevelUser(uid, level)
      .then(() => {
        console.log("Actualiazdo con éxito");
        getUsers();
        handleClose();
        handleModalClose();
        setOpenSuccess(true);
      })

      .catch((e) => console.log("Ocurrió un error: ", e));
  };

  const changeUserType = async (isAdmin) => {
    const { uid } = selectedUser;
    await helperFunctions
      .ChangeUserType(uid, isAdmin)
      .then(() => {
        console.log("Actualiazdo con éxito");
        getUsers();
        handleClose();
        handleModalClose();
        setOpenSuccess(true);
      })

      .catch((e) => console.log("Ocurrió un error: ", e));
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSuccess(false);

      return;
    }

    setOpenSuccess(false);
  };

  useEffect(() => {
    if (!userData.isAdmin) {
      history.push("/");
    }
    getUsers();
  }, []);
  return (
    <div className="users">
      <h2>Usuarios</h2>

      <div className="users_container">
        <UsersTable setSelectedUser={setSelectedUserData} users={users} />
      </div>
      <Modal
        changeLevelUser={changeLevelUser}
        activateUser={activateUser}
        deactivateUser={deactivateUser}
        user={selectedUser}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleModalClickOpen={handleModalClickOpen}
        handleModalClose={handleModalClose}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
        setAnchorEl={setAnchorEl}
        anchorElUserType={anchorElUserType}
        changeUserType={changeUserType}
        handleCloseUserType={handleCloseUserType}
        handleUserTypeClick={handleUserTypeClick}
        openUserTypeMenu={openUserTypeMenu}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          ¡Datos actualizados con éxito!
        </Alert>
      </Snackbar>
    </div>
  );
}
