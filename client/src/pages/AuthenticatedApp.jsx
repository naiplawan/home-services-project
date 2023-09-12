import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import AdminDashboard from "./AdminDashboard";
import AdminCategoryPageMock from "./AdminCategoryPageMock";

function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");

  return (
    <div className="App">
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="" element={<NotFoundPage />} />
          {/* Route mocking */}
          <Route path="/admin-category" element={<AdminCategoryPageMock />} />
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
