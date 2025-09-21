import { useState } from 'react';
import { useDeleteProductMutation } from '../features/api/apiSlice.jsx';
import EditProductModal from './EditProductModal.jsx';

const ProductCard = ({ product, categories = [] }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(product._id).unwrap();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    const getScoreClass = (score) => {
        if (score >= 80) return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800';
        if (score >= 60) return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800';
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800';
    };

    return (
        <>
            <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="px-4 sm:px-6 py-4">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm truncate flex-1 mr-2">{product.name}</h3>
                            <span className={getScoreClass(product.sustainabilityScore)}>
                                {product.sustainabilityScore}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {product.category}
                            </span>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg transition-colors duration-200 text-xs"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition-colors duration-200 text-xs disabled:bg-gray-400"
                                >
                                    {isDeleting ? 'Del...' : 'Del'}
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs truncate">{product.description}</p>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-4 items-center">
                        <div className="col-span-3">
                            <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                        </div>
                        <div className="col-span-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {product.category}
                            </span>
                        </div>
                        <div className="col-span-4">
                            <p className="text-gray-600 text-sm truncate">{product.description}</p>
                        </div>
                        <div className="col-span-1 text-center">
                            <span className={getScoreClass(product.sustainabilityScore)}>
                                {product.sustainabilityScore}
                            </span>
                        </div>
                        <div className="col-span-2 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-200 text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-200 text-sm disabled:bg-gray-400"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
           
            {showEditModal && (
                <EditProductModal 
                    product={product} 
                    categories={categories}
                    onClose={() => setShowEditModal(false)} 
                />
            )}
        </>
    );
};

export default ProductCard;