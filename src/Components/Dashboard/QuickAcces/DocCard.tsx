import React from "react";

export default function DocCard({ file, handleSelectedFile }) {
  if (!file[0]) return <div></div>;
  return (
    <div
      className="doc-card"
      onClick={() => {
        handleSelectedFile(file[0]);
      }}
    >
      <i className="far fa-file-alt"></i>
      <h3>{file && file[0] && file[0].name}</h3>
    </div>
  );
}
