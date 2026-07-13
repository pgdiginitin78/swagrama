import {
  Diamond as DiamondIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon
} from "@mui/icons-material";
import ConsultationIcon from "../../../../assets/ConsultationBooking.svg";
import MembershipIcon from "../../../../assets/MembrshipIcon.svg";
import OrdersIcon from "../../../../assets/Orders.svg";
import TherapyIcon from "../../../../assets/Therapy.svg";
import WellnessIcon from "../../../../assets/WellnessIcon.svg";



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
    icon: <img src={WellnessIcon} alt="Membership" className="w-6 h-6" />,
  },
  {
    id: "appointments",
    label: "Consultations",
    icon: <img src={ConsultationIcon} alt="Membership" className="w-6 h-6" />,
  },
  {
    id: "therapies",
    label: "Therapies",
    icon: <img src={TherapyIcon} alt="Membership" className="w-6 h-6" />,
  },
  {
    id: "shop",
    label: "Orders",
    icon: <img src={OrdersIcon} alt="Membership" className="w-6 h-6" />,
  },
  {
    id: "membership",
    label: "Membership",
    icon: <img src={MembershipIcon} alt="Membership" className="w-6 h-6" />,
  },
];
