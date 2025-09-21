import { useGetCategoryStatsQuery } from '../features/api/apiSlice.jsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
    const { data: stats, isLoading, error } = useGetCategoryStatsQuery();
    
    if (isLoading) return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Products by Category</h3>
            <div className="h-64 flex items-center justify-center animate-pulse">
                <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    if (error || !stats || stats.length === 0) return null;
    
    const chartData = {
        labels: stats.map(stat => stat._id),
        datasets: [
            {
                data: stats.map(stat => stat.count),
                        backgroundColor: [
                            'rgba(22, 163, 74, 0.8)',
                            'rgba(37, 99, 235, 0.8)',  
                            'rgba(168, 85, 247, 0.8)', 
                            'rgba(220, 38, 38, 0.8)',  
                            'rgba(217, 119, 6, 0.8)',  
                            'rgba(16, 185, 129, 0.8)', 
                        ],
                        borderColor: [
                            'rgba(22, 163, 74, 1)', 
                            'rgba(37, 99, 235, 1)', 
                            'rgba(168, 85, 247, 1)',
                            'rgba(220, 38, 38, 1)', 
                            'rgba(217, 119, 6, 1)', 
                            'rgba(16, 185, 129, 1)',
                        ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const stat = stats[context.dataIndex];
                        return `${context.label}: ${context.parsed} products (Avg: ${Math.round(stat.avgScore)})`;
                    }
                }
            },
        },
        cutout: '60%',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Products by Category</h3>
            <div className="h-64">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default CategoryChart;