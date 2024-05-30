import React from 'react';
import TypeFilter from './TypeFilter.jsx';

function Filter() {
	return (
		<>
			<div className='shadow-md border-2 rounded-3xl size-64 text-black bg-white gap-2'>
				<div className='flex flex-row h-full justify-center items-center'>
					<div className='flex flex-col w-full mx-4'>
						<div className='text-base font-medium mb-4'>
							<p>Filter</p>
						</div>
						<div>
							<TypeFilter
								icons={'box_transit.png'}
								label={'Transit'}
							/>
							<TypeFilter
								icons={'love_fasilitas.png'}
								label={'Fasilitas'}
							/>
							<TypeFilter
								icons={'dollar_harga.png'}
								label={'Harga'}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Filter;
