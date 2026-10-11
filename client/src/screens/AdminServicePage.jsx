import SideBar from "../components/ServicePage/AdminSidebar.jsx";
import AdminServiceList from "../components/AdminServicePage/AdminServiceList.jsx";

function AdminServicePage() {
    return (
        <div className="admin-service-page" >
            <SideBar />
            <AdminServiceList />
        </div>
    )
}

export default AdminServicePage
