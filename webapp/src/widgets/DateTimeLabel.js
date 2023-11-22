import moment from "moment";

export default function DateTimeLabel(props) {
  return (
    <>
      {moment(props.timestamp).format("MMM DD, YYYY")} <br />{" "}
      <span className="datetime-humanized">
        {moment(props.timestamp).fromNow()}
      </span>
    </>
  );
}
