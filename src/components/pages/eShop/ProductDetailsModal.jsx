import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { Leaf, ShoppingBag, Plus, Minus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import CancelButtonModal from "../../common/button/CancelButtonModal";

const ProductDetailsModal = ({ open, handleClose, product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setImgError(false);
    }
  }, [open, product]);

  if (!product) return null;

  const total = product.value * quantity;

  const handleConfirm = () => {
    dispatch(addToCart({ ...product, quantity }));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{ outline: "none" }}
        className="bg-white rounded shadow-2xl w-full max-w-sm relative flex flex-col"
      >
        <CancelButtonModal
          onClick={handleClose}
        />

        <div className="flex items-start gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
          <div
            className="flex-shrink-0 rounded-xl overflow-hidden border border-green-100 bg-gradient-to-br from-green-50 to-lime-50 shadow-sm"
            style={{ width: 88, height: 88 }}
          >
            {product.image && !imgError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-green-300" />
              </div>
            )}
          </div>

          <div className="flex-1 pr-7 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 leading-snug">
              {product.name}
            </h2>
            {product.tagline && (
              <p className="text-[11px] text-green-600 mt-0.5">
                {product.tagline}
              </p>
            )}
            <p className="text-base font-bold text-gray-900 mt-1">
              ₹{product.value}
            </p>
          </div>
        </div>

        <div className="px-4 py-3 space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 rounded-lg px-2 py-2 border border-green-200">
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                Category
              </p>
              <p className="text-[10px] font-semibold text-gray-800 leading-tight">
                {product.category}
              </p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg px-2 py-2 border border-green-200">
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                Package
              </p>
              <p className="text-[10px] font-semibold text-gray-800 leading-tight">
                {product.package}
              </p>
            </div>
          </div>

          {product.ingredients && (
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Ingredients
              </p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {product.benefits && product.benefits.length > 0 && (
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Key Benefits
              </p>
              <div className="space-y-1">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <span className="text-green-500 text-[12px] leading-none mt-0.5 flex-shrink-0">
                      ●
                    </span>
                    <span className="text-[11px] text-gray-600 leading-tight">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-medium">
              Quantity
            </span>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-8">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-medium">
              Total Amount
            </span>
            <span className="text-base font-bold text-green-700">₹{total}</span>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-green-700 text-white py-2.5 rounded font-bold hover:bg-green-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">Buy Now</span>
          </button>
        </div>
        <div className="p-4">
          <p className="text-[11px] text-ayuLightBlue font-medium">All products are in stock and available for pickup from Swagrama.</p>
        </div>
      </Box>
    </Modal>
  );
};

export default ProductDetailsModal;
