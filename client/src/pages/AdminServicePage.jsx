import SideBar from "../components/ServicePage/AdminSidebar.jsx";
import "../styles/App.css";
import AdminServiceList from "../components/AdminServicePage/AdminServiceList.jsx";
import { useUtils }  from "../hooks/utils.js";

function AdminServicePage() {
    const {
        searchService,
        setSearchService,
        service,
        setService,
        deleteServiceId,
        serviceDeleteAlert,
        deleteService,
        service_Id,
        setDeleteService,
      } = useUtils;

    return (
        <div className="admin-service-page" >
            <SideBar />
            <AdminServiceList
                  service={service}
                  deleteServiceId={deleteServiceId}
                  serviceDeleteAlert={serviceDeleteAlert}
                  deleteService={deleteService}
                  setDeleteService={setDeleteService}
                  service_Id={service_Id}/>
        </div>
    )
}

export default AdminServicePage