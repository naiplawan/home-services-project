import { useState } from "react";
import { Input, Button } from "antd";

const PromotionMockUpPage = () => {
    const [promotionCode, setPromotionCode] = useState("");
    const [totalPrice, setTotalPrice] = useState(100);

    const handlePromotionCodeChange = (event) => {
        setPromotionCode(event.target.value);
    };

    const handleApplyPromotion = () => {
        // Apply promotion logic here
        setTotalPrice(50);
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
                            onChange={handlePromotionCodeChange}
                        />
                        <Button type="primary" onClick={handleApplyPromotion}>
                            Apply
                        </Button>
                        <div className="promotion-total-price">
                            <p>Total Price</p>
                            <p>{totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionMockUpPage;