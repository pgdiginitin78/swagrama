import React, { useState } from "react";
import OPDBookingModal from "./OPDBookingModal";
import CommonButton from "../../../common/button/CommonButton";

function HomoeopathyOPDClinic() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h1 className="text-ayuLightBlue font-semibold text-xl">
        स्वसमचिकित्सा Homoeopathy OPD Clinic
      </h1>
      <section className="space-y-4 text-sm leading-6 mt-6">
        <p>
          At <strong>Swargram’s स्वसमचिकित्सा Homoeopathy OPD</strong>, we
          believe that true healing begins with self-awareness and alignment
          with one’s natural constitution. Homoeopathy empowers individuals to
          understand their inner nature and offers remedies that gently restore
          balance at the root level.
        </p>

        <blockquote className="italic border-ayuLightBlue border-l-4 pl-3">
          “Your Nature, Your Future”
        </blockquote>

        <p>
          is not just a phrase—it is the philosophy behind our treatment
          approach.
        </p>

        <h3 className="text-lg font-semibold mt-4 text-ayuLightBlue">
          What Makes Our Homoeopathy OPD Unique?
        </h3>

        <ul className="space-y-2 text-sm mt-2">
          {[
            [
              "Constitutional Healing",
              "Personalized treatments based on your emotional, mental, and physical constitution to promote deep-rooted recovery.",
            ],
            [
              "Integrated Wellness Environment",
              "Swargram’s healing ecosystem unites Ayurveda, Yoga, Homoeopathy, and Natural Diet along with rejuvenating lifestyle therapies.",
            ],
            [
              "365 Days of Restorative Living",
              "Regular wellness routines, natural therapies, and mindful practices nurture vitality throughout the year.",
            ],
            [
              "Learn the Science of Natural Living",
              "Through the Swagurukul Commune, students engage in applied holistic wellness programs—experiencing and learning natural healing systems deeply.",
            ],
          ].map(([title, desc], i) => (
            <li key={i} className="flex gap-2">
              <span className="font-semibold min-w-[235px]">{title}</span>
              <span>
                <strong>:</strong>&nbsp;&nbsp;{desc}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-end my-2">
        <CommonButton
          type="button"
          label={"Book Appointment"}
          className="px-3 py-1 rounded-lg border border-ayuDark text-ayuDark hover:bg-ayuDark hover:text-white"
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <OPDBookingModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default HomoeopathyOPDClinic;
