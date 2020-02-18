import React from "react";
import ReactDOM from "react-dom";
import img from "./sa1s.png";
import "./index.scss";

const App = () => (
  <div>
    Hello ss <img src={img} height="100px" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
