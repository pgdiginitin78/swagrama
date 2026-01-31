import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import HikingIcon from "@mui/icons-material/Hiking";
import LocalFloristTwoToneIcon from "@mui/icons-material/LocalFloristTwoTone";
import SpaTwoToneIcon from "@mui/icons-material/SpaTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaPeace } from "react-icons/fa";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";


gsap.registerPlugin(ScrollTrigger);

function SinglePersonMembership() {
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
    <section ref={sectionRef} className="space-y-1 pb-3 text-sm leading-6 mt-2 p-4">
      {[
        {
          type: "title",
          text: <> स्वकीयसदस्यत्व (Own Membership) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years | Designed for Independent Living Souls",
        },
        {
          type: "paragraph",
          text: "Feel Alone in the City? Longing for a Community That Feels Like Family? Swagrama Community introduces the स्वकीय सदस्यत्व, specially crafted for those who live alone due to career, life circumstances, or personal choice — yet deeply desire the connection, warmth, and support of a true community.",
        },
        {
          type: "heading",
          icon: <SpaTwoToneIcon className="text-ayuTulsi" />,
          text: "Who Is It For?",
        },
        {
          type: "paragraph",
          text: "Individuals staying away from their families due to jobs, studies, or lifestyle Those without close family support Anyone longing to be part of a traditional, meaningful community experience.",
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
              <LocalFloristTwoToneIcon sx={{ fill: "url(#giftGrad)" }} />
            </svg>
          ),
          text: "What You Get :",
        },

        {
          type: "list",
          items: [
            "20% Discount on all Swagrama products, goods, services & instruments.",
            "Access to the स्वमहार्थक Valuable Membership tier.",
            "स्वग्रामपत्र CommunityCard – physical ID for exclusive access.",
            "Entry to all online services and facilities.",
            "Premium Membership Privileges including early access and special offers.",
            "Eligible for the Barter System – Buy or sell your own farm produce.",
            "Use coupons and deals on community bookings and services.",
          ],
        },
        {
          type: "heading",
          icon: <HikingIcon className="text-amber-700" />,
          text: "Member-Only Facilities Include :",
        },
        {
          type: "paragraph",
          text: "Half-Day / Full-Day Visits to Swagrama Indoor & Outdoor Stays (short-term or extended) Green Kashay Herbal Tea, Wholesome Meals & Ayurvedic Diet Yoga, Cooking, Nature Walks, Agro-Tourism & Wllness Therapies Ceremony Spaces, Ayurveda OPD/IPD, Seed Saving, Plantation & Harvesting activities.",
        },
        {
          type: "heading",
          icon:<FaPeace className="text-emerald-500" />,
          text: "Whether you seek peace, purpose, or people — you’ll find all three here.",
        },
        {
          type: "list",
          items: [
            "Step Into a Life of Belonging.",
            "Join a community that supports your wellness, lifestyle, and purpose — even if you're walking your path alone.",
            "Become a स्वकीय सदस्य today and redefine what it means to live well and live connected.",
            "Need help? Contact Dr. Vaishali – 8805172097 | Dr. Dnyanada – 8007251284 ",
            "Apply Now for Own Membership.",
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

export default SinglePersonMembership;
