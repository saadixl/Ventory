import Grid from "@mui/material/Grid";

import EditForm from "../widgets/EditForm";
import { addInventoryItem } from "../services/api";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

function AddNewItem() {
  return (
    <AuthenticatedLayout screenName="Add new item" activeScreen="addnewitem">
      <Grid container spacing={3} className="add-item-container">
        <EditForm action={addInventoryItem} />
      </Grid>
    </AuthenticatedLayout>
  );
}

export default AddNewItem;