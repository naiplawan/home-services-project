import AdminSidebar from "../components/ServicePage/AdminSidebar";
import PromotionList from "../components/AdminPromotionPage/PromotionList";

function AdminPromotionPage() {
  return (
    <>
      <div className="min-h-screen bg-bg">
        <AdminSidebar />
        <PromotionList />
      </div>
    </>
  );
}

export default AdminPromotionPage;
