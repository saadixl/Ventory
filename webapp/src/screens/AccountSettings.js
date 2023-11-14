import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";
import BasicLayout from "../layouts/BasicLayout";
import { signInWithGoogle, signOut } from "../services/auth";
import { auth } from "../services/firebase";
import Loader from "../widgets/Loader";

function AccountSettings() {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
      } else {
        setName();
      }
      setLoading(false);
    });
  }, []);

  let settingComponents = <Loader message="Verifying authentication." />;

  if (!loading) {
    settingComponents = name ? (
      <>
        <p>Logged in as {name}</p>
        <Button
          onClick={signOut}
          startIcon={<LogoutIcon />}
          size="large"
          variant="contained"
          color="error"
        >
          Logout
        </Button>
      </>
    ) : (
      <Button
        onClick={signInWithGoogle}
        startIcon={<GoogleIcon />}
        size="large"
        variant="contained"
      >
        Login with Google
      </Button>
    );
  }
  return (
    <BasicLayout screenName="Account settings" activeScreen="accountsettings">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          {settingComponents}
        </Grid>
      </Grid>
    </BasicLayout>
  );
}

export default AccountSettings;
