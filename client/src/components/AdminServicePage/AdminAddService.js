import "../../styles/App.css"
import image from "../../assets/AdminPhoto/imageIndex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUtils } from "../../hooks/utils";

function AddService() {
    const{
        servicePhotos,
        service_name,
        setService_name,
        category,
        category_name,
        setCategory_name,
        getCategory.
        handleSubmitService,
        handleFileChange,
        subServiceList,
        setSubServiceList,
        handleRemoveImageService,
    } = useUtils();

    const addList = () => {
        const newList = [...subServiceList];
        {sub_service_name:"", unit:"", price_per_unit:0}
    ];
    setSubServiceList(newList);
    };

    const handleChangeName = (e,index) => {
        setService_name(e.target.value);
    };
}