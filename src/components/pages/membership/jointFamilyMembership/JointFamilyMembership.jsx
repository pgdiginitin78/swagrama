import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import CottageIcon from "@mui/icons-material/Cottage";
import ParkIcon from '@mui/icons-material/Park';
import SpaTwoToneIcon from "@mui/icons-material/SpaTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaPeace } from "react-icons/fa";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from '../BarterMembershipForm';

gsap.registerPlugin(ScrollTrigger);

function JointFamilyMembership() {
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef(null);
  // GSAP
  useEffect(() => {
    gsap.from(".fade-item", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.15,
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="space-y-3 text-sm leading-6 mt-2 p-4"
    >
      {[
        {
          type: "title",
          text: <>स्वकुटुम्बिनीसदस्यत्व (Joint Family Membership) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years | Rekindling the Spirit of Living Together.",
        },
        {
          type: "heading",
          icon: <CottageIcon className="text-ayuMid" />,
          text: "Bring Back the Power of Togetherness",
        },
        {
          type: "paragraph",
          text: "In today’s fast-paced, fragmented world, the greatest casualty has been the traditional joint family system. Disconnected lives, isolated elders, overstressed nuclear homes, and soulless routines have made us forget the joy of living together. Swagrama rises as the answer — a village-inspired, health-conscious, family-first community that welcomes joint families seeking reconnection, health, and harmony.",
        },
        {
          type: "heading",
          icon: <SpaTwoToneIcon className="text-ayuTulsi" />,
          text: "Who Is It For?",
        },
        {
          type: "list",
          items: [
            "Families tired of nuclear isolation.",
            "Those yearning for support in times of illness or emotional lows.",
            "Families missing their ancestral village life.",
            "Parents who want children to grow with culture and care.",
            "Anyone who values collective well-being over individualistic chaos.",
          ],
        },
        {
          type: "heading",
          icon: (
            <svg width="30" height="30">
              <defs>
                <linearGradient id="giftGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#16A34A" />
                  <stop offset="50%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
              <AutoAwesomeIcon sx={{ fill: "url(#giftGrad)" }} />
            </svg>
          ),
          text: "Membership Benefits :",
        },

        {
          type: "list",
          items: [
            "Minimum 2 Members Required.",
            "20% Discount on all goods, products, instruments, and services.",
            "Access to स्वमहार्थक Valuable Membership.",
            "स्वग्रामपत्र CommunityCard – Physical identity card for all Swagrama services.",
            "Full access to digital services and tools.",
            "Premium Membership Privileges – Wellness, priority bookings, and more.",
            "Eligible for Barter System – Buy/sell your own farm produce.",
            "Use Coupons for exclusive discounts on bookings and products."
          ],
        },
        {
          type: "heading",
          icon: <ParkIcon className="text-ayuMid" />,
          text: "Experience Real Family Living  :",
        },
        {
          type: "paragraph",
          text: "From meals made together to healing through Ayurveda, yoga, and community farming—Swagrama offers the ecosystem to live not just as a family but as a way of life.",
        },
        {
          type: "heading",
          icon: <FaPeace className="text-emerald-500" />,
          text: "Facilities include :",
        },
        {
          type: "list",
          items: [
            "Family stays (Indoor & Outdoor), Half/Full Day Visits.",
            "Community Cooking, Meals, and Wholesome Living.",
            "Natural Healing Therapies, Diet, OPD/IPD Ayurvedic Care.",
            "Plantation, Harvesting, Ceremony Space & Rural Living Activities. ",
          ],
        },
      ].map((block, index) => (
        <div key={index} className="fade-item">
          {block.type === "title" && (
            <h2 className="text-xl font-semibold text-ayuTulsi flex items-center gap-2">
              {block.text}
            </h2>
          )}

          {block.type === "heading" && (
            <h3 className="text-lg font-semibold text-ayuTulsi flex items-center gap-2">
              <span className="">{block.icon && block.icon}</span> {block.text}
            </h3>
          )}

          {block.type === "paragraph" && (
            <p className="text-gray-500">{block.text}</p>
          )}

          {block.type === "paragraphBold" && (
            <p className="font-medium text-ayuTulsi">{block.text}</p>
          )}

          {block.type === "list" && (
            <ul className="ml-1  text-gray-500">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div className="flex justify-end my-2">
        <CommonButton
          type="button"
          label="Add Member"
          className="border border-ayuDark text-ayuDark hover:bg-ayuDark hover:text-white"
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <BarterMembershipForm
          open={openModal}
          handleClose={() => setOpenModal(false)}
          text={
            "*Upgrade your membership for extra discounts, click on सदस्यत्व Membership "
          }
        />
      )}
    </section>
  );
}

export default JointFamilyMembership;
