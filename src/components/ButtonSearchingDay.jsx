import React, { useState } from 'react';

const ButtonSearchingDay = ({ day, date, onClick, isSelected }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            onClick={() => onClick(date)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`w-[116px] h-[46px] p-0 pr-2 gap-2 bg-white border-none cursor-pointer rounded-lg transition-colors duration-300 relative ${isSelected ? 'bg-purple-600 text-white' : isHovered ? 'bg-purple-600 text-white' : 'hover:bg-purple-600 hover:text-white'
                }`}
        >
            <h2 className="font-poppins text-lg font-semibold leading-5 text-center">{day}</h2>
            <h3 className={`text-gray-600 font-poppins text-sm font-medium leading-4 text-center ${isSelected || isHovered ? 'text-white' : ''}`}>
                {date}
            </h3>
            <div className="absolute right-0 top-24 w-24 h-0 border-l border-gray-300 opacity-0 transform rotate-90"></div>
        </button>
    );
}

export default ButtonSearchingDay;
