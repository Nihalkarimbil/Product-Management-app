import { useEffect, useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronRight, FaHeart } from "react-icons/fa6";
import ProductModal from '../components/Productmodal';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, fetchcategory } from '../store/slices/categorySlice';
import { addsubCategory, togleSubCategory } from '../store/slices/subCategoryslice';
import { ProductsBySubcategory } from '../store/slices/ProductSlice';
import { Link } from 'react-router-dom';
import CategoryModal from '../components/category';
import SubCategoryModal from '../components/subCategorymodal';
import { addToWishlist, getWishlist } from '../store/slices/wishlistSlice';


export default function Home() {
    const { subCategory } = useSelector(state => state.subcategory)
    const { product } = useSelector(state => state.Product)  
    const { category } = useSelector(state => state.Category)
    const dispatch = useDispatch()
    const [isopen, setisOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [open, setOpen] = useState(false);
    const [subopen, setsubOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    
    useEffect(() => {
        dispatch(fetchcategory())
    }, [dispatch])

    const handlemoOpen = () => {
        setisOpen(true);
    };

    const handlemoClose = () => {
        setisOpen(false)
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handlesubOpen = () => {
        setsubOpen(true);
    };

    const handlesubClose = () => {
        setsubOpen(false);
    };

    const handleSubmit = async (categoryName) => {
        try {
            await dispatch(addCategory(categoryName));
            await dispatch(fetchcategory())
            setisOpen(false)
        } catch (error) {
            console.log(error);
            
        }
    };

    const handlesubSubmit = async (categoryName) => {
        try {
            await dispatch(addsubCategory(categoryName));
            setisOpen(false)
        } catch (error) {
            console.log(error);
        }
    };
    

    
    const toggleCategory = async (categoryId) => {
        await dispatch(togleSubCategory(categoryId));
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const handleAddtoWishlist=async(productId)=>{
        try {
            const dataTosend = {
                productId: productId,
                userId: user._id
            }

            await dispatch(addToWishlist(dataTosend))
            await dispatch(getWishlist(user._id))
        } catch (error) {
            console.log(error);
            
        }
        

    }

 

    return (
        <div className="container mx-auto p-4">

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-gray-600">
                    <span className="mr-2">Home</span>
                    <FaChevronRight size={16} />
                </div>

                <div className="flex space-x-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl" onClick={handlemoOpen}>
                        Add category
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl" onClick={handlesubOpen}>
                        Add sub category
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl" onClick={handleOpen}>
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

                        {category?.map((cat) => (
                            <li key={cat._id} className="py-1">
                                <div
                                    className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-blue-600"
                                    onClick={() => toggleCategory(cat._id)}
                                >
                                    <span>{cat.name}</span>
                                    {expandedCategories[cat._id] ? (
                                        <FaChevronDown size={18} />
                                    ) : (
                                        <FaChevronRight size={18} />
                                    )}
                                </div>

                                {expandedCategories[cat._id] && (
                                    <ul className="ml-4 mt-1 space-y-1">
                                        {subCategory.map((sub) => (
                                    
                                            <li
                                                key={sub._id}
                                                className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600"
                                                onClick={() => {
                                                    setSelectedSubcategory(sub._id);
                                                    dispatch(ProductsBySubcategory(sub._id));
                                                }}
                                            >
                                                <div className="w-5 h-5 flex items-center justify-center mr-2">
                                                    {sub._id === selectedSubcategory ? (
                                                        <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center">
                                                            <FaCheck size={14} className="text-white" />
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <span>{sub.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product && product.length > 0 ? (
                            product.map((product) => (
                                <div key={product._id} className=" border border-gray-100 rounded-md p-4 flex flex-col relative shadow-lg">
                                    <button className="absolute top-4 right-4 bg-blue-50 p-1 rounded-full" onClick={()=>handleAddtoWishlist(product._id)}>
                                        <FaHeart size={18} className="text-blue-500" />
                                    </button>

                                    <div className="flex justify-center mb-4">
                                        {product.images.length > 0 && (
                                            <img
                                                src={typeof product.images[0] === 'string'
                                                    ? product.images[0]
                                                    : URL.createObjectURL(product.images[0])}
                                                alt="Preview"
                                                className="h-32 object-contain"
                                            />
                                        )}
                                    </div>
                                    <Link to={`/detailsof/${product._id}`}>
                                    <h3 className="text-blue-800 font-medium mb-2">{product.name}</h3>
                                    <p className="font-bold mb-2">${product.price}</p>

                                    <div className="flex">
                                        {Array(5).fill().map((_, i) => (
                                            <span key={i} className="text-gray-300">★</span>
                                        ))}
                                    </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                selecte A subcategory .
                            </div>
                        )}

                    </div>

                </div>
            </div>
            <ProductModal
                open={open}
                onClose={handleClose}
            />

            <CategoryModal
                open={isopen}
                onClose={handlemoClose}
                onSubmit={handleSubmit}
            />
            <SubCategoryModal
                open={subopen}
                onClose={handlesubClose}
                onSubmit={handlesubSubmit}
            />
        </div>
    );
}
