import React from 'react';
import Image from 'next/image';

const Card: React.FC<{ title: string , image: string }> = ({ title , image }) => {
  return (
    <div className="transform transition duration-300 hover:scale-110 rounded-lg  h-35 w-20 hover:shadow-xl bg-white  mt-5">
      <div className="flex flex-col justify-center items-center h-full">
      <style jsx>{`
    .rounded-image {
      border-radius: 100%; /* Makes the image round */
      overflow: hidden; /* Ensures the image is completely contained within the rounded border */
    }
  `}</style>
  <div className="rounded-image">
        <Image
          src={image}
          alt='wetailor4u_logo'
          width={40}
          height={50}
        />
   </div>
      <div className="px-1 pt-2 flex flex-col">
        <h2 className="font-semibold">{title}</h2>
      </div>
      </div>
    </div>
  );
};

export default Card;
