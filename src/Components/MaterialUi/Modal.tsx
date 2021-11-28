import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Modal({
  user,
  modalOpen,
  setModalOpen,
  handleModalClickOpen,
  handleModalClose,
  activateUser,
  deactivateUser,
  changeLevelUser,
  anchorEl,
  setAnchorEl,
  open,
  handleClick,
  handleClose,

  handleUserTypeClick,
  anchorElUserType,
  openUserTypeMenu,
  handleCloseUserType,
  changeUserType,
}) {
  if (!user) return <div></div>;
  return (
    <Dialog open={modalOpen} onClose={handleModalClose}>
      <DialogTitle>Usuario</DialogTitle>
      <DialogContent>
        <DialogContentText>Nombre</DialogContentText>
        <span>{user.name}</span>
        <DialogContentText>Apellidos</DialogContentText>
        <span>{user.lastname}</span>
        <DialogContentText>Correo</DialogContentText>
        <span>{user.email}</span>
        <DialogContentText>Nivel de usuario {user.userLevel}</DialogContentText>
        <Button onClick={handleClick}>Cambiar nivel de usuario</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            disabled={user.userLevel === 1}
            onClick={() => {
              changeLevelUser(1);
            }}
          >
            Nivel 1
          </MenuItem>
          <MenuItem
            disabled={user.userLevel === 2}
            onClick={() => {
              changeLevelUser(2);
            }}
          >
            Nivel 2
          </MenuItem>
          <MenuItem
            disabled={user.userLevel === 3}
            onClick={() => {
              changeLevelUser(3);
            }}
          >
            Nivel 3
          </MenuItem>
        </Menu>
        <DialogContentText>
          Este usuario es un {user.isAdmin ? "Adminsitrador" : "Empleado"}
        </DialogContentText>
        <Button onClick={handleUserTypeClick}>Cambiar tipo de usuario</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElUserType}
          open={openUserTypeMenu}
          onClose={handleCloseUserType}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            disabled={!user.isAdmin}
            onClick={() => {
              changeUserType(false);
            }}
          >
            Empleado
          </MenuItem>
          <MenuItem
            disabled={user.isAdmin}
            onClick={() => {
              changeUserType(true);
            }}
          >
            Administrador
          </MenuItem>
        </Menu>

        <DialogContentText>
          La cuenta de esta en estado {user.isActive ? "activo" : "por validar"}
        </DialogContentText>
        {!user.isActive ? (
          <Button onClick={activateUser}>Activar cuenta</Button>
        ) : (
          <Button onClick={deactivateUser}>Desactivar cuenta</Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button onClick={handleModalClose}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
}
