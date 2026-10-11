import { useNavigate } from "@/routing/navigation.jsx";


function AdminDashboard() {
  
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-4 py-10">
        <h1 className="text-center text-5xl sm:text-7xl lg:text-9xl"> Hello Admin !! </h1>
        <div className="join flex flex-wrap justify-center gap-3">
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
