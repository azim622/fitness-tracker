import React, { useState, useRef } from 'react';
import axios from 'axios';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClass = () => {
    const axiosSecure = UseAxiosSecure();
    const fileInputRef = useRef(null);

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

        try {
            const imageData = new FormData();
            imageData.append('image', formData.image);

            const imageResponse = await axios.post(image_hosting_api, imageData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const imageUrl = imageResponse?.data?.data?.display_url;

            if (imageUrl) {
                const finalFormData = {
                    className: formData.className,
                    image: imageUrl,
                    details: formData.details,
                    additionalInfo: formData.additionalInfo,
                };

                await axiosSecure.post('/addClass', finalFormData);
                 Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${formData.className} added successfully`,
                            showConfirmButton: false,
                            timer: 1500,
                          });

                setFormData({
                    className: '',
                    image: '',
                    details: '',
                    additionalInfo: '',
                });

                if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
            } else {
                alert('Image upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error adding class:', error);
            alert('Failed to add class. Please try again.');
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                <div className="p-6">
                    <header className="mb-4 text-center">
                        <h3 className="text-xl font-medium text-slate-700">Add New Fitness Class</h3>
                    </header>
                    <div className="flex flex-col space-y-8">
                        <div className="relative my-6">
                            <input
                                id="className"
                                type="text"
                                name="className"
                                placeholder="Class Name"
                                value={formData.className}
                                onChange={handleChange}
                                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-emerald-500 focus:outline-none"
                                required
                            />
                            <label
                                htmlFor="className"
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500">
                                Class Name
                            </label>
                        </div>
                        <div className="relative my-6">
                            <input
                                id="image"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="relative w-full h-10 px-4 text-sm transition-all border rounded outline-none border-slate-200 text-slate-500 autofill:bg-white focus:border-emerald-500 focus:outline-none"
                                required
                            />
                            <label
                                htmlFor="image"
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500">
                                Class Image
                            </label>
                        </div>
                        <div className="relative my-6">
                            <textarea
                                id="details"
                                name="details"
                                placeholder="Details"
                                value={formData.details}
                                onChange={handleChange}
                                className="relative w-full h-20 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-emerald-500 focus:outline-none"
                                required
                            ></textarea>
                            <label
                                htmlFor="details"
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500">
                                Details
                            </label>
                        </div>
                        <div className="relative my-6">
                            <input
                                id="additionalInfo"
                                type="text"
                                name="additionalInfo"
                                placeholder="Additional Info (Optional)"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-emerald-500 focus:outline-none"
                            />
                            <label
                                htmlFor="additionalInfo"
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500">
                                Additional Info
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end p-6 ">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700">
                        <span>Add Class</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
