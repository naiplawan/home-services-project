import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminCategoryPage from "./AdminCategoryPage.jsx";
import AdminServicePage from "./AdminServicePage.jsx";
import AdminCreateCategory from "./AdminCreateCategory.jsx";
import AdminDetailCategory from "./AdminDetailCategory.jsx";
import AdminEditCategory from "./AdminEditCategory.jsx";

import AdminCreateServicePage from "./AdminCreateServicePage.jsx";
function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");

  return (
    <div className="App">
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-category" element={<AdminCategoryPage />} />
          <Route path="/admin-service" element={<AdminServicePage />} />
          <Route path="/admin-category-create"element={<AdminCreateCategory />}/>
          <Route path="/admin-service-create" element={<AdminCreateServicePage />}/>
          <Route path="/admin-category-detail/:categoryId" element={<AdminDetailCategory />} />
          <Route path="/admin-category-edit/:categoryId" element={<AdminEditCategory />} />
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
