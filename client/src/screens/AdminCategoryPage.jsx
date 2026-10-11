import AdminCategory from "../components/AdminCategoryPage/AdminCategory.jsx";
import AdminSidebar from "../components/ServicePage/AdminSidebar.jsx";

function AdminCategoryPage() {
  return (
    <div className="min-h-screen bg-bg">
      <AdminSidebar />
      <AdminCategory />
    </div>
  );
}

export default AdminCategoryPage;
