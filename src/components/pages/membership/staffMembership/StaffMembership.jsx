import CardMembershipTwoToneIcon from "@mui/icons-material/CardMembershipTwoTone";
import GppGoodTwoToneIcon from "@mui/icons-material/GppGoodTwoTone";
import SelfImprovementTwoToneIcon from "@mui/icons-material/SelfImprovementTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import MembershipFormModal from "../MembershipFormModal";
gsap.registerPlugin(ScrollTrigger);

function StaffMembership() {
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
    <section ref={sectionRef} className="space-y-4 text-sm leading-6 mt-2 p-4">
      {[
        {
          type: "title",
          text: (
            <>
              स्वकर्मकरगण सदस्यत्व (
              <span className="inline-flex items-center gap-1">
                Community Staff Membership
                <CardMembershipTwoToneIcon className="text-ayuTulsi animate-bounce" />
              </span>
              )
            </>
          ),
        },

        {
          type: "paragraph",
          text: "Valid for 5 Years | Exclusive Access for Swagrama Staff & Partners' Team",
        },

        {
          type: "paragraph",
          text: "Unlock a world of meaningful benefits tailored exclusively for the dedicated staff of Swagrama Community and our valued partners. This Premium Staff Membership is your gateway to a sustainable lifestyle, community-driven privileges, and holistic well-being.",
        },

        {
          type: "heading",
          icon: <GppGoodTwoToneIcon className="text-ayuTulsi" />,
          text: "Your Membership Includes :",
        },

        {
          type: "list",
          items: [
            "स्वमहार्थक Valuable Membership Experience deeper engagement with Swagrama's mission through exclusive access to events, services, and content.",
            "स्वग्रामपत्र Community Card Membership Receive a Physical Membership Card to enjoy seamless access and identification at all Swagrama properties and partner facilities.",
            "Premium Privileges & Services Unlock priority services, insider offers, and advanced booking for workshops, wellness sessions, and agro-tourism stays.",
            "Fully Barter-Enabled Participate in our trusted barter ecosystem — exchange your time, skills, or products for community services.",
            "Discounts & Coupons Redeem exclusive member-only coupons across Swagrama’s eco-store, Ayurvedic treatments, organic food, and more.",
          ],
        },

        {
          type: "heading",
          icon: <SelfImprovementTwoToneIcon className="text-ayuTulsi" />,
          text: "Who Is It For?",
        },

        {
          type: "list",
          items: [
            "Swagrama Directors / Partners Staff",
            "Their family members",
            "People seeking sustainable community living involvement",
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

          {block.type === "paragraph" && <p>{block.text}</p>}

          {block.type === "paragraphBold" && (
            <p className="font-medium text-ayuTulsi">{block.text}</p>
          )}

          {block.type === "list" && (
            <ul className="list-disc ml-1 space-y-1">
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
        <MembershipFormModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          text={"You will get 15% off on all bookings."}
        />
      )}
    </section>
  );
}

export default StaffMembership;
