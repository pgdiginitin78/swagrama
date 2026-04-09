import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BeautyTherapy from "./beautyTherapy/BeautyTherapy";
import DetoxHouse from "./detoxHouse/DetoxHouse";
import IPDHospital from "./ipdHospital/IPDWellnessStay";
import NatureTherapy from "./natureTherapy/NatureTherapy";
import OPDClinic from "./opdClinic/OPDClinic";

const tabsData = [
  {
    label: "OPD Clinic",
    fullLabel: "स्वचिचित्सालय OPD Clinic",
    component: <OPDClinic />,
    color: "#4a90a4",
    bgColor: "rgba(74, 144, 164, 0.08)",
    darkColor: "#2d5f7d",
  },
  {
    label: "Wellness",
    fullLabel: "स्वास्थ्य निवास Wellness Stay",
    component: <IPDHospital />,
    color: "#5a437a",
    bgColor: "rgba(90, 67, 122, 0.08)",
    darkColor: "#3d2e52",
  },
  {
    label: "Detox",
    fullLabel: "स्वशोधनालय Detox House",
    component: <DetoxHouse />,
    color: "#d4731c",
    bgColor: "rgba(212, 115, 28, 0.08)",
    darkColor: "#a1570d",
  },
  {
    label: "Nature",
    fullLabel: "नैसर्गचिकित्सा Nature Therapy",
    component: <NatureTherapy />,
    color: "#4a7c59",
    bgColor: "rgba(74, 124, 89, 0.08)",
    darkColor: "#2d5035",
  },
  {
    label: "Beauty",
    fullLabel: "स्वसौन्दर्यचिकित्सा Beauty Therapy",
    component: <BeautyTherapy />,
    color: "#7b4397",
    bgColor: "rgba(123, 67, 151, 0.08)",
    darkColor: "#532860",
  },
];

const ServicesTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChild, setSelectedChild] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedChild(0);
  };

  const current = tabsData[selectedTab];
  const hasChildren = current.children && current.children.length > 0;

  return (
    <div className="pt-16 md:pt-3">
      <h1 className="text-xl md:text-2xl font-semibold text-center text-green-800 mb-4">
        स्वउपचारसेवा Healing Services
      </h1>
      <div className="max-w-6xl mx-auto">
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "9px",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            p: { xs: 1 },
            mb: { xs: 1, md: 1 },
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: "auto",
              "& .MuiTabs-scrollableX": {
                overflowX: "auto",
                scrollBehavior: "smooth",
              },
              "& .MuiTab-root": {
                fontSize: { xs: "0.85rem" },
                fontWeight: 600,
                textTransform: "none",
                minHeight: { xs: 22, md: 20 },
                py: { xs: 1, md: 1 },
                px: { xs: 1.5, md: 2.5 },
                display: "flex",
                gap: { xs: 0.5, md: 1 },
                color: "rgba(0, 0, 0, 0.6)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: { xs: "7px" },
                position: "relative",
                overflow: "hidden",
                margin: { xs: "0 4px", md: "0 6px" },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "transparent",
                  transition: "background 0.3s ease",
                },

                "&:hover": {
                  backgroundColor: `${current.color}12`,
                  color: current.color,
                },

                "&.Mui-selected": {
                  color: "#fff",
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${current.color} 0%, ${current.darkColor} 100%)`,
                  boxShadow: `0 4px 20px ${current.color}30`,
                },
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabScrollButtonWrapper": {
                color: current.color,
                opacity: 0.7,
                "&:hover": {
                  opacity: 1,
                },
              },
            }}
            TabIndicatorProps={{
              sx: {
                display: "none",
              },
            }}
          >
            {tabsData.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Box>
                    <span>{tab.fullLabel}</span>
                  </Box>
                }
                aria-label={tab.fullLabel}
              />
            ))}
          </Tabs>
        </Box>

        {/* Child Tabs/Buttons */}
        {hasChildren && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={{ xs: 1, md: 1.5 }}
            mb={{ xs: 2.5, md: 1 }}
            justifyContent="center"
            useFlexGap
            sx={{
              animation: "fadeIn 0.4s ease-in",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(-10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {current.children.map((child, i) => (
              <Button
                key={i}
                variant={selectedChild === i ? "contained" : "outlined"}
                onClick={() => setSelectedChild(i)}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: selectedChild === i ? 700 : 600,
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  px: { xs: 1.75, md: 2.5 },

                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  backgroundColor:
                    selectedChild === i ? current.color : "transparent",
                  color: selectedChild === i ? "#fff" : current.color,
                  borderColor: current.color,
                  border: `2px solid ${current.color}`,
                  background:
                    selectedChild === i
                      ? `linear-gradient(135deg, ${current.color} 0%, ${current.darkColor} 100%)`
                      : "transparent",
                  boxShadow:
                    selectedChild === i
                      ? `0 4px 16px ${current.color}30`
                      : "none",
                  "&:hover": {
                    backgroundColor:
                      selectedChild === i
                        ? current.color
                        : `${current.color}15`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 24px ${current.color}25`,
                  },
                }}
              >
                {child.title}
              </Button>
            ))}
          </Stack>
        )}

        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: { xs: "20px", md: "18px" },
            overflow: "hidden",
            boxShadow: `0 16px 48px ${current.color}15`,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            minHeight: { xs: "auto", sm: "400px", md: "500px" },
            animation: "slideUp 0.5s ease-out",
            "@keyframes slideUp": {
              from: {
                opacity: 0,
                transform: "translateY(30px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${current.color}, ${current.darkColor})`,
            },
          }}
        >
          {/* Decorative Background Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `${current.color}08`,
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `${current.color}05`,
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <Box
            sx={{
              p: { xs: 0 },
              position: "relative",
              zIndex: 1,
              animation: "fadeInContent 0.6s ease-out 0.2s both",
              "@keyframes fadeInContent": {
                from: {
                  opacity: 0,
                },
                to: {
                  opacity: 1,
                },
              },
            }}
          >
            {hasChildren ? (
              current.children[selectedChild].component
            ) : current.component ? (
              current.component
            ) : (
              <Box sx={{ textAlign: "center", py: { xs: 0, md: 0 } }}>
                <Box
                  sx={{
                    width: { xs: 70, md: 90 },
                    height: { xs: 70, md: 90 },
                    borderRadius: "20px",
                    background: current.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    color: current.color,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  }}
                >
                  <Box sx={{ "& svg": { fontSize: "inherit" } }}>
                    {current.icon}
                  </Box>
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    color: current.color,
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                  }}
                >
                  {current.fullLabel}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    color: "#999",
                    mb: 2,
                  }}
                >
                  Coming Soon...
                </Typography>

                <Chip
                  label="Stay tuned for updates"
                  variant="outlined"
                  sx={{
                    borderColor: current.color,
                    color: current.color,
                    fontSize: "0.8rem",
                    height: "32px",
                  }}
                />
              </Box>
            )}
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default ServicesTabs;
