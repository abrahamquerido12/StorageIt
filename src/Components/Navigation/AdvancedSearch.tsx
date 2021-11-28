import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",

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

  const getTextFiles = async () => {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/storageit-48a03.appspot.com/o/files%2F3PBCZ9OQmvh8TogNvOiH1UbaYPx1%2Fprueba2.txt?alt=media&token=23e934f5-898b-4291-97ab-6a23759c739a"
    )
      .then((r) => r.text())
      .then((text) => {
        console.log(text);
      });
  };

  React.useEffect(() => {
    getTextFiles();
  }, []);

  return (
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
            <Button>Buscar</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
