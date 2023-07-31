import { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [clock, setClock] = useState({
    hour: 0,
    min: 0,
    sec: 0,
    handHour: 0, // 0°
    handMin: 0, // 0°
    handSec: 0, // 0°
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      setClock((prev) => ({
        ...prev,
        hour: hours < 10 ? `0${hours}` : hours, // add 2 digits
        min: minutes < 10 ? `0${minutes}` : minutes,
        sec: seconds < 10 ? `0${seconds}` : seconds,
        handHour: hours * 30 + minutes / 2, // rotation angle
        handMin: minutes * 6, // rotation angle
        handSec: seconds * 6, // rotation angle
      }));
    }, 1000);

    return () => {
      // clean up function
      clearInterval(interval);
    };
  }, []);

  console.log(clock);

  return (
    <div className="clock">
      <div className="clock-wrapper">
        <div className="center"></div>

        <div className="digital-clock">
          <span className="digit-hour">{`${clock?.hour}:${clock?.min}`}</span>
          <span className="period">{clock?.hour >= 12 ? "PM" : "AM"}</span>
        </div>

        <div
          className="hand"
          style={{ transform: `rotate(${clock?.handHour}deg)` }}
        >
          <span className="hh"></span>
        </div>
        <div
          className="hand"
          style={{ transform: `rotate(${clock?.handMin}deg)` }}
        >
          <span className="hm"></span>
        </div>
        <div
          className="hand"
          style={{ transform: `rotate(${clock?.handSec}deg)` }}
        >
          <span className="hs"></span>
        </div>

        <>
          {[...Array(60)].map((item, index) => (
            <div
              style={{ transform: `rotate(${6 * index}deg)` }}
              className="sec-item"
              key={index}
            >
              <span></span>
            </div>
          ))}
        </>

        <>
          {[...Array(12)].map((item, index) => (
            <div
              style={{ transform: `rotate(${30 * index}deg)` }}
              className="hour-item"
              key={index}
            >
              <span></span>
            </div>
          ))}
        </>

        <>
          {numbers.map((number) => (
            <div
              style={{ transform: `rotate(${30 * number}deg)` }}
              className="number"
              key={number}
            >
              <span style={{ transform: `rotate(${-30 * number}deg)` }}>
                {number}
              </span>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
