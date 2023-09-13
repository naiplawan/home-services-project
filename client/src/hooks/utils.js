import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useUtils() {
  const navigate = useNavigate();

    //Filter
    const [searchService, setSearchService] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [minFilter, setMinFilter] = useState(0);
    const [maxFilter, setMaxFilter] = useState(20000);
    const [orderFilter, setOrderFilter] = useState("asc");


  //service
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

  const [editHeader, setEditHeader] = useState("");

  //Get Service Data
  const getService = async () => {
    const result = await axios("http://localhost:4000/service");
    setService(result.data.data);
    console.log(result.data.data);
  };

  const getServiceById = async (serviceId) => {
    const result = await axios.get(
      `http://localhost:4000/service/${serviceId}`
    );
    setService(result.data.data);
    setEditHeader(result.data.data[0].service_name);
  };

    //Service Image
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



  //Create Service
  const createService = async (data) => {
    await axios.post("http://localhost:4000/service", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/service-dashboard");
  };

  const handleSubmitService = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("service_name", service_name);
    formData.append("category_name", category_name);
    formData.append("sub_service", JSON.stringify(subServiceList));

    for (let servicePhotosKey in servicePhotos) {
      formData.append("servicePhoto", servicePhotos[servicePhotosKey]);
    }

    createService(formData);
  };

  //alert box
  const [deleteService, setDeleteService] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [service_Id, setService_Id] = useState();
  const [category_Id, setCategory_Id] = useState();

  const serviceDeleteAlert = async (serviceId) => {
    setService_Id(serviceId);
    setDeleteService(true);
  };

  const categoryDeleteAlert = async (categoryId) => {
    setCategory_Id(categoryId);
    setDeleteCategory(true);
  };



  return {
    createService,
    handleSubmitService,
    getService,
    service,
    service_name,
    setService_name,
    sub_service_name,
    setSub_service_name,
    price_per_unit,
    setPrice_per_unit,
    unit,
    setUnit,
    servicePhotos,
    setServicePhotos,
    subServiceList,
    setSubServiceList,
    editHeader,
    setEditHeader,
    deleteService,
    setDeleteService,
    deleteCategory,
    setDeleteCategory,
    service_Id,
    setService_Id,
    category_Id,
    setCategory_Id,
    serviceDeleteAlert,
    categoryDeleteAlert,
    handleFileChange,
    handleRemoveImageService,
    // getCategory,
    // category,
    // category_name,
    // setCategory_name,
    searchService,
  };
}
