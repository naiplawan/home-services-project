import React, { useState } from 'react';
import { DatePicker, TimePicker, Button, Input, Radio } from 'antd';
import moment from 'moment';

const PromotionForm = () => {
  const [formData, setFormData] = useState({
    promotion_code: '',
    promotion_types: 'fixed', // Default to 'fixed'
    promotion_quota: '',
    promotion_discount_amount: '',
    promotion_expiry_date: null,
    promotion_expiry_time: null,
    promotion_created_date: '',
    promotion_edited_date: '',
  });

  const handleDateChange = (date) => {
    setFormData({ ...formData, promotion_expiry_date: date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, promotion_expiry_time: time });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, promotion_types: value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      // Add fields to the form data
      formData.append('promotion_code', formData.promotion_code);
      formData.append('promotion_types', formData.promotion_types);
      formData.append('promotion_quota', formData.promotion_quota);
      formData.append('promotion_discount_amount', formData.promotion_discount_amount);
      formData.append('promotion_expiry_date', formData.promotion_expiry_date);
      formData.append('promotion_expiry_time', formData.promotion_expiry_time);
      formData.append('promotion_created_date', formData.promotion_created_date);
      formData.append('promotion_edited_date', formData.promotion_edited_date);
  
      const response = await fetch('/api/promotions', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Handle successful response
        console.log('Promotion created successfully!');
      } else {
        // Handle error response
        console.error('Error creating promotion:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating promotion:', error);
    }
  };

  return (
    <div>
      <label>Promotion Code:</label>
      <Input
        type="text"
        name="promotion_code"
        value={formData.promotion_code}
        onChange={handleInputChange}
      />
      <br />
      <label>Promotion Type:</label>
      <Radio.Group onChange={handleTypeChange} value={formData.promotion_types}>
        <Radio value="fixed">Fixed</Radio>
        <Radio value="percent">Percent</Radio>
      </Radio.Group>
      <br />
      {formData.promotion_types === 'fixed' && (
        <>
          <label>Promotion Discount Amount (THB):</label>
          <Input
            type="number"
            name="promotion_discount_amount"
            value={formData.promotion_discount_amount}
            onChange={handleInputChange}
          />
          <br />
        </>
      )}
      {formData.promotion_types === 'percent' && (
        <>
          <label>Promotion Discount Percentage:</label>
          <Input
            type="number"
            name="promotion_discount_percentage"
            value={formData.promotion_discount_percentage}
            onChange={handleInputChange}
          />
          <br />
        </>
      )}
      <label>Promotion Expiry Date:</label>
      <DatePicker value={formData.promotion_expiry_date} onChange={handleDateChange} />
      <br />
      <label>Promotion Expiry Time:</label>
      <TimePicker value={formData.promotion_expiry_time} onChange={handleTimeChange} />
      <br />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default PromotionForm;
