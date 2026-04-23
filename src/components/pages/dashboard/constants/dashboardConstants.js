import {
  CalendarMonth as CalendarIcon,
  Dashboard as DashboardIcon,
  Diamond as DiamondIcon,
  Receipt as ReceiptIcon,
  Spa as SpaIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import MembershipOutlineIcon from "../../../../assets/membershipOutlineIcon.svg";

export const MOCK_DATA = {
  appointments: [
    {
      id: "OPD-9921",
      name: "Dr. Arvind Sharma",
      expert: "Ayurveda Consultation",
      date: "Apr 21, 2026",
      time: "10:30 AM",
      status: "Upcoming",
      type: "appointment",
      prep: "Fast for 2 hours before your pulse diagnosis.",
    },
    {
      id: "OPD-8802",
      name: "Dr. Sunitha Reddy",
      expert: "Yoga Therapist",
      date: "May 02, 2026",
      time: "09:00 AM",
      status: "Completed",
      type: "appointment",
    },
  ],
  orders: [
    {
      id: "#ORD-7790",
      name: "Wellness Pack",
      expert: "Copper Bottle, Yoga Mat",
      date: "Apr 18, 2026",
      total: "₹3,200",
      status: "In Transit",
      step: 2,
      tracking: "SW-TRK-7711",
      type: "order",
    },
    {
      id: "#ORD-7721",
      name: "Healing Kit",
      expert: "Ashwagandha, Tulsi Tea",
      date: "Apr 15, 2026",
      total: "₹1,450",
      status: "Delivered",
      step: 3,
      tracking: "SW-TRK-7705",
      type: "order",
    },
  ],
  therapies: [
    {
      id: "TH-201",
      name: "Panchakarma Detox",
      expert: "Phase 1: Deep Cleansing",
      date: "Apr 25, 2026",
      time: "08:00 AM",
      status: "Upcoming",
      center: "Wellness Wing Room 204",
      type: "therapy",
      prep: "Drink 500ml warm water upon waking.",
    },
    {
      id: "TH-092",
      name: "Aroma Therapy",
      expert: "Relaxation Cycle",
      date: "Apr 20, 2026",
      time: "05:00 PM",
      status: "Upcoming",
      center: "Main Sanctuary",
      type: "therapy",
    },
  ],
  membership: {
    rank: "Silver Plus",
    since: "Jan 2026",
    valid: "Lifetime",
    perks: [
      "15% Store Discount",
      "Unlimited Yoga Access",
      "Priority OPD Support",
      "Full Health Record Access",
    ],
  },
};

export const MEMBERSHIP_TIERS = [
  {
    id: "silver",
    name: "Silver Plus",
    current: true,
    icon: <StarIcon />,
    price: "Active",
    color: "from-slate-400 to-slate-500",
    accent: "#94a3b8",
    perks: [
      "15% Store Discount",
      "Unlimited Yoga Access",
      "Priority OPD Support",
      "Full Health Record Access",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    current: false,
    icon: <TrophyIcon />,
    price: "₹2,999/yr",
    color: "from-amber-400 to-orange-500",
    accent: "#f59e0b",
    perks: [
      "25% Store Discount",
      "Unlimited Yoga & Meditation",
      "Priority OPD + Home Visits",
      "Full Health Records + Analytics",
      "Quarterly Detox Package",
      "Dedicated Wellness Coach",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    current: false,
    icon: <DiamondIcon />,
    price: "₹5,999/yr",
    color: "from-lime-500 to-green-700",
    accent: "#7c3aed",
    perks: [
      "40% Store Discount",
      "All Gold Benefits",
      "Unlimited Therapy Sessions",
      "Annual Panchakarma Retreat",
      "24/7 Doctor on Call",
      "Family Health Coverage",
      "VIP Lounge Access",
    ],
  },
];

export const MENU_ITEMS = [
  {
    id: "overview",
    label: "Wellness Hub",
    icon: <DashboardIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "appointments",
    label: "Consultations",
    icon: <CalendarIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "therapies",
    label: "Therapies",
    icon: <SpaIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "shop",
    label: "Orders",
    icon: <img src={MembershipOutlineIcon} alt="Membership" className="w-6 h-6" />,
  },
  {
    id: "membership",
    label: "Membership",
    icon: <img src={MembershipOutlineIcon} alt="Membership" className="w-6 h-6" />,
  },
];
