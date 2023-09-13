import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useUtils() {
  const navigate = useNavigate();

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
  const getService = async () => {
    const result = await axios("http://localhost:4000/service");
    setService(result.data.data);
  };

  return {
    getService,
  };
}
