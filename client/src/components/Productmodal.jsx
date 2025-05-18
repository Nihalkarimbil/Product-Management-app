import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    Typography,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategory } from '../store/slices/subCategoryslice';
import { Addpro } from '../store/slices/ProductSlice';


const ProductModal = ({ open, onClose }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [product, setProduct] = useState({
        name: '',
        subCategory: '',
        description: "",
        variants: [
            { ram: '', price: '', quantity: 1 },
            
        ],
        images: []
    });
    const { subCategory } = useSelector((state) => state.subcategory)
    
    const dispatch =useDispatch()

    useEffect(() => {
        dispatch(fetchSubCategory())
    }, [dispatch])

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleVariantChange = (index, field, value) => {
        const updated = [...product.variants];
        updated[index][field] = value;
        setProduct({ ...product, variants: updated });
    };

    const handleQuantityChange = (index, increment) => {
        const updated = [...product.variants];
        updated[index].quantity = Math.max(1, updated[index].quantity + increment);
        setProduct({ ...product, variants: updated });
    };

    const handleImageUpload = (e) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const newImages = [...product.images, file];
            setProduct({ ...product, images: newImages });
        }
    };
    

    const addVariant = () => {
        setProduct({
            ...product,
            variants: [...product.variants, { ram: '', price: '', quantity: 1 }]
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('subCategory', product.subCategory);
        formData.append('userId', user._id); 
        formData.append('variants', JSON.stringify(product.variants));

        product.images.forEach((image) => {
            formData.append('images', image);
        });

        
        await dispatch(Addpro(formData));

       
        onClose();
    };
    

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className='p'>
            <DialogTitle className="text-center font-medium border-gray-300 py-4">
                Add Product
            </DialogTitle>

            <DialogContent className="py-24">
                <div className="space-y-6">
                    
                    <div className="flex items-center gap-4">
                        <label className="w-32 text-gray-500">Title:</label>
                        <TextField
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                        />
                    </div>

                    
                    <div>
                        <div className="flex items-start gap-4">
                            <label className="w-32 text-gray-500 pt-1">Variants:</label>
                            <div className="w-full space-y-4">
                                {product.variants.map((variant, i) => (
                                    <div key={i} className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 w-44">
                                            <span className="text-sm text-gray-600">RAM:</span>
                                            <TextField
                                                value={variant.ram}
                                                onChange={(e) => handleVariantChange(i, 'ram', e.target.value)}
                                                size="small"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 w-44">
                                            <span className="text-sm text-gray-600">Price:</span>
                                            <TextField
                                                value={variant.price}
                                                onChange={(e) => handleVariantChange(i, 'price', e.target.value)}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: <span className="mr-1">$</span>
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2"  >
                                            <span className="text-sm text-gray-600">QTY:</span>
                                            <div className="flex items-center border rounded px-3 py-1">
                                                <IconButton size="small" onClick={() => handleQuantityChange(i, -1)}>
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <span className="mx-2">{variant.quantity}</span>
                                                <IconButton size="small" onClick={() => handleQuantityChange(i, 1)}>
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={addVariant}
                                    variant="contained"
                                    className="bg-gray-500 p-1 rounded-xl hover:bg-gray-600 text-white float-right"
                                >
                                    Add variants
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-32 text-gray-500">Sub Category:</label>
                        <FormControl fullWidth size="small">
                            
                            <Select
                                value={product.subCategory}
                                name="subCategory"
                                onChange={handleChange}
                                displayEmpty
                            >
                                 {subCategory?.map((item)=>(
                                    <MenuItem value={item._id}>{item.name}</MenuItem>
                                ))} 
                                
                                
                            </Select>
                        </FormControl>
                    </div>

                    
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-gray-500 pt-1">Description:</label>
                        <TextField
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            size="small"
                        />
                    </div>

                    
                    <div className="flex gap-4 items-start">
                        <label className="w-32 text-gray-500 pt-1">Upload Image:</label>
                        <div className="flex flex-wrap gap-4">
                            {product.images.map((image, i) => (
                                <div key={i} className="w-24 h-20 border rounded overflow-hidden">
                                    <img
                                        src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                        alt={`Product ${i}`}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            ))}


                            
                           
                            <label
                                htmlFor="upload-image"
                                className="w-24 h-20 border border-dashed flex items-center justify-center rounded cursor-pointer"
                            >
                                <input
                                    id="upload-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                <AddPhotoAlternateIcon />
                            </label>
                        </div>
                    </div>
                </div>
            </DialogContent>

            <DialogActions className="px-6 py-4">
                <Button onClick={onClose} variant="text" className="text-gray-600">
                    DISCARD
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
                >
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductModal;
