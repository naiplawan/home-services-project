import AdminSidebar from '../components/ServicePage/AdminSidebar';
import PromotionEdit from '../components/AdminPromotionPage/PromotionEdit';

function AdminEditPromoPage () {

  return (
    <>
    <div className=" h-screen bg-bg">
    <AdminSidebar />
    <PromotionEdit />
    </div>
    </>
  )
}

export default AdminEditPromoPage;