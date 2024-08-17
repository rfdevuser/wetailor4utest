import React from 'react';

const FabricCardShimmer = ({ count }) => {
  const shimmerCards = Array.from({ length: count }, (_, index) => (
    <div key={index} className="w-60 h-80 bg-gradient-to-r from-pink-100 to-sky-100 p-3 flex flex-col gap-1 rounded-br-3xl animate-pulse mx-auto">
      <div className="h-48 bg-gray-400"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="h-6 w-40 bg-gray-500 "></div>
            <div className="h-4 w-20 bg-gray-400 "></div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {shimmerCards}
    </div>
  );
}

export default FabricCardShimmer;
