import SideBar from "../components/ServicePage/AdminSidebar.jsx";
// import { useState, useEffect } from "react";
// import axios from "axios";
import "../styles/App.css";
import AdminServiceHeader from "../components/AdminServicePage/AdminServiceHeader.jsx";
// import dateFormat from "../utils/dateFormat";

function AdminServicePage() {
 
    return (
        <div>
            <AdminServiceHeader />    
            <SideBar />
        </div>
    )
}

export default AdminServicePage