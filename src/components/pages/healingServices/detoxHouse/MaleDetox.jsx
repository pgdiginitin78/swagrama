import React, { useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";

function MaleDetox() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h1 className="text-ayuOrange font-semibold text-xl">
        स्वपुंस्शोधनचिकित्सा Male Detox Therapy
      </h1>
      <section className="space-y-4 text-sm leading-6 mt-3">
        <p>
          At&nbsp;
          <strong>
            Swargram’s Male Detox Therapy (स्वपुंस्शोधनचिकित्सा) Center
          </strong>
          , we provide authentic <strong>Panchakarma</strong> — a time-honored
          Ayurvedic detoxification system designed to purify the body, balance
          the doshas, and restore vitality from the deepest level.
        </p>

        <h3 className="text-lg font-semibold mt-4 text-ayuMid">
          🌿 Why Panchakarma Is Not Just a Massage
        </h3>
        <p>
          Panchakarma is a scientifically structured, medically guided detox
          therapy — not a casual spa treatment. It requires personal
          consultation and supervision by an experienced
          <strong>Ayurvedic Vaidya</strong> for long-term health, balance, and
          well-being.
        </p>

        <h4 className="text-base font-semibold mt-2 text-ayuOrange">
          The Healing Journey Includes
        </h4>

        <ul className="space-y-2 mt-2">
          {[
            [
              "Deep Detoxification",
              "Eliminates chronic toxins to improve organ vitality and energy.",
            ],
            [
              "Dosha Balancing",
              "Harmonizes Vata, Pitta & Kapha to prevent disease.",
            ],
            [
              "Improved Digestion & Metabolism",
              "Enhances nutrient absorption and gut health.",
            ],
            [
              "Mental Clarity & Stress Relief",
              "Calms the nervous system and sharpens focus.",
            ],
            [
              "Stronger Immunity",
              "Boosts the body’s natural defense mechanisms.",
            ],
            [
              "Anti-Aging & Rejuvenation",
              "Revitalizes tissues, supports longevity, and improves skin glow.",
            ],
          ].map(([title, desc], i) => (
            <li key={i} className="flex gap-2">
              <span className="font-semibold min-w-[230px] block">{title}</span>
              <span>
                {" "}
                <strong>:</strong> &nbsp;{desc}
              </span>
            </li>
          ))}
        </ul>
        <h4 className="text-base font-semibold mt-2 text-ayuOrange">
          The Five Pillars of Panchakarma Therapy
        </h4>

        <ul className="space-y-2 mt-2">
          {[
            [
              "Vamana",
              "Therapeutic emesis (detox through controlled vomiting)",
            ],
            ["Virechana", "Purgation therapy for bile and toxin removal"],
            ["Basti", "Medicated enema to cleanse colon and balance Vata"],
            ["Nasya", "Nasal detox for head & sinus purification"],
            [
              "Raktamokshana",
              "Blood purification for toxin reduction & skin health",
            ],
          ].map(([title, desc], i) => (
            <li key={i} className="flex  gap-2">
              <span className="font-semibold min-w-[230px] block">{title}</span>
              <span>
                <strong>:</strong> &nbsp; {desc}
              </span>
            </li>
          ))}
        </ul>
        <p className="font-medium mt-3">
          Choose the serene natural environment of the
          <strong>Swargram Community</strong> for your detox journey — a place
          where your <strong>body, mind, and soul</strong> can truly heal and
          rejuvenate.
        </p>
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

export default MaleDetox;
