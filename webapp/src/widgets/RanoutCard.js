import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          You've just ran out of
        </Typography>
        <Typography variant="h5" component="div">
          Detergent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Cleaning item
        </Typography>
        <Typography variant="body2">
          You use detergent to wash your cloths and other fabrics. You used the
          detergent two days ago.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Restock</Button>
      </CardActions>
    </Card>
  );
}
