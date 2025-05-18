import React, { useEffect, useState } from 'react';
import { Dialog, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcategory } from '../store/slices/categorySlice';

const SubCategoryModal = ({ open, onClose, onSubmit }) => {
    const { category } = useSelector(state => state.Category)
    const dispatch =useDispatch()

    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');

    useEffect(() => {
        dispatch(fetchcategory())
    }, [dispatch])
    
    const handleAdd = () => {
        if (selectedCategory && subCategoryName.trim()) {
            onSubmit({ category: selectedCategory, name: subCategoryName });
            setSelectedCategory('');
            setSubCategoryName('');
            onClose();
        }
    };

    const handleDiscard = () => {
        setSelectedCategory('');
        setSubCategoryName('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                className: 'rounded-md shadow-lg p-6 bg-white',
            }}
        >
            <h2 className="text-center text-lg font-semibold mb-6">Add Sub Category</h2>

            <div className="mb-4">
                <Select
                    fullWidth
                    displayEmpty
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                    renderValue={(value) => {
                        const selected = category.find((cat) => cat._id === value);
                        return selected ? selected.name : 'Select category';
                    }}
                >
                    {category.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            <div className="mb-6">
                <TextField
                    fullWidth
                    placeholder="Enter sub category name"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    className="text-sm"
                    variant="outlined"
                />
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleAdd}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-md"
                >
                    ADD
                </button>
                <button
                    onClick={handleDiscard}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-md"
                >
                    DISCARD
                </button>
            </div>
        </Dialog>
    );
};

export default SubCategoryModal;
