import {
  EmojiNature,
  LocalFlorist,
  SelfImprovement,
  Spa,
} from "@mui/icons-material";
import HealingIcon from "@mui/icons-material/Healing";
import { Box, Button, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import BeautyTherapy from "./beautyTherapy/BeautyTherapy";
import DetoxHouse from "./detoxHouse/DetoxHouse";
import IPDHospital from "./ipdHospital/IPDHospital";
import NatureTherapy from "./natureTherapy/NatureTherapy";
import OPDClinic from "./opdClinic/OPDClinic";

const tabsData = [
  {
    label: "स्वचिचित्सालय OPD Clinic",
    component: <OPDClinic />,
    icon: <EmojiNature sx={{ fontSize: 18 }} />,
    color: "#4a90a4",
  },
  {
    label: "स्वास्थ्य निवास Wellness Stay ",
    icon: <Spa sx={{ fontSize: 18 }} />,
    component: <IPDHospital />,
    color: "#5a437a",
  },
  {
    label: "स्वशोधनालय Detox House",
    component: <DetoxHouse />,
    icon: <Spa sx={{ fontSize: 18 }} />,
    color: "#d4731c",
  },
  {
    label: "नैसर्गचिकित्सा Nature Therapy",
    component: <NatureTherapy />,
    icon: <LocalFlorist sx={{ fontSize: 18 }} />,
    color: "#4a7c59",
  },
  {
    label: "स्वसौन्दर्यचिकित्सा Beauty Therapy ",
    component: <BeautyTherapy />,
    icon: <SelfImprovement sx={{ fontSize: 18 }} />,
    color: "#7b4397",
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
    <div className="md:px-12 py-3">
      <Box sx={{ maxWidth: 1480, mx: "auto" }}>
        <h1 className="text-ayuBrown font-semibold text-center text-2xl">
          <HealingIcon /> स्वउपचारसेवा Healing Services <HealingIcon />
        </h1>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
                minHeight: 48,
                fontSize: "0.875rem",
                px: 1.5,
                py: 1,
              },
              "& .Mui-selected": { color: current.color },
            }}
            TabIndicatorProps={{
              sx: { height: 3, bgcolor: current.color },
            }}
          >
            {tabsData.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>
        {hasChildren && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            mb={2}
            justifyContent="center"
          >
            {current.children.map((child, i) => (
              <Button
                key={i}
                variant={selectedChild === i ? "contained" : "outlined"}
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  borderColor: current.color,
                  color: selectedChild === i ? "#fff" : current.color,
                  bgcolor: selectedChild === i ? current.color : "transparent",
                  fontSize: "0.8rem",
                  px: 1.5,
                  py: 0.5,
                  "&:hover": {
                    bgcolor: selectedChild === i ? current.color : "#f0ead1",
                  },
                }}
                onClick={() => setSelectedChild(i)}
              >
                {child.title}
              </Button>
            ))}
          </Stack>
        )}

        <Card
          elevation={0}
          sx={{
            paddingBottom: 2,
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: "#F1FFF5",
          }}
        >
          {hasChildren ? (
            current.children[selectedChild].component
          ) : current.component ? (
            current.component
          ) : (
            <>
              <Typography
                variant="h5"
                sx={{ color: current.color, fontWeight: 700, mb: 1 }}
              >
                {current.label}
              </Typography>
              <Typography sx={{ fontSize: "1rem", opacity: 0.7 }}>
                Coming Soon...
              </Typography>
            </>
          )}
        </Card>
      </Box>
    </div>
  );
};

export default ServicesTabs;
