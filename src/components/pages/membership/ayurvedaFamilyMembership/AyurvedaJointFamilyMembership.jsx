import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { TbBuildingMosque } from "react-icons/tb";
import CommonButton from "../../../common/button/CommonButton";

import { FaDiamond } from "react-icons/fa6";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function AyurvedaJointFamilyMembership() {
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
      className="space-y-1 pb-3 text-sm leading-6 mt-2 p-4"
    >
      {[
        {
          type: "title",
          text: <> स्वआदिवैद्यसदस्यत्व (Root Healer Membership)</>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraph",
          text: "For Ayurvedic practitioners, this membership is more than a privilege—it’s a gateway to living the Ayurvedic life you truly believe in. Practicing Ayurveda successfully in your clinic doesn’t always mean living the Ayurvedic lifestyle. In fact, growing professional commitments often push practitioners further away from the natural way of living.The Root Healer Membership is your path back to nature.",
        },
        {
          type: "paragraph",
          text: "This exclusive plan is designed to help Ayurvedic doctors and their families rediscover the holistic life they envision—a village rooted in Ayurveda, a natural home, a community clinic, herbal forests, cowsheds, medicine preparation centers, and a vibrant ecosystem where the essence of Ayurveda thrives.",
        },
        {
          type: "heading",
          icon: <FaDiamond className="text-ayuTulsi" />,
          text: "Key Membership Benefits :",
        },
        {
          type: "list",
          items: [
            "Exclusive to Certified Ayurvedic Vaidyas and Their Families.",
            "Minimum of 2 Family Members Required.",
            "25% Discount on all goods, Ayurvedic products, instruments, and services.",
            "Swamarthak Valuable Membership Certificate.",
            "Eligible for Swagrampatra Community Physical Card.",
            "Access to All Primary Online Services & Facilities.",
            "Premium & Privileged Service Access.",
            "Barter System Participation – Trade and monetize your farm produce.",
            " Coupon-Enabled Discounts on Booking Facilities.",
            "Permission to Admit Your Own Patients in the Community Facility.",
            "Complete Ayurvedic Medicine & Support Backup.",
            "Clinic, Software, Farm, Village, and Hospital Setup Assistance.",
          ],
        },
        {
          type: "heading",
          icon: <TbBuildingMosque className="text-ayuMid" />,
          text: "Reconnect With Nature and Legacy",
        },
        {
          type: "paragraph",
          text: "Every individual carries an innate love for nature—memories of pure childhoods, clean air, natural foods, seasonal routines. This membership brings that life back to reality.",
        },
        {
          type: "heading",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24"
              height="24"
            >
              <defs>
                <linearGradient id="waterfallGrad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" /> 
                  <stop offset="50%" stopColor="#06b6d4" /> 
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>

              <path
                fill="url(#waterfallGrad)"
                d="M256 16C150 16 64 102 64 208c0 80 48 148 118 181-16 28-26 58-26 91h64c0-44 21-87 45-120 24 33 45 76 45 120h64c0-33-10-63-26-91 70-33 118-101 118-181C448 102 362 16 256 16zm0 48c78 0 144 66 144 144s-66 144-144 144S112 286 112 208 178 64 256 64z"
              />
            </svg>
          ),
          text: "Here, you and your family will :",
        },
        {
          type: "list",
          items: [
            "Live in close contact with nature in a joint family setup.",
            "Drink water from wells, enjoy wild fruits, and experience Ayurvedic simplicity.",
            "Access a village that embodies your Ayurvedic dream—complete with a community clinic, herbal garden, Panchagavya centers, and more.",
            "Modern farming may no longer provide all the year-round pure food, oils, herbs, ghee, jaggery, and grains. But in Swagram, that holistic ecosystem is preserved and accessible.",
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

export default AyurvedaJointFamilyMembership;
