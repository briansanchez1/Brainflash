import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPass from "./pages/forgot_password";
import Dashboard from "./pages/dashboard";
import Categories from "./pages/categories";
import MainLayout from "./layouts/main_layout";
import PrivateRoutes from "./components/private_routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/categories"
              element={
                <MainLayout>
                  <Categories />
                </MainLayout>
              }
            />
          </Route>
          <Route path="/forgot-password" element={<ForgotPass />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
