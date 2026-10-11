import { useNavigate } from "@/routing/navigation.jsx";


function AdminDashboard() {
  
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className=" text-9xl"> Hello Admin !! </h1>
        <div className="join"> 
        <button
        className="btn primary"
        onClick={() => navigate("/")}
      >
        <span className="text-lg ">👨‍🔧 GO HOME 👩‍🔧</span>

      </button>

      <button
        className="btn primary"
        onClick={() => navigate("/admin-service")}
      >
        <span className="text-lg ">👨‍🔧 Service 👩‍🔧</span>

      </button>

      <button
        className="btn primary"
        onClick={() => navigate("/admin-category")}
      >
        <span className="text-lg ">👨‍🔧 Category 👩‍🔧</span>

      </button>
      </div>
      </div>
    </>
  );
}
export default AdminDashboard;
