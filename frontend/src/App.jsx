import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import { TokenContextProvider } from "./contexts/TokenContext";
import "./App.css";

function App() {
  return (
    <TokenContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Connexion />} />
        </Routes>
      </BrowserRouter>
    </TokenContextProvider>
  );
}

export default App;
