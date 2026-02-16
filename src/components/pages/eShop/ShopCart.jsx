import { Delete } from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/CartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  boxShadow: "none",
  p: 0,
  outline: "none",
};

export default function ShopCart({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.value * item.quantity,
    0,
  );
  const tax = subtotal * 0.18;
  const shipping = cart.length > 0 ? 50 : 0;
  const total = subtotal + tax + shipping;

  // State for customer details form
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    payerName: "",
    payerEmail: "",
    payerMobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!customerDetails.payerName.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (
      !customerDetails.payerEmail.trim() ||
      !customerDetails.payerEmail.includes("@")
    ) {
      setError("Please enter a valid email");
      return false;
    }
    if (
      !customerDetails.payerMobile.trim() ||
      customerDetails.payerMobile.length !== 10
    ) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const handleProceedToCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const paymentData = {
        payerName: customerDetails.payerName.trim(),
        payerEmail: customerDetails.payerEmail.trim(),
        payerMobile: customerDetails.payerMobile.trim(),
        amount: total.toFixed(2).toString(), // Use actual cart total
      };

      console.log("Initiating payment with:", paymentData);

      const response = await fetch("http://localhost:5000/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Store transaction ID for later verification
        localStorage.setItem("currentTxnId", data.clientTxnId);
        // Redirect to payment gateway
        window.location.href = data.paymentUrl;
      } else {
        setError(
          data.message || "Payment initiation failed. Please try again.",
        );
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style} className="w-[90%] max-w-xl h-[80vh] max-h-[600px]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="h-full flex flex-col"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <div>
                      <h2 className="text-white font-semibold text-base">
                        {showCheckoutForm ? "Customer Details" : "Your Cart"}
                      </h2>
                      <p className="text-green-50 text-xs">
                        {cart.length} {cart.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {cart.length > 0 && !showCheckoutForm && (
                      <button
                        onClick={() => dispatch(clearCart())}
                        className="text-white/80 hover:text-red-600 hover:bg-red-100 p-2 rounded-full transition-all"
                        title="Clear cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowCheckoutForm(false);
                      }}
                      className="text-white/80 hover:text-red-600 hover:bg-red-100 p-2 font-semibold rounded-full transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
                  {!showCheckoutForm ? (
                    // CART VIEW
                    <>
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <div className="bg-green-50 rounded-full p-6 mb-3">
                            <ShoppingCart className="w-12 h-12 text-green-500" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Your cart is empty
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Add products to get started
                          </p>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-sm"
                          >
                            Browse Products
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <AnimatePresence>
                            {cart.map((item) => {
                              return (
                                <motion.div
                                  key={item.id}
                                  layout
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                                  className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all border border-green-200"
                                >
                                  <div className="flex gap-3">
                                    <div
                                      className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}
                                    >
                                      <InsertEmoticonIcon
                                        fontSize="large"
                                        className=" text-ayuBrown"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1 min-w-0 pr-2">
                                          <h4 className="font-semibold text-gray-800 text-sm truncate">
                                            {item.category}
                                          </h4>
                                          <p className="text-xs text-gray-900 font-semibold font-mono">
                                            {item.name}
                                          </p>
                                        </div>
                                        <button
                                          onClick={() =>
                                            dispatch(removeFromCart(item.id))
                                          }
                                          className="text-red-600 hover:text-red-600 hover:bg-red-100  transition-colors p-0.5"
                                        >
                                          <Delete className="w-4 h-4" />
                                        </button>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-1 py-0.5">
                                          <button
                                            onClick={() =>
                                              dispatch(
                                                updateQuantity({
                                                  id: item.id,
                                                  quantity: item.quantity - 1,
                                                }),
                                              )
                                            }
                                            className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center hover:border-green-300 transition-all"
                                          >
                                            <Minus className="w-3 h-3 text-gray-600" />
                                          </button>
                                          <span className="font-semibold text-sm w-6 text-center text-gray-900">
                                            {item.quantity}
                                          </span>
                                          <button
                                            onClick={() =>
                                              dispatch(
                                                updateQuantity({
                                                  id: item.id,
                                                  quantity: item.quantity + 1,
                                                }),
                                              )
                                            }
                                            className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-600 transition-all"
                                          >
                                            <Plus className="w-3 h-3" />
                                          </button>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-semibold text-green-600 text-sm">
                                            ₹
                                            {(
                                              item.value * item.quantity
                                            ).toLocaleString()}
                                          </p>
                                          <p className="text-xs text-gray-400">
                                            ₹{item.value} each
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      )}
                    </>
                  ) : (
                    // CHECKOUT FORM VIEW
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                          Enter Your Details
                        </h3>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="payerName"
                              value={customerDetails.payerName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                              disabled={loading}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="payerEmail"
                              value={customerDetails.payerEmail}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                              disabled={loading}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              name="payerMobile"
                              value={customerDetails.payerMobile}
                              onChange={handleInputChange}
                              placeholder="10-digit mobile number"
                              maxLength="10"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                              disabled={loading}
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="mt-3 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
                            ⚠️ {error}
                          </div>
                        )}
                      </div>

                      {/* Order Summary */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                          Order Summary
                        </h3>
                        <div className="space-y-2">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-xs"
                            >
                              <span className="text-gray-600">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="font-medium">
                                ₹{(item.value * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="bg-white border-t border-gray-200 px-4 py-3">
                    {/* Price Summary */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>GST (18%)</span>
                        <span className="font-medium text-gray-900">
                          ₹{tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-gray-900">
                          ₹{shipping}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 text-sm">
                            Total Amount
                          </span>
                          <span className="text-lg font-bold text-green-600">
                            ₹{total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid gap-2 md:gap-0 md:flex md:space-x-3 items-center">
                      {!showCheckoutForm ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setShowCheckoutForm(true)}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-sm"
                          >
                            Proceed to Checkout
                          </button>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                          >
                            Continue Shopping
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={handleProceedToCheckout}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {loading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                              </>
                            ) : (
                              "Pay Now"
                            )}
                          </button>
                          <button
                            onClick={() => setShowCheckoutForm(false)}
                            disabled={loading}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
                          >
                            Back to Cart
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Box>
    </Modal>
  );
}
