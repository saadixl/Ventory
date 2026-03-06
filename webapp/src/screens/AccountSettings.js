import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
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
      <Paper
        className="animate-fade-in"
        sx={{
          p: 4,
          background: "rgba(10, 15, 26, 0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(148, 163, 184, 0.08)",
          borderRadius: 3,
          maxWidth: 400,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            }}
          >
            <PersonIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
              Logged in as
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              {name}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={signOut}
          startIcon={<LogoutIcon />}
          fullWidth
          variant="outlined"
          sx={{
            borderColor: "rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            "&:hover": {
              borderColor: "rgba(239, 68, 68, 0.5)",
              backgroundColor: "rgba(239, 68, 68, 0.05)",
            },
          }}
        >
          Logout
        </Button>
      </Paper>
    ) : (
      <Paper
        className="animate-fade-in"
        sx={{
          p: 4,
          background: "rgba(10, 15, 26, 0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(148, 163, 184, 0.08)",
          borderRadius: 3,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            background: "rgba(99, 102, 241, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <PersonIcon sx={{ color: "#6366f1", fontSize: 28 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome to Ventory
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Sign in to manage your inventory
        </Typography>
        <Button
          onClick={signInWithGoogle}
          startIcon={<GoogleIcon />}
          fullWidth
          variant="contained"
          sx={{
            py: 1.2,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
            },
          }}
        >
          Login with Google
        </Button>
      </Paper>
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
