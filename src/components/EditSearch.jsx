import React from 'react';

const EditSearch = ({ origin, destination, passengers, classType, onEdit }) => {
    return (
        <div className="flex p-4">
            <div className="w-[700px] h-[50px] p-2 px-4 gap-2 rounded-lg bg-purple-500 flex items-center">
                <a href="#" onClick={onEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" className='text-white' />
                    </svg>
                </a>
                <h1 className="font-poppins text-base font-medium leading-6 text-white text-center w-[305px]">
                    {`${origin} > ${destination} - ${passengers} Penumpang - ${classType}`}
                </h1>
            </div>
            <button className="w-[220px] h-[50px] p-2 px-4 gap-2 rounded-lg bg-green-500 text-white font-poppins text-base font-bold leading-6 text-center border-none cursor-pointer ml-2">
                Ubah Pencarian
            </button>
        </div>
    );
}

export default EditSearch;
