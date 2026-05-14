import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import {
  CalendarCheck,
  ChevronLeft,
  Database,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
} from "lucide-react";
import React, { useState } from "react";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#f8f9f7",
  borderRight: "1px solid #e5ebe0",
  // Make it relative to work with flex layouts
  position: "relative",
  height: "100%",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `72px`,
  backgroundColor: "",
  borderRight: "1px solid #e5ebe0",
  // Make it relative to work with flex layouts
  position: "relative",
  height: "100%",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuItems = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { key: "enquiries", label: "Enquiries", Icon: MessageSquare },
  { key: "bookings", label: "Bookings", Icon: CalendarCheck },
  // {
  //   key: "masters",
  //   label: "Masters",
  //   Icon: Database,
  //   children: [
  //     { key: "patient-master", label: "Patient Master" },
  //     { key: "doctor-master", label: "Doctor Master" },
  //     { key: "service-master", label: "Service Master" },
  //   ],
  // },
];

const bottomMenuItems = [
  { key: "settings", label: "Settings", Icon: Settings },
];

const AdminDrawer = ({
  activeMenu,
  onMenuChange,
  mobileOpen,
  onMobileClose,
}) => {
  const [open, setOpen] = useState(true);
  const [openMasters, setOpenMasters] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
    if (open) setOpenMasters(false);
  };

  const handleMastersClick = (e) => {
    e.stopPropagation();
    if (!open) {
      setOpen(true);
      setOpenMasters(true);
    } else {
      setOpenMasters(!openMasters);
    }
  };

  const handleMenuClick = (key) => {
    onMenuChange(key);
    if (mobileOpen) onMobileClose();
  };

  const isSelected = (key) => activeMenu === key;
  const isChildSelected = (item) =>
    item.children?.some((child) => child.key === activeMenu);

  const renderMenuItem = (item, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.Icon;
    const isParentActive = hasChildren && isChildSelected(item);
    const isDirectActive = isSelected(item.key);
    const active = isDirectActive || isParentActive;

    const showContent = isMobile || open;

    return (
      <React.Fragment key={item.key}>
        <ListItem disablePadding sx={{ display: "block", mb: 0.5 }}>
          <Tooltip
            title={
              !showContent ? (
                <Box sx={{ p: 0.5 }}>
                  {hasChildren ? (
                    <p
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "11px",
                        fontWeight: 900,
                        color: "#166534",
                        borderBottom: "1px solid rgba(22,101,52,0.15)",
                        paddingBottom: "4px",
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {item.label}
                    </p>
                  ) : (
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(item.key);
                      }}
                      sx={{
                        px: 1,
                        py: 0.5,
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "#166534",
                        cursor: "pointer",
                        borderRadius: "6px",
                        fontFamily: '"Inter", sans-serif',
                        "&:hover": {
                          backgroundColor: "rgba(22,101,52,0.08)",
                        },
                      }}
                    >
                      {item.label}
                    </Box>
                  )}
                  {hasChildren &&
                    item.children.map((child) => (
                      <Box
                        key={child.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuClick(child.key);
                        }}
                        sx={{
                          px: 1.5,
                          py: 0.8,
                          fontSize: "12px",
                          borderRadius: "6px",
                          backgroundColor: isSelected(child.key)
                            ? "rgba(22,101,52,0.12)"
                            : "transparent",
                          color: isSelected(child.key) ? "#166534" : "#4b7a5e",
                          cursor: "pointer",
                          fontWeight: isSelected(child.key) ? 800 : 500,
                          mb: 0.5,
                          transition: "all 0.2s",
                          "&:hover": {
                            backgroundColor: "rgba(22,101,52,0.08)",
                          },
                        }}
                      >
                        {child.label}
                      </Box>
                    ))}
                </Box>
              ) : (
                ""
              )
            }
            placement="right"
            arrow
            interactive={hasChildren}
            enterDelay={hasChildren ? 0 : 200}
            slotProps={{
              popper: {
                sx: {
                  [`& .MuiTooltip-tooltip`]: {
                    background:
                      "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                    color: "#166534",
                    fontWeight: 700,
                    fontSize: "12px",
                    px: 1.5,
                    py: 1.2,
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(34,197,94,0.15)",
                    border: "1px solid rgba(134,239,172,0.4)",
                  },
                  [`& .MuiTooltip-arrow`]: {
                    color: "#dcfce7",
                  },
                },
              },
            }}
          >
            <ListItemButton
              onClick={() => {
                if (hasChildren && showContent) {
                  setOpenMasters(!openMasters);
                } else {
                  handleMenuClick(item.key);
                }
              }}
              sx={{
                minHeight: 52,
                justifyContent: showContent ? "initial" : "center",
                px: 2.5,
                mx: 1,
                borderRadius: "12px",
                backgroundColor: active ? "white" : "transparent",
                boxShadow: active ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                color: active ? "#16a34a" : "#4a5568",
                "& .MuiListItemIcon-root": {
                  color: active ? "#16a34a" : "#4a5568",
                },
                "&:hover": {
                  background: active
                    ? "white"
                    : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  "& .MuiListItemIcon-root": {
                    color: "#16a34a",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: showContent ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {Icon && <Icon size={22} strokeWidth={active ? 2.5 : 2} />}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: showContent ? 1 : 0,
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                    fontWeight: active ? 700 : 600,
                    fontFamily: '"Inter", sans-serif',
                  },
                }}
              />
              {showContent &&
                hasChildren &&
                (openMasters ? (
                  <ExpandLess sx={{ fontSize: 18 }} />
                ) : (
                  <ExpandMore sx={{ fontSize: 18 }} />
                ))}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        {hasChildren && showContent && (
          <Collapse in={openMasters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ mt: 0.5 }}>
              {item.children.map((child) => {
                const childActive = isSelected(child.key);
                return (
                  <ListItemButton
                    key={child.key}
                    onClick={() => handleMenuClick(child.key)}
                    sx={{
                      minHeight: 40,
                      pl: 7,
                      pr: 2,
                      mx: 1,
                      mb: 0.5,
                      borderRadius: "10px",
                      backgroundColor: childActive
                        ? "rgba(22, 163, 74, 0.08)"
                        : "transparent",
                      color: childActive ? "#16a34a" : "#718096",
                      "& .MuiTypography-root": {
                        fontSize: "13px",
                        fontWeight: childActive ? 700 : 500,
                        fontFamily: '"Inter", sans-serif',
                      },
                      "&:hover": {
                        backgroundColor: childActive
                          ? "rgba(22, 163, 74, 0.12)"
                          : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                      },
                    }}
                  >
                    <ListItemText primary={child.label} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const UserProfile = ({ showLabels }) => (
    <Box
      sx={{
        mx: showLabels ? 1.5 : 1,
        p: showLabels ? 1.5 : 0.8,
        backgroundColor: "white",
        borderRadius: "14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        transition: "all 0.3s ease",
        justifyContent: showLabels ? "flex-start" : "center",
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#16a34a",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: "12px",
        }}
      >
        <img
          src="https://media.licdn.com/dms/image/v2/C4D03AQE1V2G2lXv7zA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623912169647?e=2147483647&v=beta&t=4G0H0Z4Y5G0H0Z4Y5G0H0Z4Y5G0H0Z4Y5G0H0Z4Y5"
          alt="Admin"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        SA
      </Box>
      {showLabels && (
        <Box sx={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 800,
              color: "#16a34a",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Swagram Admin
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "10px",
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Superuser
          </p>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <MuiDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "transparent",
            borderRight: "none",
            zIndex: 10,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
          <h1 className="font-bold text-[#16a34a] text-lg">Swagrama</h1>
        </Box>
        <Divider sx={{ mb: 1, opacity: 0.5 }} />
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => renderMenuItem(item, true))}
        </List>
        <Box sx={{ mt: "auto", p: 1.5, pb: 3 }}>
          <UserProfile showLabels={true} />
        </Box>
      </MuiDrawer>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        <DrawerHeader>
          {open ? (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.2, ml: 1 }}
            >
              <h1
                style={{ fontWeight: 800, fontSize: "18px", color: "#16a34a" }}
              >
                Swagrama
              </h1>
            </Box>
          ) : (
            <div />
          )}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "#16a34a",
              mr: open ? 0 : "auto",
              ml: open ? 0 : "auto",
            }}
          >
            {open ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </IconButton>
        </DrawerHeader>

        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => renderMenuItem(item, false))}
        </List>

        <Box sx={{ mt: "auto", pb: 3 }}>
          <UserProfile showLabels={open} />
        </Box>
      </Drawer>
    </>
  );
};

export default AdminDrawer;
