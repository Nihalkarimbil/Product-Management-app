import { useEffect, useState } from 'react';
import { CiExport, CiHeart, CiMenuFries, CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../store/slices/wishlistSlice';
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { items } = useSelector(state => state.Wishlist); 
    console.log(items);
    const Dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    useEffect(() => {
        if (user && user._id) {
            Dispatch(getWishlist(user._id));
        }
    }, [Dispatch, user._id]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);
    const handleSearch = () => console.log('Searching for:', searchQuery);

    return (
        <>
            <nav className="bg-blue-900 text-white w-full">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 font-bold text-xl">BRAND</div>

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
                            {user ? (<><button
                                className="hover:text-yellow-500 flex items-center"
                                onClick={toggleWishlist}
                            >
                                <CiHeart size={20} className="mr-1" />
                                <span className="hidden lg:inline">Wishlist</span>
                                <span className="bg-yellow-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center ml-1">
                                    {items?.products?.length || 0}
                                </span>
                            </button></>):<Link to={"/login"}>Sign in</Link>}
                            

                            <button className="hover:text-yellow-500 flex items-center">
                                <CiShoppingCart size={20} className="mr-1" />
                                <span className="hidden lg:inline">Cart</span>
                                <span className="bg-yellow-500 text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">0</span>
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
                                    Search
                                </button>
                            </div>

                            <div className="space-y-2">
                                <button
                                    className="w-full text-left py-2 flex items-center hover:text-yellow-500"
                                    onClick={toggleWishlist}
                                >
                                    <CiHeart size={20} className="mr-3" />
                                    Wishlist
                                    <span className="bg-yellow-500 text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                                        {items?.products?.length || 0}
                                    </span>
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

            <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <CiHeart size={20} className="text-blue-900 mr-2" />
                        <h2 className="font-semibold text-lg text-gray-800">Items</h2>
                    </div>
                    <button onClick={toggleWishlist} className="text-gray-500 hover:text-gray-700">
                        <IoClose size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto h-full pb-20">
                    {items?.products?.length > 0 ? (
                        items?.products?.map((item) => (
                            <div key={item._id} className="p-4 border-b border-gray-200 flex items-center">
                                <div className="mr-3">
                                    <img
                                        src={item?.images[0]||"/api/img"}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                    <p className="text-gray-700 font-semibold mt-1">${item.price?.toFixed(2) || '0.00'}</p>
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-sm ${i < (item.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <button className="text-blue-500">
                                    <MdOutlineKeyboardArrowRight size={20} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            No items in your wishlist
                        </div>
                    )}
                </div>
            </div>

            {isWishlistOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
                    onClick={toggleWishlist}
                />
            )}
        </>
    );
}
