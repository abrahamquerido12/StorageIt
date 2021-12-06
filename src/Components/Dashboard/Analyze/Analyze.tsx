import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

import { ArgumentScale, Stack } from "@devexpress/dx-react-chart";

const getValues = (words) => {
  const wordArr = [];
  for (const key in words) {
    wordArr.push({ word: key, count: words[key] });
  }
  return wordArr;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Analyze({
  openAnalyze,
  handleOpenAnalyze,
  handleCloseAnalyze,
  docToAnalyze,
}) {
  console.log(docToAnalyze);

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [words, setWords] = React.useState({});

  const getWordCount = async () => {
    console.log("getting word count");
    const res = await axios.get(
      `http://localhost:3000/analizar/${docToAnalyze.uid}`
    );

    if (!res.data) return;
    const chartData = getValues(res.data);

    setData([...chartData]);
    setLoading(false);
  };

  React.useEffect(() => {
    if (!docToAnalyze) return;
    getWordCount();
  }, []);

  React.useEffect(() => {
    if (!docToAnalyze) return;
    getWordCount();
  }, [docToAnalyze]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openAnalyze}
      onClose={() => {
        handleCloseAnalyze();
        setData([]);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openAnalyze}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Análisis {docToAnalyze?.name}
          </Typography>
          {!loading ? (
            <Paper>
              <Chart data={data}>
                <ArgumentScale />
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                  valueField="count"
                  argumentField="word"
                  name="No. Veces"
                />

                <Stack />
              </Chart>
            </Paper>
          ) : (
            <Typography id="transition-modal-title" variant="h6" component="h6">
              Cargando...
            </Typography>
          )}

          <Box width="100%" textAlign="center" marginTop="20px">
            <Button
              onClick={() => {
                handleCloseAnalyze();
                setData([]);
              }}
            >
              Salir
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
