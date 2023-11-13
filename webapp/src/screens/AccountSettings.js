import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";

function AccountSettings() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Button startIcon={<GoogleIcon />} size="large" variant="contained">
          Login with Google
        </Button>
        <Button
          startIcon={<LogoutIcon />}
          size="large"
          variant="contained"
          color="error"
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

export default AccountSettings;
