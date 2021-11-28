import CustomCard from "../Components/MaterialUi/Card";
import Logo from "../assets/images/Logo-black.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { auth } from "../firebase.config";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthCtx";
import { signOut } from "@firebase/auth";
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

export default function Login(props) {
  const { user, userData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  const handleSubmit = async (e) => {
    console.log(email, password);

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential);
        const { uid } = userCredential.user;

        const { isActive } = await helperFunctions.GetUserData(uid);
        if (!isActive) {
          signOut(auth);
          setError("Tu cuenta aún no ha sido activada por un administrador");
          return;
        }
        if (userCredential) props.history.push("/");
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === "auth/user-not-found") {
          setError(
            "Correo o contraseña incorrecta. Favor de validar sus datos"
          );
        } else {
          setError(
            "Ocurrió un error. Favor de validar sus datos o intentar mas tarde"
          );
        }
      });
  };

  return (
    <div className="login">
      <CustomCard>
        <div>
          <img src={Logo} alt="sotrage it logo" />
        </div>
        <form onSubmit={handleSubmit} action="submit">
          <h3>Inicia Seisón</h3>
          <CssTextField
            size="small"
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            name="email"
            value={email}
            onChange={(e) => {
              setError(undefined);
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
            onChange={(e) => {
              setError(undefined);

              setPassword(e.target.value);
            }}
            value={password}
          />
          <BootstrapButton type="submit" size="large" variant="contained">
            Iniciar Sesión
          </BootstrapButton>

          <Link to="/register">
            <a href="">¿No tienes cuenta? Regístrate</a>
          </Link>

          <a href="">Recuperar contraseña</a>
        </form>
      </CustomCard>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}
