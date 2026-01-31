import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import ShieldIcon from "@mui/icons-material/Shield";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { MdBookmarkAdded } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function DirectorFamilyMembership() {
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
          text: <>स्वसन्तोषणीयसदस्यत्व (Propitious Optimistic Membership) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraphBold",
          text: "A prestigious and privileged membership designed exclusively for the Directors, Partners, and their families of the Swagram Community Organization.",
        },

        {
          type: "heading",
          icon: <MdBookmarkAdded className="text-ayuMid" />,
          text: "This membership is reserved for : ",
        },

        {
          type: "list",
          items: [
            "Swagram Directors.",
            "Organizational Partners.",
            "Immediate Family Members of Directors & Partners.",
          ],
        },
        {
          type: "heading",
          icon: <ShieldIcon className="text-ayuMysticBlue" />,
          text: "Key Membership Features:",
        },
        {
          type: "list",
          items: [
            "Sw-Maharthak Valuable Membership – High-value member status with comprehensive benefits.",
            "SwagramPatra Membership – Includes a Community Card (physical card) identifying elite membership status.",
            "Premium & Privilege Services – Access to top-tier services, facilities, and exclusive offerings.",
            "All-Access Community Permissions – Eligible to participate and lead in all aspects of the community ecosystem.",
          ],
        },
        {
          type: "heading",
          icon: <RiCoupon3Fill className="text-ayuOrange" />,
          text: "Coupons & Discounts:",
        },
        {
          type: "list",
          items: [
            "Full Access to Coupons.",
            "Eligibility for Maximum Discounts on all community offerings – including products, wellness services, bookings, programs, and more.",
            "This 5-year membership recognizes the leadership and foundational role of Directors and Partners in building and nurturing Swagram. It ensures their families continue to benefit from the values and vision they helped shape.",
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

export default DirectorFamilyMembership;
