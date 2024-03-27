import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPass from "./pages/forgot_password";
import Dashboard from "./pages/dashboard";
import Modal from "./components/modal";
import TopBar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPass />}></Route>
          <Route path="/modal" element={<Modal />}></Route>
          <Route path="/navigate" element={<TopBar />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
