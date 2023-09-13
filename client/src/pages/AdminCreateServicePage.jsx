import SideBar from "../components/ServicePage/AdminSidebar.jsx";
import AdminEditedHeader from "../components/ServicePage/AdminEditHeader.jsx";

function AdminCreateServicePage() {
    return (
        <div className="create-service-container h-screen bg-bg">
            <SideBar />
            <AdminEditedHeader />
        </div>
    )
}

export default AdminCreateServicePage