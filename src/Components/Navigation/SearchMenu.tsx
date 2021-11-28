import * as React from "react";
import SearchItem from "./SearchItem";
import DocResultInfo from "./DocResultInfo";

export default function SearchMenu({ searchResult, setSelectedFile }) {
  return (
    <div className="searchbox">
      {searchResult.map((result) => (
        <SearchItem setSelectedFile={setSelectedFile} result={result} />
      ))}
    </div>
  );
}
