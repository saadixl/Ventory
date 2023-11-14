import CircularProgress from "@mui/material/CircularProgress";
export default function Loader(props) {
  return (
    <>
      <CircularProgress /> {props.message}
    </>
  );
}
