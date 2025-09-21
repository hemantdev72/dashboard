import { useGetTopProductsQuery } from '../features/api/apiSlice.jsx';

const TopProducts = () => {
    const { data: topProducts, isLoading, error } = useGetTopProductsQuery({ limit: 3 });
    
    if (isLoading) return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top 3 Products</h3>
            <div className="space-y-4 animate-pulse">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    if (error || !topProducts || topProducts.length === 0) return null;
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top 3 Products</h3>
            <ul className="space-y-4">
                {topProducts.map((product, index) => (
                    <li key={product._id} className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">{index + 1}. {product.name}</span>
                                <span className="font-bold text-green-600">{product.sustainabilityScore}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopProducts;