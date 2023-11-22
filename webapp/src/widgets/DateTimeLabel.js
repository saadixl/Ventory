import moment from "moment";

export default function DateTimeLabel(props) {
  return (
    <>
      {moment(props.timestamp).format("MMM DD, YYYY")} <br />{" "}
      <span className="muted">{moment(props.timestamp).fromNow()}</span>
    </>
  );
}
