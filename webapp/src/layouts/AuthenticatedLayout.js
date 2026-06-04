import { auth } from "../services/firebase";
import { signInWithGoogle } from "../services/auth";
import { useEffect, useState } from "react";
import BasicLayout from "./BasicLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InventoryIcon from "@mui/icons-material/Inventory2";
import GoogleIcon from "@mui/icons-material/Google";
import Loader from "../widgets/Loader";

function LoginScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 3,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "18px",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(99, 102, 241, 0.35)",
          mb: 1,
        }}
      >
        <InventoryIcon sx={{ fontSize: 32, color: "#fff" }} />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Ventory
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Sign in to manage your inventory
      </Typography>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: "0.95rem",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
          },
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
}

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

  if (loading) {
    return (
      <BasicLayout {...props}>
        <Loader message="Verifying authentication." />
      </BasicLayout>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return <BasicLayout {...props}>{props.children}</BasicLayout>;
}
