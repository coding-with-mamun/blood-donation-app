import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  }

  const formattedTime = formatAMPM(time);

  return (
    <div className="d-flex gap-2">
      <p className="m-0">
        <strong>Date:</strong> {time.toLocaleDateString()}
      </p>
      <p className="m-0">
        <strong>Time:</strong> {formattedTime}
      </p>
    </div>
  );
}

export default Clock;
