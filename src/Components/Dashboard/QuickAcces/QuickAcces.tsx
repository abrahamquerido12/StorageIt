import React from "react";
import DocCard from "./DocCard";

export default function QuickAcces() {
  return (
    <div className="quick-access">
      <h2>Acceso Rápido</h2>
      <div className="quick-access__docs-container">
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
      </div>
    </div>
  );
}
