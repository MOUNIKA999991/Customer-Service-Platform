import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ServiceRequests = ({ category }) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axios.get(`http://localhost:3000/service-requests/${category}`, { withCredentials: true });
      setRequests(res.data);
    };
    fetchRequests();
  }, [category]);
  return (
    <div>
      {requests.map(request => (
        <div key={request._id}>
          <h3>{request.user.name}</h3>
          <p>{request.comments}</p>
        </div>
      ))}
    </div>
  );
};
export default ServiceRequests;
