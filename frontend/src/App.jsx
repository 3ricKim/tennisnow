import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home, Play, Signup, Login, About } from "./components/pages";
import "./App.css";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
