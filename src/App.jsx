import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home, Rackets, Shoes, Accessories } from "./components/pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rackets" element={<Rackets />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </div>
  );
}

export default App;
