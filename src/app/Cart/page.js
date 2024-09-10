"use client";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '@/redux/actions/cartActions';
import Link from 'next/link';

const Cart = ({ cart = [], removeFromCart }) => {
  // Handle case where cart is not an array
  if (!Array.isArray(cart)) {
    console.error('Expected cart to be an array but got:', cart);
    return <div>Error: Cart data is not an array.</div>;
  }

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Item</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Image</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="relative">
                <td className="border border-gray-400 px-4 py-2">
                  {item.productName}
                  <span
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 cursor-pointer"
                    style={{ transform: 'translate(50%, -50%)' }}
                  >
                    &times;
                  </span>
                </td>
                <td className="border border-gray-400 px-4 py-2">₹{item.totalPrice.toFixed(2)}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.image && <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover" />}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <Link href={`/SingleBlouseDescriptionPage?id=${item.productID}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-200">
              <td className="border border-gray-400 px-4 py-2"><strong>Total</strong></td>
              <td className="border border-gray-400 px-4 py-2"><strong>₹ {calculateTotal()}</strong></td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      image: PropTypes.string,
      productID: PropTypes.number.isRequired,
    })
  ),
  removeFromCart: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
