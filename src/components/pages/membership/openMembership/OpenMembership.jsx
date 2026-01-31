import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function OpenMembership() {
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
          text: <>मुक्तसदस्यत्व (Open Membership) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraphBold",
          text: " Open for all ",
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
              * You will get 0% off on all bookings. <br />* Upgrade your
              membership for extra discounts, click on सदस्यत्व Membership
            </>
          }
        />
      )}
    </section>
  );
}

export default OpenMembership;
