import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { URL, KEY } from "./config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Singin from "./views/singin";
import Users from "./views/Users";

function App() {
  console.log(URL);
  console.log(KEY);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singin" element={<Singin />} />

        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
