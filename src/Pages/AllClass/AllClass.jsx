import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosPublic from '../../Hooks/AxiosPublic';
import { Helmet } from 'react-helmet';

const AllClass = () => {
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hoveredTrainer, setHoveredTrainer] = useState(null);
    const axiosPublic = AxiosPublic();
    const navigate = useNavigate();

    // Fetch classes from the API
    const fetchClasses = async (searchQuery = '', page = 1) => {
        try {
            const response = await axiosPublic.get(`/addClass?search=${searchQuery}&page=${page}&limit=6`);
            console.log('API Response:', response.data); // Debugging: Check API Response
            setClasses(response.data.classes);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    useEffect(() => {
        fetchClasses(search, currentPage);
    }, [currentPage, search]);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearch(query);
        setCurrentPage(1); // Reset to the first page on search
        fetchClasses(query, 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleTrainerClick = (trainerId) => {
        navigate(`/details/${trainerId}`);
    };

    return (
        <div className="p-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Class || FitTracker</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-6">Available Fitness Classes</h1>
            <div className="mb-4 mx-auto">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for a class..."
                    className="border rounded-lg px-4 py-2 w-1/2"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
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
                        <div>
                        {classItem.trainer && Array.isArray(classItem.trainer) && (
                            <div className="flex flex-wrap gap-3 p-4">
                                {classItem.trainer.map((trainer) => (
                                    <div
                                        key={trainer.id}
                                        className="relative group"
                                        onMouseEnter={() => setHoveredTrainer(trainer.id)}
                                        onMouseLeave={() => setHoveredTrainer(null)}
                                        onClick={() => handleTrainerClick(trainer.id)}
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all duration-300 cursor-pointer">
                                            <img
                                                src={trainer.profileImage}
                                                alt={trainer.fullName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {hoveredTrainer === trainer.id && (
                                            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap z-10 shadow-lg">
                                                {trainer.fullName}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
                    
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-4">
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                        className={`px-4 py-2 border rounded-lg ${
                            currentPage === page + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllClass;
