import AllFiles from "../Pages/AllFiles";
import Home from "../Pages/Home";
import Archived from "../Pages/Archived";
import Login from "../Pages/Login";

export const Routes = [
  { path: "/", component: Home, exact: true },
  { path: "/archived", component: Archived },
  { path: "/login", component: Login },
  { path: "/all-files", component: AllFiles },
];
