import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/Not Found/NotFoundPage";
import { AuthProvider } from "./utils/AuthContext/AuthContext";

function App() {
  const location = useLocation();

  const allRoutes = ["/", "/admin", "/login", "/register"];
  const hideHeaderFooter = allRoutes.includes(location.pathname);

  return (
    <div>
      <AuthProvider>
        {hideHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {hideHeaderFooter && <Footer />}
      </AuthProvider>
    </div>
  );
}

export default App;
