// components/Cart.tsx

"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/actions/cartActions';
import Image from 'next/image';
import Link from 'next/link';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (index: number) => {
    dispatch(removeFromCart(index));
  };

  return (
    <>
    <div className='flex flex-col lg:flex-row h-full mb-20'>
<div className="w-full lg:w-3/4 mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
  <ul className="space-y-4">
    {cartItems.length === 0 ? (
      <li className="py-4 text-center text-gray-500">Your cart is empty</li>
    ) : (
      cartItems.map((item:any, index:any) => (
        <li key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mr-4" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={() => handleRemoveFromCart(index)}
            className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Remove
          </button>
        </li>
      ))
    )}
  </ul>
  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 mb-4 sm:mb-0">
      Continue Shopping
    </button>
    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200">
      Proceed to Checkout
    </button>
  </div>
</div>

{/* right side card */}
<div className='w-full lg:w-1/4'>
<div className=' w-100 bg-[#f5f5f4]'> 
  <Image
  src='/Backgrounds/cartchatbg.jpg'
  alt='image'
  height={400}
  width={400}
  loading='lazy'
  />
  <p className='text-center text-xl text-[#525252]'>Make Your Product Your Own </p>
  <p className='text-center text-md mb-2 text-[#b91c1c]'>You Decide, We Deliver. </p>
  <Link href='/chatLanguageSelectionPage'>
  <button className='bg-[#1e293b] text-white p-2 w-full mx-2 rounded-md'>Chat With Our Designer</button>
  </Link>
</div>
</div>
</div>
</>
  );
};

export default Cart;
