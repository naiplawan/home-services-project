import EditedCategoryForm from '../components/AdminCategoryPage/CategoryEditForm';
import AdminSidebar from '../components/ServicePage/AdminSidebar';

function EditedForm () {

  return (
    <>
    <div className=" h-screen bg-bg">
    <AdminSidebar />
    <EditedCategoryForm />
    </div>
    </>
  )
}

export default EditedForm;