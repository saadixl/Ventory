import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import AddNewItem from "./screens/AddNewItem";
import Settings from "./screens/Settings";
import EditItem from "./screens/EditItem";

function App() {
  const routes = [
    {
      path: "/",
      component: Dashboard,
    },
    {
      path: "/add-new-item",
      component: AddNewItem,
    },
    {
      path: "/settings",
      component: Settings,
    },
    {
      path: "/edit-item/:id",
      component: EditItem,
    },
  ];

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
