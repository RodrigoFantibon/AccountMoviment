import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export function App() {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}
