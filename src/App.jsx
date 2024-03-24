import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnMore from "./components/LearnMore";
import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/learn-more" element={<LearnMore />}></Route>
        <Route path="/game" element={<Game />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
