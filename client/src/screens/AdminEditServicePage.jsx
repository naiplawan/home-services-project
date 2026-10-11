import ServiceEditForm from '../components/AdminServicePage/ServiceEditForm';
import AdminSidebar from '../components/ServicePage/AdminSidebar';

function AdminEditServicePage () {

  return (
    <>
    <div className="min-h-screen bg-bg">
    <AdminSidebar />
    <ServiceEditForm />
    </div>
    </>
  )
}

export default AdminEditServicePage;
