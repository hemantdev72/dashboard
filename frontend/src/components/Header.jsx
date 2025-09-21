import { FaLeaf } from "react-icons/fa";

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                    <FaLeaf />
                    </div>
                    <h1 className="text-2xl font-bold text-green-800">Sustainable Products</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;