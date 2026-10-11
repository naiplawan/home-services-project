import AdminDetailCategoryPage from "../components/AdminCategoryPage/AdminDetailCategoryPage.jsx";
import AdminSidebar from "../components/ServicePage/AdminSidebar.jsx";

function AdminDetailCategory() {
  return (
    <div className="min-h-screen bg-bg">
      <AdminSidebar />
      <AdminDetailCategoryPage />
    </div>
  );
}

export default AdminDetailCategory;
