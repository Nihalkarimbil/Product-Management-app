import React, { useState } from 'react';
import { Dialog } from '@mui/material';

const CategoryModal = ({ open, onClose, onSubmit }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = () => {
        if (categoryName.trim() && onSubmit) {
            onSubmit(categoryName);
            setCategoryName('');
        }
        onClose();
    };

    const handleDiscard = () => {
        setCategoryName('');
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
            <h2 className="text-center text-lg font-medium mb-4">Add Category</h2>

           
            <div className="mb-6">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                </label>
                <input
                    id="categoryName"
                    type="text"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                />
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleSubmit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-2 rounded-md"
                >
                    ADD
                </button>
                <button
                    onClick={handleDiscard}
                    className="text-gray-500 hover:text-gray-700 px-4 py-2 text-sm"
                >
                    DISCARD
                </button>
            </div>
        </Dialog>
    );
};

export default CategoryModal;
