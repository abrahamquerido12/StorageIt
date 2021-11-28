import "./App.css";
import "./styles/main.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Routes } from "./Utils/Routes";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import AuthProvider from "./AuthCtx";
import Register from "./Pages/Register";
import MiniDrawer from "./Components/MaterialUi/SideBar";
import AllFiles from "./Pages/AllFiles";
import FilesProvider from "./FilesCtx";

function App() {
  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true,
  });

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthState({
            authenticated: true,
            initializing: false,
          });
        } else {
          setAuthState({
            authenticated: false,
            initializing: false,
          });
        }
      }),
    [setAuthState]
  );

  if (authentication.initializing) {
    return <div>Loading</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <FilesProvider>
            <MiniDrawer>
              {Routes.map(({ path, component, exact }) => (
                <ProtectedRoute
                  authentication={authentication}
                  path={path}
                  component={component}
                  exact={exact}
                />
                // <Route path={path} component={component} exact={exact} />
              ))}
            </MiniDrawer>
          </FilesProvider>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
