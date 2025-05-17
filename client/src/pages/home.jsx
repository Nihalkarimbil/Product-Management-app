import { useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronRight, FaHeart } from "react-icons/fa6";


export default function Home() {
    const [expandedCategories, setExpandedCategories] = useState({
        laptop: true,
    });

    const [activePage, setActivePage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showRowsDropdown, setShowRowsDropdown] = useState(false);

    const toggleCategory = (category) => {
        setExpandedCategories({
            ...expandedCategories,
            [category]: !expandedCategories[category],
        });
    };

    const products = Array(6).fill().map((_, i) => ({
        id: i + 1,
        name: 'HP AMD Ryzen 3',
        price: 529.99,
        rating: 5,
        image: '/api/placeholder/200/120',
        isFavorite: false,
    }));

    const totalItems = 456;
    const totalPages = 10;

    return (
        <div className="container mx-auto p-4">
            
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-gray-600">
                    <span className="mr-2">Home</span>
                    <FaChevronRight size={16} />
                </div>

                <div className="flex space-x-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl">
                        Add category
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl">
                        Add sub category
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl">
                        Add product
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                
                <div className="w-full md:w-64 shrink-0">
                    <h2 className="text-lg font-medium mb-3">Categories</h2>

                    <ul className="space-y-2">
                        <li className="py-1">
                            <a href="#" className="block text-gray-700 hover:text-blue-600">All categories</a>
                        </li>

                        <li className="py-1">
                            <div
                                className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-blue-600"
                                onClick={() => toggleCategory('laptop')}
                            >
                                <span>Laptop</span>
                                {expandedCategories.laptop ? <FaChevronDown size={18} /> : <FaChevronRight size={18} />}
                            </div>

                            {expandedCategories.laptop && (
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li className="flex items-center text-gray-700">
                                        <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center mr-2">
                                            <FaCheck size={14} className="text-white" />
                                        </div>
                                        <span>HP</span>
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <div className="w-5 h-5 rounded bg-blue-100 mr-2"></div>
                                        <span>Dell</span>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="py-1">
                            <div className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-blue-600">
                                <span>Tablet</span>
                                <FaChevronRight size={18} />
                            </div>
                        </li>

                        <li className="py-1">
                            <div className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-blue-600">
                                <span>Headphones</span>
                                <FaChevronRight size={18} />
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="border rounded-md p-4 flex flex-col relative">
                                <button className="absolute top-4 right-4 bg-blue-50 p-1 rounded-full">
                                    <FaHeart size={18} className="text-blue-500" />
                                </button>

                                <div className="flex justify-center mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-32 object-contain"
                                    />
                                </div>

                                <h3 className="text-blue-800 font-medium mb-2">{product.name}</h3>
                                <p className="font-bold mb-2">${product.price}</p>

                                <div className="flex">
                                    {Array(5).fill().map((_, i) => (
                                        <span key={i} className="text-gray-300">★</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-600 mb-4 md:mb-0">
                            10 of {totalItems} items
                        </div>

                        <div className="flex items-center">
                            <div className="flex space-x-1 mr-6">
                                {[1, 2, 3, 4, 5].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-8 h-8 flex items-center justify-center rounded-full ${page === activePage ? 'bg-yellow-500 text-white' : 'text-gray-600'
                                            }`}
                                        onClick={() => setActivePage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <span className="w-8 h-8 flex items-center justify-center">...</span>
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600"
                                    onClick={() => setActivePage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </div>

                            <div className="relative">
                                <div className="flex items-center">
                                    <span className="mr-2 text-gray-600">Show</span>
                                    <div className="relative">
                                        <button
                                            className="border rounded px-2 py-1 flex items-center"
                                            onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                                        >
                                            <span className="mr-2">{rowsPerPage} rows</span>
                                            <FaChevronDown size={16} />
                                        </button>

                                        {showRowsDropdown && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
                                                {[5, 10, 20, 50].map((rows) => (
                                                    <div
                                                        key={rows}
                                                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => {
                                                            setRowsPerPage(rows);
                                                            setShowRowsDropdown(false);
                                                        }}
                                                    >
                                                        {rows} rows
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
