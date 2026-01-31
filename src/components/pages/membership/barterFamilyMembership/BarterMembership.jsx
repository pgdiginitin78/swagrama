import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import CardGiftcardTwoToneIcon from "@mui/icons-material/CardGiftcardTwoTone";
import SpaTwoToneIcon from "@mui/icons-material/SpaTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";
gsap.registerPlugin(ScrollTrigger);

function BarterMembership() {
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
          text: <>स्वसुविनिमयसदस्यत्व (Barter Membership)</>,
        },

        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years | Powered by Swagrama Community.",
        },

        {
          type: "paragraph",
          text: "Join the movement towards a self-reliant, poison-free, and value-driven exchange ecosystem! The Barter Membership is specially designed for all those who provide or deal in agricultural produce, Ayurvedic products, natural goods, tools, and related services — including farmers, traders, artisans, and raw material suppliers.",
        },

        {
          type: "heading",
          icon: <SpaTwoToneIcon className="text-ayuTulsi" />,
          text: "Who Is It For?",
        },

        {
          type: "paragraph",
          text: "Natural & Organic Producers Ayurvedic & Panchagavya Practitioners Sellers & Distributors of eco-products Buyers looking for trustworthy, chemical-free goods Traditional community contributors (बाराबलुतेदार).Swagrama Community offers a dignified, clean, and ethical alternative through this barter-based system — where you can supply your goods to us and procure pure products in return, without dependency on chemical-based supply chains.",
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
              <CardGiftcardTwoToneIcon sx={{ fill: "url(#giftGrad)" }} />
            </svg>
          ),
          text: "Membership Benefits :",
        },

        {
          type: "list",
          items: [
            "25% Discount on All Swagrama Goods, Instruments & Services",
            "स्वमहार्थक Valuable Membership",
            "स्वग्रामपत्र CommunityCard (Physical Identity Card)",
            "Access to All Primary Online Services",
            "Premium Privilege Services",
            "Right to Buy / Supply / Sell / Exchange Products under the Barter Model",
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
            <ul className="list-disc ml-1 space-y-1 text-gray-500">
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

export default BarterMembership;
