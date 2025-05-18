import { useEffect, useState } from 'react';
import { FaCheck, FaHeart } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

export default function ProductDetails() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedRam, setSelectedRam] = useState('');
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchDtls();
    }, []);

    const fetchDtls = async () => {
        try {
            const res = await axiosInstance.get(`/product/getoneBy/${id}`);
            const data = res.data.data;
            const productsArray = Array.isArray(data) ? data : [data];
            setProduct(productsArray);
            if (productsArray.length > 0 && productsArray[0].variants?.length > 0) {
                setSelectedRam(productsArray[0].variants[0].ram + ' GB');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    if (!product.length) {
        return <div className="text-center p-10">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center space-x-2 mb-6 text-sm">
                <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-600">Product Details</span>
            </div>

            {product.map((pro) => (
                <div key={pro._id} className="flex flex-col md:flex-row gap-8 mb-16">

                    <div className="md:w-1/2">
                        <div className="border rounded-lg p-4 mb-4 bg-white">
                            <img
                                src={pro.images?.[0] || "/fallback.png"}
                                alt={pro.name}
                                className="w-full object-contain h-80"
                            />
                        </div>

                        {pro.images?.length > 1 && (
                            <div className="flex gap-4">
                                {pro.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg p-2 w-24 h-24 cursor-pointer bg-white"
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2">
                        <h1 className="text-2xl font-semibold text-blue-800 mb-2">{pro.name}</h1>
                        <div className="text-2xl font-bold mb-4">${pro.price}</div>

                        <div className="mb-4">
                            <div className="flex items-center mb-1">
                                <span className="text-gray-700 mr-2">Availability:</span>
                                <div className="flex items-center text-green-500">
                                    <FaCheck size={16} className="mr-1" />
                                    <span>In stock</span>
                                </div>
                            </div>
                            <div className="text-sm text-orange-500">Hurry up! Limited stock available!</div>
                        </div>

                        <hr className="my-6" />

                        <div className="mb-6">
                            <div className="text-gray-700 mb-2">RAM:</div>
                            <div className="flex gap-2">
                                {pro.variants?.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-1 border rounded ${selectedRam === variant.ram + ' GB'
                                            ? 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-100'
                                            }`}
                                        onClick={() => setSelectedRam(variant.ram + ' GB')}
                                    >
                                        {variant.ram} GB
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-gray-700 mb-2">Quantity:</div>
                            <div className="flex items-center">
                                <button
                                    className="w-8 h-8 flex items-center justify-center border rounded-l bg-gray-100"
                                    onClick={decreaseQuantity}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="w-12 h-8 text-center border-t border-b"
                                />
                                <button
                                    className="w-8 h-8 flex items-center justify-center border rounded-r bg-gray-100"
                                    onClick={increaseQuantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-yellow-500 text-white rounded-md font-medium hover:bg-yellow-600">
                                Edit product
                            </button>
                            <button className="px-6 py-3 bg-yellow-500 text-white rounded-md font-medium hover:bg-yellow-600">
                                Buy it now
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                                <FaHeart size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
