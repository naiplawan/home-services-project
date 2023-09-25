import AdminSidebar from '../components/ServicePage/AdminSidebar';
import PromotionList from '../components/AdminPromotionPage/PromotionDetail';

function AdminPromotionPage () {

  return (
    <>
    <div className=" h-screen bg-bg">
    <AdminSidebar />
    <PromotionList />
    </div>
    </>
  )
}

export default AdminPromotionPage