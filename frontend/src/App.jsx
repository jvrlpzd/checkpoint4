import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Connexion from "./pages/Connexion";
import Tracker from "./pages/Tracker";
import Home from "./pages/Home";
import { TokenContextProvider } from "./contexts/TokenContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <TokenContextProvider>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/app" element={<Tracker />} />
        </Routes>
      </TokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
