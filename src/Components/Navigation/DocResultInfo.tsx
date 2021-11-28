import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { helperFunctions } from "../../Utils/helpers";
import { FilesContext } from "../../FilesCtx";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function DocResultInfo({
  file,
  openDocInfo,
  setOpenDocInfo,
  handleDocInfoClose,
}) {
  const { getFiles } = React.useContext(FilesContext);

  const [text, setText] = React.useState("");

  const handleArchivedClick = async () => {
    if (!file.archived) {
      await helperFunctions.DeleteFile(file.uid);
      getFiles();
    } else {
      await helperFunctions.RestoreFile(file.uid);
      getFiles();
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openDocInfo}
      onClose={handleDocInfoClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className="docInfo"
    >
      <Fade in={openDocInfo}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {file.name}
          </Typography>
          {file.archived && (
            <Typography
              id="transition-modal-title"
              variant="caption"
              component="h2"
            >
              Este archivo se encuentra archivado
            </Typography>
          )}

          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handleArchivedClick}>
              {file.archived ? "Restaurar" : "Archivar"}
            </Button>
            <Button>
              <a href={file.path} target="__blank">
                Descargar
              </a>
            </Button>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
