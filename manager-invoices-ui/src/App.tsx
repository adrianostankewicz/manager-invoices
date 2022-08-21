import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )  
}