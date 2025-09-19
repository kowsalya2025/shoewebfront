import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Lock, Trash2 } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, updateCartSize } = useCart();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 53, seconds: 50 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart</h1>
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-semibold text-gray-800 mb-6 hover:text-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>

      {/* Delivery Timer */}
      <div className="bg-gray-100 rounded-2xl p-6 mb-8 text-center">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Free & Fast arriving by Monday</span> Order within{" "}
          <span className="font-bold text-red-600">
            {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds
          </span>
        </p>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-6 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-80 h-64 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                        <p className="text-xl font-bold text-gray-800">
                          MRP₹ {item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <span>Remove</span>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Size & Quantity Selectors */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <select
                        value={item.selectedSize || "41"}
                        onChange={(e) => updateCartSize(item.id, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        <option value="39">Size (39)</option>
                        <option value="40">Size (40)</option>
                        <option value="41">Size (41)</option>
                        <option value="42">Size (42)</option>
                        <option value="43">Size (43)</option>
                      </select>

                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            Quantity ({num})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">₹ {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-green-600">
              <span className="font-medium">Delivery</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-yellow-700 text-white py-4 rounded-lg font-bold text-2xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3"
          >
            <Lock className="w-5 h-5" />
            Checkout Securely
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;


