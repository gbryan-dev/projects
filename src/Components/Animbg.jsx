import React, { useMemo } from "react";
import "./Animbg.css";

const Animbg = ({ color }) => {
  const floats = useMemo(
    () =>
      Array(10)
        .fill()
        .map((_, index) => {
          const left = `${Math.floor(Math.random() * 100)}%`;
          const width = `${Math.floor(Math.random() * 40) + 2}px`;
          const height = width;
          const bottom = `-${height}`;
          const delay = `${Math.floor(Math.random() * 60)}s`;
          return (
            <li
              key={index}
              style={{
                position: "absolute",
                left,
                width,
                height,
                bottom,
                animation: "animate 15s linear infinite",
                animationDelay: delay,
                backgroundColor: color,
                boxShadow: `0px 0px 10px ${color}`,
                display: "block",
                listStyle: "none",
              }}
            />
          );
        }),
    [color]
  );

  return <div className="background">{floats}</div>;
};

export default Animbg;
