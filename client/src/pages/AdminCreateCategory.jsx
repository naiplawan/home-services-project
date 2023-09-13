import CategoryAddForm from '../components/AdminCategoryPage/CategoryAddForm';
import AdminSidebar from '../components/ServicePage/AdminSidebar';

function AdminCreateCategory () {

  return (
    <>
    <div className=" h-screen bg-bg">
    <AdminSidebar />
    <CategoryAddForm />
    </div>
    </>
  )
}

export default AdminCreateCategory;