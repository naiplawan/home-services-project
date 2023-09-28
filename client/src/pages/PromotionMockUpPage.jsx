import { useState } from "react";
import { Input, Button } from "antd";
import { usePromotion } from "../hooks/promotion";

const PromotionMockUpPage = () => {
    const [promotionCode, setPromotionCode] = useState("");
    const { promotion, getPromotion } = usePromotion();

    const handleApplyPromotion = () => {
        console.log("handleApplyPromotion called with promotionCode:", promotionCode);
        getPromotion(promotionCode);
    };

    const handleInputChange = (e) => {
        console.log("handleInputChange called with value:", e.target.value);
        setPromotionCode(e.target.value);
    };

    return (
        <div className="promotion-container">
            <div className="promotion">
                <div className="promotion-image">
                    <div className="promotion-input">
                        <Input
                            id="promotion-code"
                            placeholder="Enter promotion code"
                            value={promotionCode}
                            onChange={handleInputChange}
                        />
                        <Button type="primary" onClick={handleApplyPromotion}>
                            Apply
                        </Button>
                        <div className="promotion-total-price">
                            <p>Total Price</p>
                            <p>1000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionMockUpPage;