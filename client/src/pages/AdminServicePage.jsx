import SideBar from "../components/ServicePage/AdminSidebar.jsx";
// import { useState, useEffect } from "react";
// import axios from "axios";
import "../styles/App.css";
import AdminServiceList from "../components/AdminServicePage/AdminServiceList.jsx";
import AdminServiceHeader from "../components/AdminServicePage/AdminServiceHeader.jsx";
// import dateFormat from "../utils/dateFormat";

function AdminServicePage() {
 
    return (
        <div className="admin-service-page" >
            <SideBar />
            <AdminServiceHeader />    
            <AdminServiceList/>
        </div>
    )
}

export default AdminServicePage