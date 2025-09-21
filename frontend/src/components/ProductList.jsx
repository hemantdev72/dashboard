import ProductCard from './ProductCard.jsx';

const ProductCardSkeleton = () => (
    <div className="bg-white border-b border-gray-200 animate-pulse">
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:hidden space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex space-x-2">
                        <div className="h-8 bg-gray-200 rounded w-12"></div>
                        <div className="h-8 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
            
            <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-4 items-center">
                <div className="col-span-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="col-span-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div className="col-span-4">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="col-span-1">
                    <div className="h-6 bg-gray-200 rounded-full w-12 mx-auto"></div>
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        </div>
    </div>
);

const ProductList = ({ products, isLoading, error, categories = [] }) => {
    if (isLoading) return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-700">
                    <div className="col-span-4 sm:col-span-3">Product Name</div>
                    <div className="col-span-3 sm:col-span-2">Category</div>
                    <div className="col-span-0 sm:col-span-4 hidden sm:block">Description</div>
                    <div className="col-span-2 sm:col-span-1 text-center">Score</div>
                    <div className="col-span-3 sm:col-span-2 text-right">Actions</div>
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => <ProductCardSkeleton key={index} />)}
            </div>
        </div>
    );
    
    if (error) return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Products</div>
            <div className="text-gray-600 mb-4">We're having trouble connecting to the database.</div>
            <button 
                onClick={() => window.location.reload()} 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
                Try Again
            </button>
        </div>
    );
    
    if (!products || products.length === 0) return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-2">No Products Found</div>
            <div className="text-gray-600">Try different Product</div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-700">
                    <div className="col-span-4 sm:col-span-3">Product Name</div>
                    <div className="col-span-3 sm:col-span-2">Category</div>
                    <div className="col-span-0 sm:col-span-4 hidden sm:block">Description</div>
                    <div className="col-span-2 sm:col-span-1 text-center">Score</div>
                    <div className="col-span-3 sm:col-span-2 text-right">Actions</div>
                </div>
            </div>
            
           
            <div className="divide-y divide-gray-200">
                {products.map(product => <ProductCard key={product._id} product={product} categories={categories} />)}
            </div>
        </div>
    );
};

export default ProductList;