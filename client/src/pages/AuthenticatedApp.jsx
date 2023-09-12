import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminCategoryPageMock from "./AdminCategoryPageMock.jsx";
import AdminServicePage from "./AdminServicePage.jsx";
function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");

  return (
    <div className="App">
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-category" element={<AdminCategoryPageMock />} />
          <Route path="/admin-service" element={<AdminServicePage />} /> 
          <Route path="" element={<NotFoundPage />} />
        
        </Routes>
      ) : (
        <Routes>
                 <Route path="/" element={<HomePage />} />
  <Route path="" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
}
export default AuthenticatedApp;