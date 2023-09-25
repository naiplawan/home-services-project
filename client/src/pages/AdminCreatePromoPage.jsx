import SideBar from "../components/ServicePage/AdminSidebar.jsx";
import AddPromotionForm from "../components/AdminPromotionPage/AddPromotionPage.jsx";

function AdminCreatPromotionPage() {
    return (
      <div className="h-screen bg-bg">
        <SideBar />
        <AddPromotionForm />
      </div>
    );
  }
  
  export default AdminCreatPromotionPage;
  