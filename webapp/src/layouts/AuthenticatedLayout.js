import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import BasicLayout from "./BasicLayout";
import Alert from "@mui/material/Alert";
import Loader from "../widgets/Loader";

export default function AuthenticatedLayout(props) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  let childComponents = <Loader message="Verifying authentication." />;

  if (!loading) {
    childComponents = isLoggedIn ? (
      props.children
    ) : (
      <Alert severity="error">
        You don't have permission to see this page.
      </Alert>
    );
  }

  return <BasicLayout {...props}>{childComponents}</BasicLayout>;
}
