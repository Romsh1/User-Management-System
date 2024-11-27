import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: '',
    userNotes: '',
  });

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(response => setFormData(response.data))
      .catch(err => console.error('Error fetching user:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${id}`, formData);
      alert('User updated successfully');
      navigate('/display');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${id}`);
      alert('User deleted successfully');
      navigate('/display');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update User</h1>
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
      <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" />
      <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" />
      <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <textarea name="userNotes" value={formData.userNotes} onChange={handleChange} placeholder="User Notes" />
      <button type="submit">Update User</button>
      <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
        Delete User
      </button>
    </form>
  );
};

export default UpdateUser;
