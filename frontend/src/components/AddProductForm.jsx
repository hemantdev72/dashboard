import { useState, useEffect } from 'react';
import { useAddProductMutation } from '../features/api/apiSlice.jsx';
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";    

const AddProductForm = ({ categories }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState(categories[0] || '');
    const [description, setDescription] = useState('');
    const [score, setScore] = useState(50);
    const [showForm, setShowForm] = useState(false);

    const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting product:', { name, category, description, sustainabilityScore: Number(score) });
        if (name && category && description) {
            try {
                const result = await addProduct({ name, category, description, sustainabilityScore: Number(score) });
                console.log('Add product result:', result);
            } catch (error) {
                console.error('Add product error:', error);
            }
        }
    };
    
    useEffect(() => {
        if(isSuccess) {
            setName('');
            setCategory(categories[0] || '');
            setDescription('');
            setScore(50);
            setShowForm(false);
        }
    }, [isSuccess, categories]);

    return (
        <div className="my-8">
            <button
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center justify-center transition-colors duration-200"
            >
               <FaPlus />
                Add New Product
            </button>
            
           
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md bg-white bg-opacity-20">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">New Sustainable Product</h3>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  <RxCross2 />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input 
                                        id="name" 
                                        type="text" 
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                        required 
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <div className="relative">
                                        <select 
                                            id="category" 
                                            value={category} 
                                            onChange={e => setCategory(e.target.value)} 
                                            required 
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="" disabled>Select a category</option>
                                            {categories.map(cat => <option key={cat} value={cat} className="py-2">{cat}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea 
                                        id="description" 
                                        value={description} 
                                        onChange={e => setDescription(e.target.value)} 
                                        rows="3" 
                                        required 
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">Sustainability Score: {score}</label>
                                    <input 
                                        id="score" 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={score} 
                                        onChange={e => setScore(e.target.value)} 
                                        className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                                        style={{accentColor: 'var(--color-primary)'}}
                                    />
                                </div>
                                
                                <div className="flex space-x-3">
                                    <button 
                                        type="submit" 
                                        disabled={isLoading} 
                                        className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 disabled:bg-gray-400"
                                    >
                                        {isLoading ? 'Adding...' : 'Add Product'}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                
                                {isError && <p className="text-danger text-center">Failed to add product.</p>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductForm;