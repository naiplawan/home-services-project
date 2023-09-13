import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useUtils() {
  const navigate = useNavigate();

  // Service State
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

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    service_name: "",
    category_name: "",
    subServiceList: [
      { sub_service_name: "", unit: "", price_per_unit: 0 },
      { sub_service_name: "", unit: "", price_per_unit: 0 },
    ],
    servicePhotos: {},
  });

  // Edit Header
  const [editHeader, setEditHeader] = useState("");

  // Delete Alerts
  const [deleteService, setDeleteService] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [serviceId, setServiceId] = useState();
  const [categoryId, setCategoryId] = useState();

  // Filters
  const [searchService, setSearchService] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minFilter, setMinFilter] = useState(0);
  const [maxFilter, setMaxFilter] = useState(20000);
  const [orderFilter, setOrderFilter] = useState("asc");

  // Service Image Functions
  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setServiceForm({
      ...serviceForm,
      servicePhotos: {
        ...serviceForm.servicePhotos,
        [uniqueId]: event.target.files[0],
      },
    });
  };

  const handleRemoveImageService = (event, servicePhotosKey) => {
    event.preventDefault();
    const { [servicePhotosKey]: _, ...rest } = serviceForm.servicePhotos;
    setServiceForm({
      ...serviceForm,
      servicePhotos: { ...rest },
    });
  };

  // Create Service Function
  const createService = async (data) => {
    await axios.post("/service", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/service-dashboard");
  };

  const handleSubmitService = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (const key in serviceForm) {
      if (key === "servicePhotos") {
        for (const servicePhotosKey in serviceForm[key]) {
          formData.append("servicePhoto", serviceForm[key][servicePhotosKey]);
        }
      } else {
        formData.append(key, JSON.stringify(serviceForm[key]));
      }
    }

    createService(formData);
  };

  // Service Data Functions
  const getService = async () => {
    const result = await axios.get("http://localhost:4000/service");
    setService(result.data.data);
  };

  const getServiceById = async (serviceId) => {
    const result = await axios.get(`http://localhost:4000/service/${serviceId}`);
    setService(result.data.data);
    setEditHeader(result.data.data[0].service_name);
  };

  // Delete Alerts Functions
  const serviceDeleteAlert = async (serviceId) => {
    setServiceId(serviceId);
    setDeleteService(true);
  };

  const categoryDeleteAlert = async (categoryId) => {
    setCategoryId(categoryId);
    setDeleteCategory(true);
  };

  return {
    // State
    service,
    serviceForm,
    editHeader,
    deleteService,
    deleteCategory,
    serviceId,
    categoryId,
    searchService,
    // Functions
    setSearchService,
    handleFileChange,
    handleRemoveImageService,
    handleSubmitService,
    getService,
    getServiceById,
    serviceDeleteAlert,
    categoryDeleteAlert,
  };
}
