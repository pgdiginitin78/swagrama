import {
  People
} from "@mui/icons-material";
import { Box, Button, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import CommunityMembership from "./communityMembership/CommunityMembership";

const membershipTabs = [
  {
    label: "Community Membership\nस्वग्रामसदस्यत्व",
    icon: People,
    color: "#8b5cf6",
    component: <CommunityMembership />,
  },

  // {
  //   label: "Single Person Membership\nस्वएकसदस्यत्व",
  //   icon: Person,
  //   color: "#f43f5e",
  //   component: <SinglePersonMembership />,
  // },
  // {
  //   label: "Joint Family Membership\nस्वकुटुंबिनीसदस्यत्व",
  //   icon: People,
  //   color: "#f59e0b",
  //   component: <JointFamilyMembership />,
  // },
  // {
  //   label: "Ayurveda Vaidya Family Membership\n स्ववैद्यकुटुम्बसदस्यत्व",
  //   icon: Favorite,
  //   color: "#84cc16",
  //   component: <AyurvedaJointFamilyMembership />,
  // },
  // {
  //   label: "Physician’s Membership\nस्वभिषक्सदस्यत्व",
  //   icon: MedicalServices,
  //   color: "#06b6d4",
  //   component: <PhysicianMembership />,
  // },
  // {
  //   label: "Commune Membership\nस्वगुकुलसदस्यत्व",
  //   icon: Business,
  //   color: "#d946ef",
  //   component: <CommuneMembership />,
  // },
  // {
  //   label: "Trust Worthy Membership\nस्वआपत्सदस्यत्व",
  //   icon: Security,
  //   color: "#6366f1",
  //   component: <TrustWorthyMembership />,
  // },
  // {
  //   label: "Director Family Membership",
  //   icon: ManageAccounts,
  //   color: "#ef4444",
  //   component: <DirectorFamilyMembership />,
  // },
  // {
  //   label: "Relatives Membership",
  //   icon: PersonAdd,
  //   color: "#eab308",
  //   component: <RelativesMembership />,
  // },
  // {
  //   label: "Friends Membership\nस्वमित्र",
  //   icon: Favorite,
  //   color: "#ec4899",
  //   component: <FriendsMembership />,
  // },
  // {
  //   label: "Institute Membership",
  //   icon: Business,
  //   color: "#14b8a6",
  //   component: <InstituteMembership />,
  // },
  // {
  //   label: "Company Membership",
  //   icon: Work,
  //   color: "#64748b",
  //   component: <CompanyMembership />,
  // },
  // {
  //   label: "Open Membership",
  //   icon: Public,
  //   color: "#0ea5e9",
  //   component: <OpenMembership />,
  // },
  // {
  //   label: "Self Membership\nस्वआत्मसदस्यत्व",
  //   icon: HowToReg,
  //   color: "#f97316",
  //   component: <SelfBasicMembership />,
  // },
];

const MembershipTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChild, setSelectedChild] = useState(0);

  const handleChange = (_, val) => {
    setSelectedTab(val);
    setSelectedChild(0);
  };

  const current = membershipTabs[selectedTab];
  const hasChildren = current.children?.length > 0;

  return (
    <div className="md:px-12 py-3">
      <Box sx={{ minHeight: "50vh", p: 2 }}>
        <Box sx={{ maxWidth: 1480, mx: "auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: 26,
              fontWeight: "bold",
              marginBottom: 2,
            }}
            className="text-ayuBrown"
          >
            Membership Plans
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
              {membershipTabs.map((tab, i) => (
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
                    bgcolor:
                      selectedChild === i ? current.color : "transparent",
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
    </div>
  );
};

export default MembershipTabs;
