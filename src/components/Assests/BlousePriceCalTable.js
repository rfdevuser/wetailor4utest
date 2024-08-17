import React from 'react';

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
  liningFabricPrice
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
    </div>
  );
};

export default BlousePriceCalTable;
