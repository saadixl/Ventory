import Grid from "@mui/material/Grid";
import EditForm from "../widgets/EditForm";
import { editItem } from "../services/api";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { useLocation } from "react-router-dom";

function EditItem() {
  const { state } = useLocation();
  return (
    <AuthenticatedLayout screenName="Add new item" activeScreen="addnewitem">
      <Grid container spacing={3} className="add-item-container">
        <EditForm action={editItem} data={state} />
      </Grid>
    </AuthenticatedLayout>
  );
}

export default EditItem;
