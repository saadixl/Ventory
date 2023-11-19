import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import AddNewItem from "./screens/AddNewItem";
import InventorySettings from "./screens/InventorySettings";
import AccountSettings from "./screens/AccountSettings";
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
      path: "/inventory-settings",
      component: InventorySettings,
    },
    {
      path: "/account-settings",
      component: AccountSettings,
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
