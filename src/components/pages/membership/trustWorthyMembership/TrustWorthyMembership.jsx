import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { GiUbisoftSun } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function TrustWorthyMembership() {
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
      className="space-y-1 pb-3 text-sm leading-6 mt-2 px-4"
    >
      {[
        {
          type: "title",
          text: <>स्वआप्तसदस्यत्व (Trust Worthy Membership) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraphBold",
          text: "A special, long-term membership for those deeply connected to the Swagram Community – including revered Gurus, close family, trusted friends, lifelong supporters, and well-wishers.",
        },

        {
          type: "heading",
          icon: <GiUbisoftSun className="text-ayuBrown" />,
          text: " Who Is This For :",
        },

        {
          type: "list",
          items: [
            "Gurus and Spiritual Guides.",
            "Elders and Respected Individuals.",
            "Donors and Financial Supporters.",
            "Volunteers and Dedicated Helpers.",
            "Close Family, Friends, and Allies.",
            "Anyone who has contributed selflessly, stood by Swagram in its growth, or embodies its values.",
          ],
        },
        {
          type: "heading",
          icon: <VscWorkspaceTrusted className="text-ayuMid" />,
          text: "Why Trustworthy Membership :",
        },
        {
          type: "list",
          items: [
            "Have uplifted Swagram through personal effort, guidance, or support.",
            "Have dedicated a part of their life to sustaining community, health, nature, or heritage.",
            "Deserve lifelong access and priority to all Swagram services, events, and initiatives.",
          ],
        },
        {
          type: "heading",
          icon: <LoyaltyIcon className="text-ayuOrange" />,
          text: "Membership Benefits Include :",
        },
        {
          type: "list",
          items: [
            "Priority Access to all facilities, programs, and healthcare services.",
            "Free or Special Rates for select Ayurvedic and wellness offerings.",
            "Recognition as a Trustworthy Pillar of the Swagram ecosystem.",
            "Exclusive Invitations to sacred ceremonies and high-level retreats.",
            "5-Year Validity with dedicated assistance and concierge support.",
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
              You will get 25% off on all bookings. <br />
              *Upgrade your membership for extra discounts, click on सदस्यत्व
              Membership
            </>
          }
        />
      )}
    </section>
  );
}

export default TrustWorthyMembership;
