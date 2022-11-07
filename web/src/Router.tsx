import { Route, Routes } from "react-router-dom";
import { Home } from './Screens/Home';
import { Login } from "./Screens/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  )
}