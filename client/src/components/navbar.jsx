
import { useState } from 'react';
import { CiExport, CiHeart, CiMenuFries } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";



export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        // Implement actual search functionality here
    };

    return (
        <nav className="bg-blue-900 text-white w-full">

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                   
                    <div className="flex-shrink-0 font-bold text-xl">
                        BRAND
                    </div>

                    <div className="hidden md:block flex-grow mx-8">
                        <div className="flex w-full max-w-lg mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search any things"
                                className="w-full rounded-l-xl rounded-r-xl py-2 px-4 text-gray-700 bg-white focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-yellow-500 absolute right-0 h-10 hover:bg-yellow-600 text-white px-6 rounded-l-xl rounded-r-xl flex items-center justify-center transition-colors"
                            >
                                <span className="mr-2 lg:inline">Search</span>
                               
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="hover:text-yellow-500 flex items-center">
                            <CiHeart size={20} className="mr-1" />
                            <span className="hidden lg:inline">Sign in</span>
                        </button>

                        <button className="hover:text-yellow-500 flex items-center">
                            <CiShoppingCart size={20} className="mr-1" />
                            <span className="hidden lg:inline">Cart</span>
                            <span className="bg-yellow-500 text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">3</span>
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white">
                            {isMenuOpen ? <CiExport size={24} /> : <CiMenuFries size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-blue-800">
                    <div className="px-4 pt-2 pb-4 space-y-3">
                    
                        <div className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search any things"
                                className="w-full rounded-l-md py-2 px-3 text-gray-700 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 rounded-r-md flex items-center justify-center"
                            >
                                serch
                            </button>
                        </div>

                         <div className="space-y-2">
                            <button className="w-full text-left py-2 flex items-center hover:text-yellow-500">
                                <CiHeart size={20} className="mr-3" />
                                Wishlist
                            </button>
                          
                            <button className="w-full text-left py-2 flex items-center hover:text-yellow-500">
                                <CiShoppingCart size={20} className="mr-3" />
                                Cart
                                <span className="bg-yellow-500 text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">3</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}