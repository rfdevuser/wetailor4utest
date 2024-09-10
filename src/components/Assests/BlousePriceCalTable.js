
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '@/redux/actions/cartActions';
import { toast } from 'react-toastify'; 
const BlousePriceCalTable = ({
  productName,
  productPrice,
  sleevesName,
  sleevesPrice,
  detailsName,
  detailsPrice,
  extraName,
  extraPrice,
  mainFabricName,
  mainFabricPrice,
  liningFabricName,
  liningFabricPrice,
  productImage, 
  productID,
  addToCart
}) => {
  // Function to format and parse price string to a number
  const formatPrice = (priceString) => {
    if (typeof priceString === 'string') {
      const numericPrice = priceString.replace(/[^0-9.]/g, '');
      return parseFloat(numericPrice);
    }
    return 0; // Default to 0 if not a string
  };

  // Calculate total price, ensuring all parts are valid numbers
  const totalPrice = (
    (formatPrice(productPrice) || 0) +
    (parseFloat(sleevesPrice) || 0) +
    (parseFloat(detailsPrice) || 0) +
    (parseFloat(extraPrice) || 0) +
    (formatPrice(mainFabricPrice) || 0) +
    (formatPrice(liningFabricPrice) || 0)
  ).toFixed(2);
  const [clickCount, setClickCount] = useState(0);
  const handleAddToCart = () => {
    console.log(productID)
    const item = {
      id: Date.now(), // Unique ID for each item
      productName,
      productPrice: formatPrice(productPrice),
      sleevesName,
      sleevesPrice: parseFloat(sleevesPrice),
      detailsName,
      detailsPrice: parseFloat(detailsPrice),
      extraName,
      extraPrice: parseFloat(extraPrice),
      mainFabricName,
      mainFabricPrice: formatPrice(mainFabricPrice),
      liningFabricName,
      liningFabricPrice: formatPrice(liningFabricPrice),
      totalPrice: parseFloat(totalPrice),
      image: productImage, // Assuming you pass an image URL or path
      productID
    };
    setClickCount(prevCount => prevCount + 1);
    addToCart(item);
    toast.success('Item added to cart!');
  };

  return (
    <div>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Item</th>
            <th className="border border-gray-400 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {productName && productPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{productName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{formatPrice(productPrice)}</td>
            </tr>
          )}
          {sleevesName && sleevesPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{sleevesName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{sleevesPrice}</td>
            </tr>
          )}
          {detailsName && detailsPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{detailsName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{detailsPrice}</td>
            </tr>
          )}
          {extraName && extraPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{extraName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{extraPrice}</td>
            </tr>
          )}
          {mainFabricName && mainFabricPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{mainFabricName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{formatPrice(mainFabricPrice)}</td>
            </tr>
          )}
          {liningFabricName && liningFabricPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{liningFabricName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{formatPrice(liningFabricPrice)}</td>
            </tr>
          )}
          {(productName || sleevesName || detailsName || extraName || mainFabricName || liningFabricName) && (
            <tr className="bg-gray-200">
              <td className="border border-gray-400 px-4 py-2"><strong>Total</strong></td>
              <td className="border border-gray-400 px-4 py-2"><strong>₹ {totalPrice}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-center p-4'>
   
<button  onClick={handleAddToCart}
  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#db2777] backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
>
  <span className="text-lg">   Add to Cart</span>
  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-[#fde047] text-[#9d174d] text-xs rounded-full px-1.5 py-1.5">
        {clickCount}
      </span>
  <div
    className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
  >
    <div className="relative h-full w-10 bg-white/20"></div>
  </div>
</button>

      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(BlousePriceCalTable);
