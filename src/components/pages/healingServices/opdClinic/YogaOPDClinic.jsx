import React, { useState } from "react";
import OPDBookingModal from "./OPDBookingModal";
import CommonButton from "../../../common/button/CommonButton";

function YogaOPDClinic() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h1 className="text-ayuLightBlue font-semibold text-xl">
        स्वयोगचिकित्सा Yoga OPD Clinic
      </h1>
      <section className="space-y-4 text-sm leading-6 mt-3">
        <blockquote className="italic text-center text-base   bg-ayuLight font-semibold  text-white py-3  border-l-4 border-ayuDark rounded-xl">
          “योगेन चित्तस्य पदेन वाचां, मलं शरीरस्य च वैद्यकेन। योऽपाकरोत् तं
          प्रवरं मुनीनां, पतंजलि प्रांजलिरानतोऽस्मि।।”
        </blockquote>

        <p>
          At <strong>Swargram’s Yoga OPD Clinic (स्वयोगचिकित्सा)</strong>, we
          embrace the integrated power of <strong>योग (Yoga)</strong> for mind
          purification,
          <strong>संस्कृत वाक्य</strong> for speech refinement, and
          <strong>आयुर्वेद</strong> for body purification, as envisioned by sage
          Patanjali.
        </p>

        <h3 className="text-lg font-semibold mt-4 text-ayuMid">
          Why Choose Yoga OPD at Swargram?
        </h3>

        <ul className="space-y-2 mt-2 text-sm">
          {[
            [
              " Mind, Body & Soul Alignment",
              "Yoga therapy bridges mental clarity, physical health, and spiritual elevation.",
            ],
            [
              " Therapeutic & Personalized Yoga",
              "Expert yoga consultants offer general and therapeutic sessions tailored to individual body type, emotional state, and health conditions.",
            ],
            [
              " Integrated Wellness Approach",
              "A blend of Ayurveda, Yoga, Homoeopathy, and Natural Diet supports root-cause healing, disease reversal, and long-term rejuvenation.",
            ],
            [
              " 365 Days of Healing Activities",
              "Daily routines designed to promote vitality, conscious living, and inner peace.",
            ],
            [
              " Swagurukul Learning Experience",
              "Through our स्वगुरुकुल Commune, participants engage in applied training programs gaining experiential knowledge of yoga, Ayurveda, nature therapy, and sustainable living.",
            ],
          ].map(([title, desc], i) => (
            <li key={i} className="flex gap-2">
              <span className="font-semibold min-w-[250px]">{title} </span>
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

export default YogaOPDClinic;
