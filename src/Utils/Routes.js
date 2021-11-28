import AllFiles from "../Pages/AllFiles";
import Home from "../Pages/Home";
import Archived from "../Pages/Archived";
import Login from "../Pages/Login";
import Users from "../Pages/Users";

export const Routes = [
  { path: "/", component: Home, exact: true },
  { path: "/users", component: Users },

  { path: "/all-files", component: AllFiles },
  { path: "/archived", component: Archived },
];
