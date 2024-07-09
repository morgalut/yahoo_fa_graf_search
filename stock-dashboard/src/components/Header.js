import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ setStockData }) => {
    return (
        <header className="bg-black border-b border-gray-700">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* lg+ */}
                <nav className="flex items-center justify-between h-16 lg:h-20">


                    <button type="button" className="inline-flex p-2 text-white transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <div className="hidden md:flex md:items-center md:space-x-10">
                        <a href="#" title="" className="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> Features </a>

                        <a href="#" title="" className="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> About us </a>

                        <a href="#" title="" className="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> Pricing </a>
                    </div>                    <SearchBar setStockData={setStockData} />

                </nav>           
                



    
            </div>
        </header>
    );
};

export default Header;
