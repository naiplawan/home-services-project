import SideBar from "../components/ServicePage/AdminSidebar.jsx";
import AddService from "../components/AdminServicePage/AdminAddService.jsx";

function AdminCreateServicePage() {
  return (
    <div className="h-screen bg-bg">
      <SideBar />
      <AddService />
    </div>
  );
}

export default AdminCreateServicePage;
