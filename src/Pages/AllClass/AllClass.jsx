import React, { useEffect, useState } from 'react';
import AxiosPublic from '../../Hooks/AxiosPublic';

const AllClass = () => {
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState('');
    const axiosPublic = AxiosPublic();

    const fetchClasses = async (searchQuery = '') => {
        try {
            const response = await axiosPublic.get(`/addClass?search=${searchQuery}`);
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearch(query);
        fetchClasses(query); // Fetch classes based on the search query
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Available Fitness Classes</h1>
            <div className="mb-4 mx-auto">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for a class..."
                    className="border  rounded-lg px-4 py-2 w-1/2"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <img
                            src={classItem.image}
                            alt={classItem.className}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{classItem.className}</h2>
                            <p className="text-gray-600 mb-4">{classItem.details}</p>
                            {classItem.additionalInfo && (
                                <p className="text-gray-500 text-sm">{classItem.additionalInfo}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClass;
