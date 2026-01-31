import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  FaLeaf, FaRegHospital, FaUserMd,
  FaUsers
} from "react-icons/fa";
import { GiFarmTractor, GiMeditation, GiReceiveMoney } from "react-icons/gi";
import { MdFamilyRestroom, MdSchool } from "react-icons/md";

import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function PhysicianMembership() {
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef(null);

  // Scroll Animation
  useEffect(() => {
    gsap.from(".fade", {
      opacity: 0,
      y: 30,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
    });
  }, []);

  // Feature 
  const features = [
    { icon: <FaUserMd />, label: "Valid for 5 Years" },
    { icon: <MdFamilyRestroom />, label: "Family Integration" },
    { icon: <GiReceiveMoney />, label: "25% Product Discounts" },
    { icon: <GiFarmTractor />, label: "Barter System" },
    { icon: <FaUsers />, label: "Community Engagement" },
    { icon: <FaLeaf />, label: "Holistic Activities" },
    { icon: <FaRegHospital />, label: "Healthcare Autonomy" },
    { icon: <MdSchool />, label: "Educational Opportunities" },
    { icon: <GiMeditation />, label: "Wellness & Nature Visits" },
  ];

  // ------------------------------ UI START ------------------------------
  return (
    <section ref={sectionRef} className="p-4 py-6 space-y-8">

      {/* TITLE */}
      <div className="fade text-center">
        <h2 className="text-xl font-bold text-ayuTulsi">
          स्वभिषज्सदस्यत्व (Physician’s Membership)
        </h2>

        <div className="flex items-center justify-center gap-2 mt-1 text-ayuSaffron font-semibold text-sm">
          <BookmarkAddedTwoToneIcon /> Valid for 5 Years
        </div>
      </div>

      {/* SUMMARY DESC  */}
      <div className="fade max-w-3xl mx-auto text-gray-600 text-[14px] text-center leading-relaxed">
        Embrace a Holistic Lifestyle with the Swabhishaj Membership. 
        In today's fast-paced medical environment, physicians often find 
        themselves distanced from the very essence of health and wellness 
        they advocate. The Swabhishaj Membership offers a sanctuary—a return 
        to nature, community, and the foundational principles of holistic living.
      </div>

      {/* HIGHLIGHT */}
      <div className="fade grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 p-3 rounded-md bg-ayuLightBlue shadow-sm hover:shadow-md transition">
            <span className="text-white text-lg">{f.icon}</span>
            <p className="text-white text-[13.5px] font-medium">{f.label}</p>
          </div>
        ))}
      </div>

      {[
        {
          heading: "Membership Highlights :",
          text: "Inclusive for All Medical Practitioners: Whether you're trained in Ayurveda, Allopathy, Homeopathy, or any other medical system, this membership welcomes you and your family to a community dedicated to natural living.",
        },
        {
          heading: "Family Integration :",
          text: "Add more than two family members to your membership, ensuring that your loved ones also benefit from a lifestyle rooted in wellness and nature.",
        },
        {
          heading: "Exclusive Discounts :",
          text: "Enjoy a 25% discount on all goods, products, instruments, and services, promoting a sustainable and health-focused lifestyle.",
        },
        {
          heading: "Community Engagement :",
          text: "Gain access to the Swagram Community Card, enabling you to participate in various community services and facilities.",
        },
        {
          heading: "Barter System Participation :",
          text: "Engage in a traditional barter system, allowing you to buy and sell farm produce, fostering a sense of community and mutual support.",
        },
        {
          heading: "Healthcare Autonomy :",
          text: "Admit your patients into facilities that align with your healing philosophy, ensuring they receive care consistent with your values.",
        },
        {
          heading: "Comprehensive Support :",
          text: "Benefit from a full spectrum of medical and logistical support, including software, clinic, farm, village, and hospital setup assistance.",
        },
        {
          heading: "Experience the Swagram Community :",
          text: "Participate in half-day or full-day visits, with options for indoor or outdoor stays, allowing you to reconnect with nature and community living.",
        },
        {
          heading: "Holistic Activities :",
          text: "Engage in a variety of activities throughout the year, such as Green Kashay Tea sessions, wholesome meals, community Ayurveda practices, diet and cooking workshops, yoga, nature walks, agro-tourism, wellness ceremonies, OPD/IPD services, plantation, harvesting, seed collection, swimming, and soil therapy.",
        },
        {
          heading: "Educational Opportunities :",
          text: "Enroll in courses designed to deepen your understanding of holistic living, covering ten key areas over four-month periods. These programs aim to cultivate future educators and leaders in natural health practices.Ayurveda.",
        },
        {
          heading: "Youth Engagement :",
          text: "Provide your children with early exposure to Ayurvedic principles, preparing them to become the next generation of holistic health practitioners.",
        },
        {
          heading: "Revitalize Your Practice and Lifestyle :",
          text: "The Swabhishaj Membership is more than a professional affiliation; it's a commitment to a lifestyle that harmonizes your medical practice with the rhythms of nature and community. Rediscover the joy of healing in an environment that supports both personal well-being and professional growth.",
        },
        {
          heading: "Join Us Today :",
          text: "Take the first step towards a more balanced and fulfilling life. Embrace the Swabhishaj Membership and become part of a community dedicated to holistic health and sustainable living.",
        },
      ].map((item, i) => (
        <div key={i} className="fade max-w-3xl mx-auto space-y-1">
          <h3 className="text-base font-semibold text-ayuTulsi flex items-center gap-2">
            <span className="text-ayuTulsi">•</span> {item.heading}
          </h3>
          <p className="text-[14px] text-gray-600 leading-relaxed">{item.text}</p>
        </div>
      ))}

      <div className="fade flex justify-end mt-4">
        <CommonButton
          label="Add Member"
          className="border border-ayuDark text-ayuDark hover:bg-ayuDark hover:text-white text-sm px-5 py-1.5"
          onClick={() => setOpenModal(true)}
        />
      </div>

      {openModal && (
        <BarterMembershipForm
          open={openModal}
          handleClose={() => setOpenModal(false)}
          text="*Upgrade your membership for extra discounts, click on सदस्यत्व Membership"
        />
      )}
    </section>
  );
}

export default PhysicianMembership;
