import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";

export default function SearchItem({ result, setSelectedFile }) {
  return (
    <div
      className="searchbox__item"
      onClick={() => setSelectedFile(result)}
      onMouseDown={() => setSelectedFile(result)}
    >
      <div className="searchbox__item-info">
        <DescriptionIcon />
        <div className="data">
          <span className="file">{result.name}</span>
          <span className="owner">
            {result.userName} {result.userLastname}
          </span>
        </div>
      </div>
      <div className="searchbox__item-date">
        {new Date(result.createdAt).toLocaleDateString("es-MX")}
      </div>
    </div>
  );
}
