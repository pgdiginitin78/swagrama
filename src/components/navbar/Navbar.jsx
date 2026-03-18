import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import { Badge, Drawer, Modal, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.svg";
import LoginModal from "../loginModal/LoginModal";
import ShopCart from "../pages/eShop/ShopCart";
import { successAlert } from "../common/toast/CustomToast";
import { useAuth } from "../../context/AuthContext";

const ManageProfileModal = ({ open, onClose, user, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    userName: user?.userName || "",
  });
  const fileRef = useRef();

  useEffect(() => {
    if (open) {
      setForm({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        userName: user?.userName || "",
      });
      setAvatarPreview(user?.avatar || null);
      setEditing(false);
    }
  }, [user, open]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updated = { ...user, ...form, avatar: avatarPreview };
    localStorage.setItem("user", JSON.stringify(updated));
    onSave(updated);
    setEditing(false);
    successAlert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      userName: user?.userName || "",
    });
    setAvatarPreview(user?.avatar || null);
    setEditing(false);
  };

  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 1400 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "92vw", sm: 480 },
          maxHeight: "90vh",
          overflowY: "auto",
          outline: "none",
          borderRadius: "20px",
          background: "linear-gradient(145deg, #ffffff, #f0fdf4)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
          p: 0,
        }}
      >
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 rounded-t-[20px] px-6 pt-6 pb-14">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <CloseIcon fontSize="small" />
          </button>
          <p className="text-green-100 text-xs font-medium uppercase tracking-widest mb-1">
            Account
          </p>
          <h2 className="text-white text-xl font-bold">Manage Profile</h2>
        </div>
        <div className="flex justify-center -mt-10 mb-2 relative z-10">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-green-100 flex items-center justify-center"
              style={{ cursor: editing ? "pointer" : "default" }}
              onClick={() => editing && fileRef.current?.click()}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <PersonIcon sx={{ fontSize: 42, color: "#10b981" }} />
              )}
            </div>
            {editing && (
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow hover:bg-green-700 transition-colors"
              >
                <CameraAltIcon sx={{ fontSize: 14, color: "#fff" }} />
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        {!editing && (
          <>
            <p className="text-center text-green-800 font-semibold text-base mb-0.5">
              {form.firstName} {form.lastName}
            </p>
            {form.userName && (
              <p className="text-center text-green-500 text-xs mb-4">
                @{form.userName}
              </p>
            )}
          </>
        )}
        <div className="px-6 pb-6 space-y-3 mt-2">
          {[
            {
              key: "firstName",
              label: "First Name",
              icon: <BadgeIcon fontSize="small" />,
            },
            {
              key: "lastName",
              label: "Last Name",
              icon: <BadgeIcon fontSize="small" />,
            },
            {
              key: "userName",
              label: "Username",
              icon: <PersonIcon fontSize="small" />,
            },
            {
              key: "email",
              label: "Email",
              icon: <EmailIcon fontSize="small" />,
              type: "email",
            },
            {
              key: "phone",
              label: "Phone",
              icon: <PhoneIcon fontSize="small" />,
              type: "tel",
            },
          ].map(({ key, label, icon, type = "text" }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1 block">
                {label}
              </label>
              <div className="flex items-center gap-2 bg-white border-2 border-green-100 rounded-xl px-3 py-2 focus-within:border-green-400 transition-colors">
                <span className="text-green-400">{icon}</span>
                <input
                  type={type}
                  value={form[key]}
                  disabled={!editing}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className={`flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 ${
                    editing ? "" : "cursor-default"
                  }`}
                  placeholder={`Enter ${label}`}
                />
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all shadow-md"
              >
                <EditIcon fontSize="small" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all shadow-md"
                >
                  <SaveIcon fontSize="small" />
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

const ProfileDropdown = ({ user, onManage, onLogout, onClose }) => (
  <>
    <div
      className="fixed inset-0 z-[998]"
      onClick={onClose}
      aria-hidden="true"
    />

    <div
      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden z-[999]"
      style={{ animation: "fadeInDown 0.15s ease forwards" }}
    >
      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <p className="text-sm font-bold text-green-800 truncate">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-green-500 truncate">
          {user?.email || (user?.userName ? `@${user.userName}` : "")}
        </p>
      </div>

      <button
        onClick={onManage}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
      >
        <EditIcon fontSize="small" style={{ color: "#10b981" }} />
        Manage Profile
      </button>

      <div className="border-t border-gray-100" />
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogoutIcon fontSize="small" />
        Logout
      </button>
    </div>
  </>
);

const AvatarIcon = ({ user, size = 32 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-400 transition-all"
  >
    {user?.avatar ? (
      <img
        src={user.avatar}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    ) : (
      <PersonIcon sx={{ fontSize: size * 0.6, color: "#10b981" }} />
    )}
  </div>
);

const Navbar = () => {
  const { user, login, logout, updateUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const location = useLocation();
  const cart = useSelector((s) => s.cart.items);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSuccess = (userData) => {
    const fresh = userData || JSON.parse(localStorage.getItem("user"));
    login(fresh);
    setOpenLoginModal(false);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    successAlert("User logged out successfully");
  };

  const handleManageProfile = () => {
    setShowDropdown(false);
    setOpenProfile(true);
  };

  const handleProfileSave = (updated) => {
    updateUser(updated);
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
    if (!match) return { hi: text, en: "" };
    return { hi: match[1].trim(), en: match[2].trim() };
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-link { position: relative; display: inline-block; }
        .nav-link::after {
          content: ''; position: absolute;
          width: 0; height: 2px;
          bottom: -4px; left: 50%;
          background: linear-gradient(90deg, #10b981, #059669);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .btn-outline {
          position: relative; overflow: hidden; transition: all 0.3s ease;
        }
        .btn-outline::before {
          content: ''; position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent);
          transition: left 0.5s ease;
        }
        .btn-outline:hover::before { left: 100%; }
        .btn-outline:hover {
          border-color: #059669; color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -5px rgba(16,185,129,0.3);
        }

        .store-btn {
          background: #882E2E;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          transition: all 0.3s ease;
        }
        .store-btn:hover { transform: translateY(-2px) scale(1.05); }

        .mobile-menu-item { transition: all 0.2s ease; }
        .mobile-menu-item:hover { transform: translateX(8px); }
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
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[70px] 2xl:h-24">
                <img
                  src={SwagramaLogo}
                  className="h-full w-auto object-contain cursor-pointer outline-none ring-0 "
                  alt="Swagrama Logo"
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center gap-2 xl:space-x-6 2xl:space-x-8">
                {navLinks.map((item) => {
                  const { en, hi } = splitTitle(item.name);
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`nav-link group font-semibold transition-all leading-tight ${active ? "active" : ""}`}
                    >
                      <span
                        className={`block text-[10px] xl:text-[11px] 2xl:text-sm transition-colors ${active ? "text-green-600 font-bold" : "text-green-800 group-hover:text-green-600"}`}
                      >
                        {hi}
                      </span>
                      <span
                        className={`block text-[10px] xl:text-[11px] 2xl:text-sm ${active ? "text-green-600 font-semibold" : "text-green-700"}`}
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
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown((v) => !v)}
                    className="focus:outline-none"
                    aria-label="Profile menu"
                  >
                    <AvatarIcon user={user} size={36} />
                  </button>
                  {showDropdown && (
                    <ProfileDropdown
                      user={user}
                      onManage={handleManageProfile}
                      onLogout={handleLogout}
                      onClose={() => setShowDropdown(false)}
                    />
                  )}
                </div>
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
                className="store-btn relative flex items-center justify-center gap-1 xl:gap-2 px-2 xl:px-3 py-1.5 text-white rounded-lg font-medium shadow-md text-sm"
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
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown((v) => !v)}
                    className="focus:outline-none"
                    aria-label="Profile menu"
                  >
                    <AvatarIcon user={user} size={30} />
                  </button>
                  {showDropdown && (
                    <ProfileDropdown
                      user={user}
                      onManage={handleManageProfile}
                      onLogout={handleLogout}
                      onClose={() => setShowDropdown(false)}
                    />
                  )}
                </div>
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
          sx: { width: { xs: "85%", sm: "75%", md: 320 }, maxWidth: "100vw" },
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

          {user && (
            <button
              onClick={() => {
                setOpen(false);
                setOpenProfile(true);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PersonIcon sx={{ fontSize: 22, color: "#10b981" }} />
                )}
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-bold text-green-800 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-green-500">Manage Profile →</p>
              </div>
            </button>
          )}

          <div className="space-y-1 sm:space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]">
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
                    className={`block p-2.5 sm:p-3 md:p-3.5 rounded-lg transition-all ${active ? "bg-green-100 border-l-4 border-green-600" : "hover:bg-green-50"}`}
                  >
                    <div
                      className={`flex flex-col gap-0.5 sm:gap-1 transition-colors ${active ? "text-green-700" : "text-gray-800 hover:text-green-600"}`}
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
      <ManageProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={user}
        onSave={handleProfileSave}
      />
    </>
  );
};

export default Navbar;
