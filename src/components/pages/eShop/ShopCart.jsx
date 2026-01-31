import { Delete } from "@mui/icons-material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X
} from "lucide-react";
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
    0
  );
  const tax = subtotal * 0.18;
  const shipping = cart.length > 0 ? 50 : 0;
  const total = subtotal + tax + shipping;

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
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <div>
                      <h2 className="text-white font-semibold text-base">
                        Your Cart
                      </h2>
                      <p className="text-green-50 text-xs">
                        {cart.length} {cart.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {cart.length > 0 && (
                      <button
                        onClick={() => dispatch(clearCart())}
                        className="text-white/80 hover:text-red-600 hover:bg-red-100 p-2 rounded-full transition-all"
                        title="Clear cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-red-600 hover:bg-red-100 p-2 font-semibold rounded-full transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
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
                                    
                                  <InsertEmoticonIcon fontSize="large" className=" text-ayuBrown" />
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
                                            })
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
                                            })
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
                </div>
                {cart.length > 0 && (
                  <div className="bg-white border-t border-gray-200 px-4 py-3">
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
                    <div className="grid gap-2 md:gap-0 md:flex md:space-x-3 items-center">
                      <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-sm ">
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                      >
                        Continue Shopping
                      </button>
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
