"use client"


import { useState } from 'react';
import geolib from 'geolib';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from  '@/redux/reducers/form.reducer'; 
import { useRouter } from 'next/navigation';

const Form = () => {
    const dispatch = useDispatch();
  const formData = useSelector(state => state.form.formData);
  const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    router.push('/');
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Call your reverse geocoding API here
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=2f00f368957713f43377902197f85be4`
            );
      
            
            if (!response.ok) {
              throw new Error('Failed to fetch location data');
            }
            const data = await response.json();
            console.log(data);

            // Update form data with fetched location details
            dispatch(
              updateFormData({
                fieldName: 'city',
                fieldValue: data[0].name,
              })
            );
            dispatch(
              updateFormData({
                fieldName: 'state',
                fieldValue: data[0].state,
              })
            );
            dispatch(
              updateFormData({
                fieldName: 'pincode',
                fieldValue: data[0].postalCode,
              })
            );
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

 
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ fieldName: name, fieldValue: value }));
  };
  return (
<section className="bg-pink-500 flex items-center justify-center h-auto">
  <div className="w-100 flex flex-col items-center gap-6 rounded-lg p-4 border-black shadow-xl bg-opacity-75 backdrop-filter backdrop-blur-md mt-6 mb-6" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
  <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> We Tailor 4 U
            </h1>
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <label className="block mb-2 text-white">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black"
        />
      </label>

      <label className="block mb-2 text-white">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black"
        />
      </label>

      <label className="block mb-2 text-white">
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black "
        />
      </label>

      <label className="block mb-2 text-white">
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black"
        />
      </label>

      <label className="block mb-2 text-white">
        State:
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black"
        />
      </label>

      <label className="block mb-2 text-white">
        Pincode:
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="ml-2 py-2 px-3 rounded border border-gray-300 w-full text-black"
        />
      </label>

      <button type="button" onClick={handleLocationClick} className="mb-2 py-2 px-4 bg-blue-500 text-white rounded cursor-pointer w-full">
        Find My Location
      </button>

      <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded cursor-pointer w-full">
        Submit
      </button>
    </form>
  </div>
</section>

  );
};

export default Form;
