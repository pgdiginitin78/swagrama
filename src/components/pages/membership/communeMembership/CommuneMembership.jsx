import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { MdCardMembership } from "react-icons/md";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";


gsap.registerPlugin(ScrollTrigger);

function CommuneMembership() {
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
          text: <>स्वगुरुकुलसदस्यत्व (Commune Membership)</>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraph",
          text: "Secure Your Place in the Swagram Commune – A Life-Changing Membership for Natural & Holistic Living Specially designed for those who are part of or have completed the Swagurukul program, this membership offers lifelong access to a nature-based, Ayurvedic, and community-driven lifestyle.",
        },

        {
          type: "heading",
          icon: <MdCardMembership className="text-ayuTulsi" />,
          text: "Membership Highlights :",
        },
        {
          type: "paragraph",
          text: "Essential for continued support and access to all Swagram Community services after completing your Gurukul course.",
        },
        {
          type: "heading",
          icon: <MdCardMembership className="text-ayuTulsi" />,
          text: "Sustain Your Wellness Journey :",
        },
        {
          type: "paragraph",
          text: "Maintain the health and balance gained during the Gurukul, and participate in enriching, ongoing learning and wellness programs.",
        },
        {
          type: "heading",
          icon: <MdCardMembership className="text-ayuTulsi" />,
          text: "Enjoy 25% Discount :",
        },
        {
          type: "paragraph",
          text: "On all food grains, Panchagavya (cow-based products), herbal products, clothing, tools, and community services.",
        },
        {
          type: "heading",
          icon: <MdCardMembership className="text-ayuTulsi" />,
          text: "Barter System Support :",
        },
        {
          type: "paragraph",
          text: "Eligible to trade your own natural and Ayurvedic produce using our Barter Software and logistic support.",
        },
        {
          type: "heading",
          text: "Access to Premium Services :",
        },
        {
          type: "list",
          items: [
            "Physical Swagram Community Card.",
            "Access to all primary online services.",
            "Exclusive booking privileges with discounts and co.",
          ],
        },
        {
          type: "heading",
          text: "🌾 Participate and Experience:",
        },
        {
          type: "paragraph",
          text: "Half-day / Full-day visits, Indoor & Outdoor stays, Green Kashay Tea, Wholesome Bites, Ayurvedic meals, Community Ayurveda, Nutrition & Cooking classes, Yoga, Nature Walks, Agro-tourism, Ceremonies, OPD/IPD Services, Seed Exchange, Swimming, Soil Therapy.",
        },
        {
          type: "heading",
          text: "Live the Dream of Ayurvedic Village Life :",
        },
        {
          type: "paragraph",
          text: "Immerse in village settings with Ayurvedic hospitals, herbal forests, cow shelters, traditional processing units, and farm-fresh food.",
        },
        {
          type: "📚 Advance Your Swagurukul Learning :",
          text: "Residential 4-month programs designed to transform your lifestyle holistically.",
        },
        {
          type: "heading",
          text: "Stay with Global Experts :",
        },
        {
          type: "paragraph",
          text: "Become eligible to guide others by learning under expert Gurus from around the world.",
        },
        {
          type: "heading",
          text: "Inspire the Next Generation :",
        },
        {
          type: "paragraph",
          text: "Set an example for your children to live stress-free, nature-loving, and long-lasting lives.",
        },

        {
          type: "heading",
          text: "🌟 Why This Membership?",
        },
        {
          type: "list",
          items: [
            "You and your family want to embrace a holistic, natural lifestyle in tune with nature.",
            "You aim to live and promote Ayurveda, sustainable living, and collective family values.",
            "You want to experience and build your dream Ayurvedic village environment.",
          ],
        },
        {
          type: "paragraph",
          text: "Join the Swagram Commune Membership Today – Redefine Your Life with Purpose and Nature! Take responsibility for your health, your family’s well-being, and the environment – be a part of the Swagram movement.",
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

export default CommuneMembership;
