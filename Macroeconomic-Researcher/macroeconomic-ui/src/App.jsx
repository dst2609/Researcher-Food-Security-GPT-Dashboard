import { useState } from "react";

import "./App.css";
import Login from "./Components/Login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
