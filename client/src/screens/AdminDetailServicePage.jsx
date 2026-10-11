import AdminDetailService from "../components/AdminServicePage/AdminDetailService.jsx";
import AdminSidebar from "../components/ServicePage/AdminSidebar.jsx";

function AdminDetailServicePage() {
  return (
    <div className="min-h-screen bg-bg">
      <AdminSidebar />
      <AdminDetailService/>
    </div>
  );
}

export default AdminDetailServicePage;
