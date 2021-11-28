import CustomCard from "../Components/MaterialUi/Card";
import Logo from "../assets/images/Logo-black.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { auth } from "../firebase.config";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { helperFunctions } from "../Utils/helpers";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#3A5064",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3A5064",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "#3A5064",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3A5064",
    },
  },
});

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#3A5064",
  borderColor: "#3A5064",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(undefined);

  const [inputErros, setInputErros] = useState({
    name: false,
    lastName: false,
    email: false,
    password: false,
    repassword: false,
  });

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const validateInputs = () => {
    var error = false;
    var errors = {
      name: false,
      lastName: false,
      email: false,
      password: false,
      repassword: false,
    };
    if (!name) {
      errors.name = true;
      error = true;
    }
    if (!lastName) {
      errors.lastName = true;
      error = true;
    }
    if (!email) {
      errors.email = true;
      error = true;
    }
    if (!password) {
      errors.password = true;
      error = true;
    }
    if (!repassword) {
      errors.repassword = true;
      error = true;
    }
    if (password !== repassword) {
      errors.password = true;
      errors.repassword = true;
      error = true;
    }

    setInputErros({ ...errors });
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) return;
    e.preventDefault();

    var resUSerRegistration = await helperFunctions.CreateUser(email, password);
    if (!resUSerRegistration.status) {
      const { code } = resUSerRegistration.message;
      if (code === "auth/email-already-in-use") {
        return setError("Este correo ya esta registrado");
      } else {
        return setError(
          "Ocurrió un error. Favor de validar sus datos o intentar mas tarde"
        );
      }
    }

    const uid = resUSerRegistration.message;

    const res = await helperFunctions.GenerateUserData(
      uid,
      name,
      lastName,
      email
    );
    if (!res) return setError("Ocurrió un error, favor de intentar mas tarde");
    setOpenSuccess(true);
    setTimeout(() => {
      props.history.push("/login");
    }, 3000);
  };

  //success

  return (
    <div className="login">
      <CustomCard>
        <div>
          <img src={Logo} alt="sotrage it logo" />
        </div>
        <form onSubmit={handleSubmit} action="submit">
          <h3>Registro</h3>
          <CssTextField
            size="small"
            id="outlined-basic"
            label="Nombre(s)"
            variant="outlined"
            name="name"
            error={inputErros.name}
            value={name}
            onChange={(e) => {
              setInputErros({
                name: false,
                lastName: false,
                email: false,
                password: false,
                repassword: false,
              });

              setName(e.target.value);
            }}
          />
          <CssTextField
            size="small"
            id="outlined-basic"
            label="Apellidos"
            variant="outlined"
            name="lastname"
            error={inputErros.lastName}
            value={lastName}
            onChange={(e) => {
              setInputErros({
                name: false,
                lastName: false,
                email: false,
                password: false,
                repassword: false,
              });

              setLastName(e.target.value);
            }}
          />
          <CssTextField
            size="small"
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            name="email"
            error={inputErros.email}
            value={email}
            onChange={(e) => {
              setInputErros({
                name: false,
                lastName: false,
                email: false,
                password: false,
                repassword: false,
              });

              setEmail(e.target.value);
            }}
          />
          <CssTextField
            size="small"
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password"
            error={inputErros.password}
            onChange={(e) => {
              setInputErros({
                name: false,
                lastName: false,
                email: false,
                password: false,
                repassword: false,
              });

              setPassword(e.target.value);
            }}
            value={password}
          />
          <CssTextField
            size="small"
            id="outlined-basic"
            label="Repetir Contraseña"
            variant="outlined"
            error={inputErros.repassword}
            type="password"
            name="repassword"
            onChange={(e) => {
              setInputErros({
                name: false,
                lastName: false,
                email: false,
                password: false,
                repassword: false,
              });

              setRePassword(e.target.value);
            }}
            value={repassword}
          />
          <BootstrapButton type="submit" size="large" variant="contained">
            Registrarme
          </BootstrapButton>

          <Link to="/login">
            <a href="">¿Ya tienes una cuenta? Inicia sesión</a>
          </Link>

          {/* <a href="">Recuperar contraseña</a> */}
        </form>
      </CustomCard>

      <Snackbar open={error} autoHideDuration={8000} onClose={handleCloseError}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={8000}
        onClose={handleCloseSuccess}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Tu cuenta ha sido registrada. Favor de esperar la validación del
          Administrador
        </Alert>
      </Snackbar>
    </div>
  );
}
