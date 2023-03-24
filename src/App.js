import CALC from "./Components/CALC";
import CRUD from "./Components/CRUD";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Animbg from "./Components/Animbg";
import { ReactComponent as SvgREACT } from "./IMAGE/react.svg";

function App() {
  return (
    <>
      <Animbg color={"rgba(36, 238, 87, 0.911)"} />
      <Animbg color={"rgba(23, 226, 233, 0.911)"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc" element={<CALC />} />
        <Route path="/crud" element={<CRUD />} />
      </Routes>

      <div className="copyright">
        <div className="footer_copyright">
          <div>
            Made with &nbsp;
            <SvgREACT
              style={{ height: "35px", width: "35px" }}
              className="sol-icon"
            />
            <span className="sl-footer-links__marked-text">
              &nbsp; by Bryan G.
            </span>
          </div>
          Invest in your future
        </div>
      </div>
    </>
  );
}

export default App;
