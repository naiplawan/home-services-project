import axios from "axios";
import { useState, useEffect } from "react";
import dateFormat from "../../utils/dateFormat.js";

// function AdminDetailCategoryPage() {
//   return (
//     <div className="bg-grey100 h-[100%] pb-[4%] pl-60 ">
//       <div className="header-name justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
//         <h1 className="text-black   font-semibold text-xl">หมวดหมู่</h1>
//       </div>
//     </div>
//   );
// }

// export default AdminDetailCategoryPage;

function AdminDetailCategoryPage() {
  // Define state to store category data
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define a function to fetch category data
    async function fetchCategoryData() {
      try {
        // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
        const response = await axios.get(`http://localhost:4000/category/`);
        console.log("API Response:", response); // Update the route with the correct endpoint

        if (response.status === 200) {
          setCategory(response.data.data); // Assuming the API response has a 'data' property
          setError(null);
        } else {
          setError("ไม่สามารถแสดงข้อมูลได้ ");
        }
      } catch (error) {
        setError("ไม่สามารถแสดงข้อมูลได้");
      }
    }

    // Call the fetchCategoryData function when the component mounts
    fetchCategoryData();
  }, []); // The empty dependency array ensures this effect runs only once, like componentDidMount

  return (
    <div className="bg-grey100 h-[100%] pb-[4%] pl-60 ">
      <div className="header-name justify-between  flex items-center h-20 px-10 mt-0 pt-[20px] py-[10px] w-[100%] bg-white  text-grey600 pb-[20px] border-b border-grey300">
        <h1 className="text-black   font-semibold text-xl">หมวดหมู่</h1>
      </div>
      {error ? (
        <div>Error: {error}</div>
      ) : category ? (
        <div>
          {/* Display category data here */}
          <h2>Category Name: {category.category_name}</h2>
          {/* You can add more details as needed */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AdminDetailCategoryPage;
