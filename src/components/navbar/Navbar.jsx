import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Badge, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import LoginModal from "../loginModal/LoginModal";
import ShopCart from "../pages/eShop/ShopCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  const userData = localStorage.getItem("user");
  const location = useLocation();
  const cart = useSelector((s) => s.cart.items);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [userData]);

  const handleLoginSuccess = () => {
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setOpenLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const navLinks = [
    { name: "स्वारम्भ Home", path: "/" },
    { name: "स्वउपचारसेवा Healing Services", path: "/healing" },
    { name: "स्वसदस्यत्व Membership", path: "/membership" },
    { name: "स्वकर्मण्य Community Activities", path: "/community-activities" },
    { name: "स्वगुरुकुल Commune", path: "/commune" },
    { name: "स्वविपणि E Shop", path: "/eShop" },
    { name: "स्वप्राप्त Feeds", path: "/feeds" },
    { name: "स्ववर्षपद Calendar", path: "/calendar" },
  ];

  const splitTitle = (text) => {
    const match = text.match(/^([^A-Za-z]+)\s+(.*)$/);
    if (!match) {
      return { hi: text, en: "" };
    }
    return {
      hi: match[1].trim(),
      en: match[2].trim(),
    };
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .nav-link {
          position: relative;
          display: inline-block;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(90deg, #10b981, #059669);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #10b981, #059669);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);
        }

        .btn-outline {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-outline::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-outline:hover::before {
          left: 100%;
        }

        .btn-outline:hover {
          border-color: #059669;
          color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -5px rgba(16, 185, 129, 0.3);
        }

        .logo-glow {
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.3));
          transition: all 0.3s ease;
        }

        .logo-glow:hover {
          filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.5));
          animation: float 2s ease-in-out infinite;
        }

        .store-btn {
          background: #882E2E;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          transition: all 0.3s ease;
        }

        .store-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 12px 28px -5px rgba(251, 191, 36, 0.5);
        }

        .mobile-menu-item {
          transition: all 0.2s ease;
        }

        .mobile-menu-item:hover {
          transform: translateX(8px);
        }
      `}</style>

      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 
  ${
    scrolled
      ? "bg-white/40 backdrop-blur-xl border-b border-white/30 shadow-lg"
      : "bg-white/25 backdrop-blur-lg border-b border-white/20 shadow-md"
  }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
            <Link to="/" className="flex-shrink-0 z-10">
              <div className="h-10 sm:h-12 md:h-14 lg:h-16">
                <img
                  src={SwagramaLogo}
                  className="h-full w-auto object-contain cursor-pointer"
                  alt="Swagrama Logo"
                />
              </div>
            </Link>
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center gap-2 xl:gap-4 2xl:gap-6">
                {navLinks.map((item) => {
                  const { en, hi } = splitTitle(item.name);
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`nav-link group font-semibold transition-all leading-tight ${
                        active ? "active" : ""
                      }`}
                    >
                      <span
                        className={`block text-[10px] xl:text-[11px] 2xl:text-xs transition-colors ${
                          active
                            ? "text-green-600 font-bold"
                            : "text-green-800 group-hover:text-green-600"
                        }`}
                      >
                        {hi}
                      </span>
                      <span
                        className={`block text-[10px] xl:text-[11px] 2xl:text-xs ${
                          active
                            ? "text-green-600 font-semibold"
                            : "text-green-700"
                        }`}
                      >
                        {en}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#10b981",
                        fontSize: "0.875rem",
                      }}
                    >
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                  <button
                    type="button"
                    className="btn-outline flex items-center justify-center gap-1 xl:gap-2 px-2 xl:px-3 py-1 border-2 border-red-600 text-red-600 rounded-lg font-medium text-sm hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="text-base xl:text-lg" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn-outline flex items-center justify-center gap-1 xl:gap-2 px-2 xl:px-3 py-1 border-2 border-green-600 text-green-600 rounded-lg font-medium text-sm hover:bg-green-50"
                  onClick={() => setOpenLoginModal(true)}
                >
                  <LoginIcon className="text-base xl:text-lg" />
                </button>
              )}

              <button
                onClick={() => setOpenStore(true)}
                className="store-btn relative flex items-center justify-center gap-1 xl:gap-2 px-2 xl:px-3 py-1.5  text-white rounded-lg font-medium shadow-md text-sm"
              >
                <Badge
                  badgeContent={cartCount}
                  color="success"
                  overlap="circular"
                  invisible={cartCount === 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.65rem",
                      minWidth: "18px",
                      height: "18px",
                    },
                  }}
                >
                  <ShoppingCartIcon className="text-base xl:text-lg" />
                </Badge>
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              {user ? (
                <>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "#10b981",
                      fontSize: "0.75rem",
                    }}
                  >
                    {user.userName?.charAt(0).toUpperCase() ||
                      user.firstName?.charAt(0).toUpperCase() ||
                      "U"}
                  </Avatar>
                  <button
                    type="button"
                    className="btn-outline flex items-center justify-center p-[4.5px] sm:p-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="text-lg sm:text-xl" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn-outline flex items-center justify-center p-[4.5px] sm:p-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                  onClick={() => setOpenLoginModal(true)}
                >
                  <LoginIcon className="text-lg sm:text-xl" />
                </button>
              )}

              <button
                onClick={() => setOpenStore(true)}
                className="store-btn relative flex items-center justify-center p-1.5 sm:p-2 text-white rounded-lg shadow-md"
              >
                <Badge
                  badgeContent={cartCount}
                  color="success"
                  overlap="circular"
                  invisible={cartCount === 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.6rem",
                      minWidth: "16px",
                      height: "16px",
                    },
                  }}
                >
                  <ShoppingCartIcon className="text-lg sm:text-xl" />
                </Badge>
              </button>

              <button
                className="text-gray-700 hover:text-green-600 transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-green-50"
                onClick={() => setOpen(true)}
              >
                <MenuIcon className="text-2xl sm:text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "85%", sm: "75%", md: 320 },
            maxWidth: "100vw",
          },
        }}
      >
        <div className="w-full h-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 space-y-4 sm:space-y-6 bg-gradient-to-br from-white to-green-50">
          <div className="flex justify-between items-center pb-3 sm:pb-4 border-b-2 border-green-100">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-red-600 hover:text-red-700 transition-colors h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
            >
              <CloseIcon className="text-lg sm:text-xl" />
            </button>
          </div>

          <div className="space-y-1 sm:space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)]">
            {navLinks.map((item, index) => {
              const { en, hi } = splitTitle(item.name);
              const active = isActive(item.path);

              return (
                <div
                  key={item.name}
                  className="mobile-menu-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block p-2.5 sm:p-3 md:p-3.5 rounded-lg transition-all ${
                      active
                        ? "bg-green-100 border-l-4 border-green-600"
                        : "hover:bg-green-50"
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-0.5 sm:gap-1 transition-colors ${
                        active
                          ? "text-green-700"
                          : "text-gray-800 hover:text-green-600"
                      }`}
                    >
                      <span className="text-xs sm:text-sm md:text-base font-semibold">
                        {en}
                      </span>
                      <span className="text-[10px] sm:text-xs text-green-600">
                        {hi}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>

      {openStore && <ShopCart isOpen={openStore} setIsOpen={setOpenStore} />}
      {openLoginModal && (
        <LoginModal
          open={openLoginModal}
          handleClose={() => setOpenLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
