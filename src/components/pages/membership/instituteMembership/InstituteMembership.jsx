import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ForestIcon from "@mui/icons-material/Forest";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import SchoolIcon from "@mui/icons-material/School";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { GiRegeneration, GiThreeFriends } from "react-icons/gi";
import { ImHome3 } from "react-icons/im";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function InstituteMembership() {
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef(null);

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
      className="space-y-1 pb-3 text-sm leading-6 mt-2 px-4"
    >
      {[
        {
          type: "title",
          text: <>स्वसंस्था (Institute Form) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraphBold",
          text: "This special membership is available for groups and institutions such as friends, relatives, companies, organizations, schools, colleges, trusts, co-operative societies, banks, etc. It’s designed especially for those whose connection with nature has diminished—whether they work all day in air-conditioned offices or in factories—and are heading toward lifestyle-induced ailments.",
        },
        {
          type: "heading",
          text: " Group Membership Highlights :",
          icon: <GiThreeFriends className="text-ayuMysticBlue" />,
        },
        {
          type: "list",
          items: [
            "Minimum 2 members required.",
            "Ideal for institutions, friend circles, and families with shared values.",
            "A step towards wellness and organizational upliftment.",
          ],
        },
        {
          type: "heading",
          icon: <LoyaltyIcon className="text-ayuDark" />,
          text: "Benefits :",
        },
        {
          type: "list",
          items: [
            "20% Discount on all goods, products, equipment, and services.",
            "Sw-Maharthak Valuable Membership – Recognizes your group’s contribution.",
            "Eligible for SwagramPatra Physical Community Card.",
            "Access to all primary online services & community facilities.",
            "Premium & Privileged Services included.",
            "Barter System Access – Buy/sell farm produce, goods, and services.",
            "Booking Privileges – Use coupons and receive discounts on services.",
          ],
        },
        {
          type: "heading",
          text: " Choose Group Type :",
          icon: <Diversity2Icon className="text-rose-500" />,
        },
        {
          type: "list",
          items: [
            "Sw-Sambandhu (Relatives).",
            "Sw-Maitra (Friends).",
            "Sw-Sanstha (Institutes).",
            "Sw-Sahacharya (Companies).",
            "Make your “Joint Family of Nature Lovers” through this membership.",
          ],
        },
        {
          type: "heading",
          text: "A Vision Rooted in Nature and Ayurveda :",
          icon: <ForestIcon className="text-ayuMid" />,
        },
        {
          type: "paragraph",
          text: "Each member carries an inner desire to reconnect with nature—to live in joint families, drink well water, eat wild forest produce, and experience a lifestyle in harmony with nature. This dream includes Ayurvedic homes, healing centers, herbal forests, cow shelters, and traditional Ayurvedic healthcare practices that have been sustained over thousands of years by hundreds of generations aiming for 100 years of healthy living. Despite owning large farmlands today, many farmers lack a consistent, chemical-free supply of pure grains, oils, jaggery, ghee, herbs, and Panchgavya throughout the year due to mono-cropping practices. If even they cannot access it, how can others?.",
        },
        {
          type: "heading",
          text: "Most people have lost their native villages—whether it was their maternal home or ancestral land. Swagram aims to recreate this lost connection through :",
          icon: <ImHome3 className="text-ayuBrown" />,
        },
        {
          type: "list",
          items: [
            "A barter-based community.",
            "Ayurvedic health consultations & pulse diagnosis.",
            "A residential Gurukul to awaken hidden skills and knowledge.",
          ],
        },
        {
          type: "heading",
          text: "Sw-Gurukul Courses :",
          icon: <SchoolIcon className="text-ayuOrange animate-bounce" />,
        },
        {
          type: "list",
          items: [
            "10 holistic life domains.",
            "20 practical courses.",
            "4-month immersive programs within Swagram.",
            "Learn from global expert mentors.",
            "Prepare to become a Guru yourself.",
            "A lifestyle education alongside formal education.",
            "Inspire your children with your ideal example.",
          ],
        },
        {
          type: "heading",
          text: "Educate the next generation to value :",
          icon: <GiRegeneration className="text-ayuBrown animate-spin" />,
        },
        {
          type: "list",
          items: [
            "Farming, Ayurveda, Cow care, Traditional trades, and Nature-love.",
            "Whether individually or with your family or organization—this membership is your gateway to a pure, sustainable, and natural lifestyle..",
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
            <>
              * You will get 20% off on all bookings. <br />* Upgrade your
              membership for extra discounts, click on सदस्यत्व Membership
            </>
          }
        />
      )}
    </section>
  );
}

export default InstituteMembership;
