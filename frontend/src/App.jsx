import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";
import Connexion from "./pages/Connexion";
import Tracker from "./pages/Tracker";
import Edit from "./pages/Edit";
import TransactionDetail from "./pages/TransactionDetail";
import Home from "./pages/Home";
import Add from "./pages/Add";
import { TokenContextProvider } from "./contexts/TokenContext";
import "./App.css";
import AddCategory from "./pages/AddCategory";

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
          <Route path="/app/:id" element={<TransactionDetail />} />
          <Route path="/app/:id/edit" element={<Edit />} />
          <Route path="/add" element={<Add />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </Routes>
        <ToastContainer />
      </TokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
