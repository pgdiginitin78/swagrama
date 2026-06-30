import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { CheckCircle2, Leaf, Minus, Package, Plus, ShoppingBag, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import { ModalStyle } from "../../common/modalStyle/ModalStyle";

// ─── Category Accent Colors (must match EShop.jsx) ──────────────────────────
const CATEGORY_ACCENTS = [
  { from: "#166534", to: "#4ade80", light: "#f0fdf4" }, // Green
  { from: "#4d7c0f", to: "#a3e635", light: "#f7fee7" }, // Lime/Olive
  { from: "#78350f", to: "#d97706", light: "#fffbeb" }, // Brown/Amber
  { from: "#14532d", to: "#22c55e", light: "#f0fdf4" }, // Dark Green
  { from: "#3f6212", to: "#84cc16", light: "#f7fee7" }, // Deep Lime
  { from: "#713f12", to: "#eab308", light: "#fefce8" }, // Brown/Yellow
];

const getCategoryAccent = (category, allCategories = []) => {
  const idx = allCategories.indexOf(category);
  if (idx === -1) return CATEGORY_ACCENTS[0];
  return CATEGORY_ACCENTS[idx % CATEGORY_ACCENTS.length];
};

// ─── Modal Component ─────────────────────────────────────────────────────────
const ProductDetailsModal = ({ open, handleClose, product, allCategories = [] }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setImgError(false);
      setAdded(false);
    }
  }, [open, product]);

  if (!product) return null;

  const accent = getCategoryAccent(product.category, allCategories);
  const total = product.value * quantity;

  const handleConfirm = () => {
    dispatch(addToCart({ ...product, quantity }));
    setAdded(true);
    setTimeout(() => {
      handleClose();
    }, 900);
  };

  return (
    <Modal
      open={open}
    >
      <Box sx={ModalStyle} className="rounded-xl">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border border-green-200 bg-white"
              style={{
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
                maxHeight: "95vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div
                  className="relative flex-shrink-0 sm:w-2/5"
                  style={{ height: 280, background: accent.light, overflow: "hidden" }}
                >

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 50% 50%, ${accent.to}20, transparent 70%)`,
                    }}
                  />

                  {product.image && !imgError ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={() => setImgError(true)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "10px",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: accent.light }}
                    >
                      <Leaf className="w-16 h-16 opacity-20" style={{ color: accent.from }} />
                    </div>
                  )}

                  <button
                    onClick={handleClose}
                    className="sm:hidden absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <X className="w-3.5 h-3.5 text-gray-700" />
                  </button>
                </div>


                <div className="flex-1 flex flex-col min-w-0">
                  <div className="px-4 pt-3 pb-1 flex justify-between items-start gap-2">
                    <div>
                      <h2
                        className="font-black text-sm leading-tight"
                        style={{ color: "#0f172a", letterSpacing: "-0.01em" }}
                      >
                        {product.name}
                      </h2>
                      {product.tagline && (
                        <p className="text-[10px] font-semibold mt-0.5" style={{ color: accent.from }}>
                          {product.tagline}
                        </p>
                      )}
                    </div>
                    <CancelButtonModal onClick={handleClose} />
                  </div>

                  <div className="px-4 pb-2 flex flex-wrap gap-1.5 mt-1">
                    {product.category && (
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold"
                        style={{
                          background: `${accent.from}12`,
                          color: accent.from,
                          border: `1px solid ${accent.from}20`,
                        }}
                      >
                        <Leaf className="w-2.5 h-2.5" />
                        {product.category.split(" ").slice(0, 2).join(" ")}
                      </div>
                    )}
                    {product.package && (
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold"
                        style={{
                          background: "#f8fafc",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Package className="w-2.5 h-2.5" />
                        {product.package}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-2 max-h-[220px]">
                    {product.ingredients && (
                      <div
                        className="p-2 rounded-lg border border-green-200 bg-green-50"
                      >
                        <p
                          className="text-[8px] font-bold uppercase tracking-wider mb-0.5 text-green-500"
                        >
                          Ingredients
                        </p>
                        <p className="text-[10px] leading-tight text-green-600">
                          {product.ingredients}
                        </p>
                      </div>
                    )}

                    {product.benefits && product.benefits.length > 0 && (
                      <div>
                        <p
                          className="text-[8px] font-bold uppercase tracking-wider mb-1 text-green-600"
                        >
                          Key Benefits
                        </p>
                        <div className="space-y-1">
                          {product.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-1.5">
                              <CheckCircle2
                                className="w-3 h-3 flex-shrink-0 text-green-600"
                              />
                              <span className="text-[10px] leading-tight text-green-600">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                  <div
                    className="px-4 py-2.5 border-t border-green-200 bg-green-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase text-green-600">
                          Total Amount
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-green-600">
                            ₹{total}
                          </span>
                          <span className="text-[9px] font-semibold whitespace-nowrap text-gray-500">
                            (₹{product.value} / unit)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">

                        <div
                          className="flex items-center rounded-lg overflow-hidden shadow-sm h-8 border border-green-200 bg-green-50"
                        >
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-7 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-800">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-7 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>


                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConfirm}
                          disabled={added}
                          className="h-8 px-4 rounded-lg font-bold text-white text-xs flex items-center gap-1.5 shadow-sm border border-green-200 bg-green-50"
                          style={{
                            background: added
                              ? "linear-gradient(135deg, #15803d, #4ade80)"
                              : `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {added ? (
                              <motion.span
                                key="added"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Added!
                              </motion.span>
                            ) : (
                              <motion.span
                                key="buy"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-1"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                Buy
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[11px] text-ayuLightBlue font-medium">All products are in stock and available for pickup from Swagrama.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Modal>
  );
};

export default ProductDetailsModal;
