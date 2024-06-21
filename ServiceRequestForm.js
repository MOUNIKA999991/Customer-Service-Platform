import React, { useState } from 'react';
import axios from 'axios';
const ServiceRequestForm = () => {
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/service-request', { category, comments }, { withCredentials: true });
  };
  return (
    <form onSubmit={handleSubmit}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General Queries">General Queries</option>
        <option value="Product Features Queries">Product Features Queries</option>
        <option value="Product Pricing Queries">Product Pricing Queries</option>
        <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
      </select>
      <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
export default ServiceRequestForm;
