import React, { useEffect, useState, useRef } from "react";
import sound from "./Button.mp3";
import "./CALC.css";

const CALC = () => {
  // green = rgba(36, 238, 87, 0.911)
  // aqua = rgba(23, 226, 233, 0.911)

  const buttons = [
    { label: "AC", icon: null, ref: useRef() },
    { label: "del", icon: "fa-solid fa-delete-left", ref: useRef() },
    { label: "%", icon: "fa-solid fa-percent", ref: useRef() },
    { label: "/", icon: "fa-solid fa-divide", ref: useRef() },
    { label: "7", icon: null, ref: useRef() },
    { label: "8", icon: null, ref: useRef() },
    { label: "9", icon: null, ref: useRef() },
    { label: "*", icon: "fa-solid fa-xmark", ref: useRef() },
    { label: "4", icon: null, ref: useRef() },
    { label: "5", icon: null, ref: useRef() },
    { label: "6", icon: null, ref: useRef() },
    { label: "-", icon: "fa-solid fa-minus", ref: useRef() },
    { label: "1", icon: null, ref: useRef() },
    { label: "2", icon: null, ref: useRef() },
    { label: "3", icon: null, ref: useRef() },
    { label: "+", icon: "fa-solid fa-plus", ref: useRef() },
    { label: "0", icon: null, ref: useRef() },
    { label: ".", icon: null, ref: useRef() },
    { label: "=", icon: "fa-solid fa-equals", ref: useRef() },
  ];

  const [inputed, setInput] = useState([]);
  const [result, setResult] = useState("0");
  const [showres, setShowres] = useState(true);
  const [Error, setError] = useState("");

  useEffect(() => {
    localStorage.removeItem("inputed");
  }, []);

  function handleKeyDown(event) {
    const keeeeey = event.key;
    console.log(keeeeey);

    if ((parseInt(keeeeey) >= 0 && parseInt(keeeeey) <= 9) || keeeeey === ".") {
      setInput([...inputed, keeeeey]);

      let x = buttons.filter((m) => m.label === `${keeeeey}`);
      x[0].ref.current.classList.add("active");

      setTimeout(() => {
        x[0].ref.current.classList.remove("active");
      }, 200);

      setResult("");
      setShowres(false);
      new Audio(sound).play();
    }
  }

  const handleClick = (num) => {
    new Audio(sound).play();
    try {
      if (num === "del") {
        inputed.pop();
        setInput([...inputed]);
      } else if (num === "AC") {
        setShowres(true);
        setResult("0");
        setInput([]);
        setError("");

        localStorage.removeItem("inputed");
      } else if (["+", "-", "/", "*", "%"].includes(num)) {
        setShowres(false);
        const lastVal = inputed[inputed.length - 1];
        if (result.length !== 0) {
          if (localStorage.getItem("inputed") === null) {
            localStorage.setItem("inputed", JSON.stringify([result, num]));
          }
        } else if (localStorage.getItem("inputed") !== null) {
          const get = JSON.parse(localStorage.getItem("inputed"));
          let y = get.slice(0, -1);
          localStorage.setItem("inputed", JSON.stringify([y, num]));
        } else if (
          inputed.length > 0 ||
          (Error === "SYNTAX ERROR!" &&
            !["+", "-", "/", "*", "%"].includes(lastVal))
        ) {
          localStorage.setItem("inputed", JSON.stringify([inputed, num]));
          setInput([]);
        }
      } else if (num === "=") {
        setInput([]);
        setShowres(true);
        setError("");
        const savedInput = localStorage.getItem("inputed");
        if (savedInput !== null) {
          const getResult = JSON.parse(savedInput);
          const lastChar = getResult.slice(-1);
          const operators = ["+", "-", "/", "*", "%"];
          if (operators.includes(lastChar) && inputed.length === 0) {
            const all = [getResult.slice(0, getResult.length - 1), inputed];
            const ready = all.join("").replace(/,/g, "");
            const totalRes = eval(ready);
            setResult(eval?.(totalRes));
            setInput([]);
            localStorage.removeItem("inputed");
          } else {
            const all = [getResult, inputed];
            const ready = all.join("").replace(/,/g, "");
            const totalRes = eval(ready);
            setResult(eval?.(totalRes));
            setInput([]);
            localStorage.removeItem("inputed");
          }
        } else {
          setResult("");
          setError("");
        }
      } else {
        setInput([...inputed, num]);
        setResult("");
        setShowres(false);
        setError("");
      }
    } catch (err) {
      setError("SYNTAX ERROR!");
      setShowres(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="h-[85vh] w-screen grid place-content-center p-0 m-0 ">
        <div className="rounded-2xl overflow-hidden sm:scale-95 z-50">
          <div className="calbtncon p-6 mx-auto h-20 max-w-sm w-screen bg-emerald-500">
            <div
              className="text text-right text-3xl truncate"
              style={{ fontFamily: "Inter" }}>
              {inputed}
              {showres && (
                <span className="font-extrabold text-white">{result}</span>
              )}

              {Error.length > 0 && (
                <div
                  className="font-extrabold text-red-600 text-center underline decoration-4 underline-offset-4"
                  style={{
                    fontFamily: "Inter",
                    textShadow: "0px 0px 3px white",
                  }}>
                  {Error}
                </div>
              )}
            </div>
          </div>
          <div className="calbtncon p-6 mx-auto h-96 max-w-sm  w-screen bg-[#212121] grid grid-cols-4 grid-rows-5 gap-4 sm:p-4 sm:pb-6">
            {buttons.map((button, index) => (
              <div
                id="button"
                key={index}
                ref={button.ref}
                onClick={() => handleClick(button.label)}
                className={button.label === "+" ? "row-span-2" : ""}>
                <span>
                  {button.icon ? (
                    <i className={button.icon} aria-hidden="true"></i>
                  ) : (
                    button.label
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CALC;
