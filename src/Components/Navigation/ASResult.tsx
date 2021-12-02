import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export default function ASResult(props: any) {
  return (
    <div>
      <h3>Resultados</h3>
      <div>
        {props.files.map((file) => (
          <Box margin="10px 0" display="flex" justifyContent="space-between">
            <h4>{file.name}</h4>

            <div>
              <Button>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href={file.path}
                  target="_blank"
                >
                  Descargar
                </a>
              </Button>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}
