import {
  Festival,
  Groups,
  Handshake,
  TempleHindu
} from "@mui/icons-material";
import { Box, Button, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import CommunityActivity from "./communityActivity/CommunityActivity";
import CommunityCeremony from "./communityCeremony/CommunityCeremony";
import JoinActivities from "./joinActvities/JoinActivities";
import Vision from "./vision/Vision";

const communityTabs = [
  {
    label: "Vision • स्वदर्शन",
    icon: TempleHindu, 
    color: "#8b5cf6",
    component: <Vision />,
  },
  {
    label: "Community Activity • स्वसहभावकर्मण्य  ",
    icon: Groups,
    color: "#10b981",
    component: <CommunityActivity />,
  },
  {
    label: "Annual Events • स्वग्राम कार्यक्रम",
    icon: Festival,
    color: "#f97316",
    component: <CommunityCeremony />,
  },
  {
    label: "Joint Activities • स्वसंयुक्तकर्मण्य  ",
    icon: Handshake,
    color: "#dc2626",
    component: <JoinActivities />,
  },
];

const CommunityActivitiesTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChild, setSelectedChild] = useState(0);

  const handleChange = (_, val) => {
    setSelectedTab(val);
    setSelectedChild(0);
  };

  const current = communityTabs[selectedTab];
  const hasChildren = current.children?.length > 0;

  return (
    <Box className="pb-5 md:px-12">
      <Box >
        <h2
          style={{
            textAlign: "center",
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 2,
          }}
          className="text-ayuBrown pt-5"
        >
          Community Activities
        </h2>

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
            TabIndicatorProps={{ sx: { height: 3, bgcolor: current.color } }}
          >
            {communityTabs.map((tab, i) => (
              <Tab
                key={i}
                label={tab.label}
                icon={<tab.icon sx={{ fontSize: 18 }} />}
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
            justifyContent="center"
            my={2}
          >
            {current.children.map((child, i) => (
              <Button
                key={i}
                variant={selectedChild === i ? "contained" : "outlined"}
                onClick={() => setSelectedChild(i)}
                sx={{
                  textTransform: "none",
                  borderColor: current.color,
                  color: selectedChild === i ? "#fff" : current.color,
                  bgcolor: selectedChild === i ? current.color : "transparent",
                  "&:hover": {
                    bgcolor: selectedChild === i ? current.color : "#e8e8e8",
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
            mt: 2,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            background:
              "linear-gradient(135deg, #e8f9e3 0%, #d1f4bb 45%, #f4ffe9 100%)",
            border: "1px solid #b8e892",
          }}
        >
          {hasChildren ? (
            current.children[selectedChild].component
          ) : current.component ? (
            current.component
          ) : (
            <>
              <Typography fontWeight={700} color={current.color} variant="h6">
                {current.label}
              </Typography>
              <Typography opacity={0.7}>Coming Soon...</Typography>
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default CommunityActivitiesTabs;
