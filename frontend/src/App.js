import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register"
import ForgotPass from "./pages/forgotpassword"
import Dashboard from "./pages/dashboard"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPass />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
