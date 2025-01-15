import React, { useState } from 'react';
import axios from 'axios'; // For sending data to the backend

const AddClass = () => {
  const [formData, setFormData] = useState({
    className: '',
    image: '',
    details: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('className', formData.className);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('details', formData.details);
    formDataToSend.append('additionalInfo', formData.additionalInfo);

    try {
      const response = await axios.post('/api/classes', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Class added successfully!');
        setFormData({
          className: '',
          image: '',
          details: '',
          additionalInfo: '',
        });
      }
    } catch (error) {
      console.error('Error adding class:', error);
      alert('Failed to add class. Please try again.');
    }
  };

  return (
    <div className="add-class-form">
      <h2>Add New Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="className">Class Name:</label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Class Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="additionalInfo">Additional Info:</label>
          <input
            type="text"
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
