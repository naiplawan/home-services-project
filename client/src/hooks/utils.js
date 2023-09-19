import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useUtils() {
  const navigate = useNavigate();

  // Category State and Functions
  const [category, setCategory] = useState([]);
  const [category_name, setCategory_name] = useState("");
  const [category_created_date, setCategory_created_date] = useState("");
  const [category_edited_date, setCategory_edited_date] = useState("");

  // Function to get category data
  const getCategory = async () => {
    const result = await axios("http://localhost:4000/category");
    setCategory(result.data.data);
  };

  // Function to delete a category by ID
  const deleteCategoryId = async (categoryId) => {
    await axios.delete(`http://localhost:4000/category/${categoryId}`);
    getCategory();
    document.getElementById("popUp").style.display = "none";
    navigate("/category-dashboard");
  };

  // Function to get category by ID
  const getCategoryById = async (categoryId) => {
    const result = await axios.get(
      `http://localhost:4000/category/${categoryId}`
    );
    setCategory(result.data.data);
  };

  // Function to create a new category
  const createCategory = async () => {
    await axios.post("http://localhost:4000/category", { category_name });
    navigate("/category-dashboard");
  };

  // Filters State and Functions
  const [searchService, setSearchService] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minFilter, setMinFilter] = useState(0);
  const [maxFilter, setMaxFilter] = useState(20000);
  const [orderFilter, setOrderFilter] = useState("asc");

  // Service State and Functions
  const [service, setService] = useState([
    {
      service_name: "",
      category_name: "",
      service_photo: { url: "", publicId: "" },
      sub_service_name: "",
      unit: "",
      price_per_unit: 0,
      service_created_date: "",
      service_edited_date: "",
      sub_service_quantity: 0,
    },
  ]);

  const [service_name, setService_name] = useState("");
  const [sub_service_name, setSub_service_name] = useState("");
  const [price_per_unit, setPrice_per_unit] = useState(0);
  const [unit, setUnit] = useState("");
  const [servicePhotos, setServicePhotos] = useState({});
  const [subServiceList, setSubServiceList] = useState([
    { sub_service_name: "", unit: "", price_per_unit: 0 },
    { sub_service_name: "", unit: "", price_per_unit: 0 },
  ]);

  // Edit Header
  const [editHeader, setEditHeader] = useState("");

  // Delete Alerts State
  const [deleteService, setDeleteService] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [serviceId, setServiceId] = useState();
  const [categoryId, setCategoryId] = useState();

  const getService = async () => {
    try {
      const response = await axios.get("http://localhost:4000/service");
      setService(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };


  // Function to get service data by ID
  const getServiceById = async (serviceId) => {
    const result = await axios.get(
      `http://localhost:4000/service/${serviceId}`
    );
    setService(result.data.data);
    setEditHeader(result.data.data[0].service_name);
  };

  // Function to delete a service by ID
  const deleteServiceId = async (serviceId) => {
    await axios.delete(`http://localhost:4000/service/${serviceId}`);
    getService();
    document.getElementById("popUp").style.display = "none";
    navigate("/service-dashboard");
  };

  // Service Image Functions
  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setServicePhotos({
      ...servicePhotos,
      [uniqueId]: event.target.files[0],
    });
  };

  const handleRemoveImageService = (event, servicePhotosKey) => {
    event.preventDefault();
    delete servicePhotos[servicePhotosKey];
    setServicePhotos({ ...servicePhotos });
  };

  // Function to create a new service
  const createService = async (data) => {
    await axios.post("http://localhost:4000/service", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/admin-service");
  };

  // Function to handle service form submission
  const handleSubmitService = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (const key in serviceForm) {
      if (key === "servicePhotos") {
        for (const servicePhotosKey in servicePhotos) {
          formData.append("servicePhoto", servicePhotos[servicePhotosKey]);
        }
      } else {
        formData.append(key, JSON.stringify(serviceForm[key]));
      }
    }

    createService(formData);
  };

  // Function to set service delete alert
  const serviceDeleteAlert = async (serviceId) => {
    setServiceId(serviceId);
    setDeleteService(true);
  };

  // Function to set category delete alert
  const categoryDeleteAlert = async (categoryId) => {
    setCategoryId(categoryId);
    setDeleteCategory(true);
  };

  return {
    // Category State and Functions
    category,
    getCategory,
    deleteCategoryId,
    getCategoryById,
    createCategory,

    // Service State and Functions
    service,
    service_name,
    sub_service_name,
    price_per_unit,
    unit,
    servicePhotos,
    subServiceList,
    editHeader,
    deleteService,
    deleteCategory,
    serviceId,
    categoryId,
    searchService,
    setSearchService,
    handleFileChange,
    handleRemoveImageService,
    handleSubmitService,
    getService,
    getServiceById,
    deleteServiceId,
    serviceDeleteAlert,
    categoryDeleteAlert,

    // Filters State and Functions
    searchCategory,
    categoryFilter,
    minFilter,
    maxFilter,
    orderFilter,
  };
}
