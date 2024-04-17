import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter} from "react-router-dom";
import { Firebaseprovider } from "./components/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Firebaseprovider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Firebaseprovider>
  </React.StrictMode>
);
