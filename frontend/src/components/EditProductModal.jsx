import { useState, useEffect } from 'react';
import { useUpdateProductMutation } from '../features/api/apiSlice.jsx';

const EditProductModal = ({ product, onClose, categories = [] }) => {
    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [score, setScore] = useState(product.sustainabilityScore);

    const [updateProduct, { isLoading, isSuccess, isError }] = useUpdateProductMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && category && description) {
            await updateProduct({ 
                id: product._id, 
                name, 
                category, 
                description, 
                sustainabilityScore: Number(score) 
            });
        }
    };
    
    useEffect(() => {
        if(isSuccess) {
            onClose();
        }
    }, [isSuccess, onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md bg-white bg-opacity-20">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Edit Product</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input 
                                id="edit-name"
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                required 
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <div className="relative">
                                <select 
                                    id="edit-category"
                                    value={category} 
                                    onChange={e => setCategory(e.target.value)} 
                                    required 
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white appearance-none cursor-pointer pr-10"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="py-2">{cat}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea 
                                id="edit-description"
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                rows="3" 
                                required 
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="edit-score" className="block text-sm font-medium text-gray-700">Sustainability Score: {score}</label>
                            <input 
                                id="edit-score"
                                type="range" 
                                min="0" 
                                max="100" 
                                value={score} 
                                onChange={e => setScore(e.target.value)} 
                                        className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{accentColor: 'var(--color-primary)'}}
                            />
                        </div>
                        
                        <div className="flex space-x-3">
                            <button 
                                type="submit" 
                                disabled={isLoading} 
                                        className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 disabled:bg-gray-400"
                            >
                                {isLoading ? 'Updating...' : 'Update Product'}
                            </button>
                            <button 
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                        
                                {isError && <p className="text-danger text-center">Failed to update product.</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
