import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({
  authentication,
  component: Component,
  ...restOfProps
}) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        authentication.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
