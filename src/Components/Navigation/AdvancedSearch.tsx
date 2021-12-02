import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { db, storage } from "../../firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import axios from "axios";
import ASResult from "./ASResult";

import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  zIndex: 1,
  p: 4,
};

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

export default function AdvancedSearch({
  openAS,
  setOpenAS,
  handleOpenAS,
  handleCloseAS,
}) {
  const [text, setText] = React.useState("");
  const [filesRes, setFilesRes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchFinished, setSearchFinished] = React.useState(false);
  const [noFiles, setNoFiles] = React.useState(false);

  const getTextFiles = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:3000/", { text })
      .then((res) => {
        const { resultFiles } = res.data;
        setLoading(false);

        console.log(resultFiles);

        setFilesRes(resultFiles);
        setSearchFinished(true);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);

        setNoFiles(true);
        setSearchFinished(true);
      });
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAS}
        onClose={handleCloseAS}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={handleOpenAS}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Búsqueda avanzada
            </Typography>
            {!searchFinished ? (
              <>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <CssTextField
                    size="small"
                    id="outlined-basic"
                    label="Texto"
                    variant="outlined"
                    name="text"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                </Typography>
                <Box marginTop="20px">
                  <Button onClick={getTextFiles}>Buscar</Button>
                </Box>
              </>
            ) : noFiles ? (
              <div>
                <h2>No hubo coincidencias</h2>
              </div>
            ) : (
              <ASResult files={filesRes} />
            )}
            {searchFinished && (
              <Box>
                <Button
                  onClick={() => {
                    setSearchFinished(false);
                    setNoFiles(false);
                    setFilesRes([]);
                  }}
                >
                  Volver a buscar
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
