import "./App.css";
import "./styles/main.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Routes } from "./Utils/Routes";

function App() {
  return (
    <Router>
      <Switch>
        {Routes.map(({ path, component, exact }) => (
          <Route path={path} component={component} exact={exact} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
