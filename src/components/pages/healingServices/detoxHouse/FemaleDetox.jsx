import React, { useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";

function FemaleDetox() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h1 className="text-ayuOrange font-semibold text-xl">
       स्वस्त्रीशोधनचिकित्सा Female Detox Therapy
      </h1>
      <section className="space-y-4 text-sm leading-6 mt-3">
        <p>
          At <strong>Swargram’s स्वस्त्रीशोधनचिकित्सा center</strong>, we offer
          carefully tailored
          <strong> Panchakarma therapy</strong> designed specifically for
          women’s physiological and emotional needs. This powerful Ayurvedic
          detox process not only removes toxins but also balances hormones,
          supports reproductive health, and restores mental and physical
          vitality.
        </p>

        <h3 className="text-lg font-semibold mt-2 text-ayuLight">
          🌿 Why Panchakarma for Women?
        </h3>
        <p>
          Panchakarma is not a casual massage or spa — it is a comprehensive,
          constitution-based therapy that must be prescribed and supervised by a{" "}
          <strong>qualified Ayurveda Vaidya</strong>. If done correctly, it can
          create long-lasting balance, improve fertility, reduce stress, and
          enhance energy levels.
        </p>

        <h4 className="text-base font-semibold mt-3 text-ayuOrange">
          Core Benefits of Female Detox Therapy :
        </h4>

        <div className="space-y-2 mt-2">
          {[
            [
              "🧼 Deep Detoxification",
              "Clears accumulated toxins from the body, supporting organ function and hormonal health.",
            ],
            [
              "⚖️ Dosha Balancing",
              "Restores equilibrium in Vata, Pitta, and Kapha, helping prevent and manage chronic conditions.",
            ],
            [
              "🔥 Enhanced Digestion",
              "Improves metabolism and nutrient absorption, essential for vitality and immunity.",
            ],
            [
              "🧘 Emotional Clarity & Stress Relief",
              "Calms the nervous system, improves focus, and reduces anxiety and fatigue.",
            ],
            [
              "🛡️ Immune Boosting",
              "Strengthens internal systems for greater resistance to illness.",
            ],
            [
              "🌸 Reproductive Wellness & Rejuvenation",
              "Supports menstrual health, skin clarity, and graceful aging.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-2">
              <span className="font-semibold min-w-[290px]">{title} </span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        <h4 className="text-base font-semibold mt-4 text-ayuOrange">
          The Five Core Panchakarma Therapies :
        </h4>

        <ul className="space-y-2 mt-2">
          {[
            ["Vamana", "Therapeutic emesis"],
            ["Virechana", "Purgation"],
            ["Basti", "Medicated enema"],
            ["Nasya", "Nasal cleansing"],
            ["Raktamokshana", "Blood purification"],
          ].map(([title, desc], i) => (
            <li key={i} className="flex gap-2">
              <span className="font-semibold min-w-[265px]">{title} </span>
              <span> <strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-base font-semibold mt-4 text-ayuOrange">
          ⚠️ Guidelines for a Safe & Effective Panchakarma
        </h4>
        <ul className="list-disc  space-y-2">
          <li>
            Begin with a consultation by a
            <strong>trusted Ayurveda Vaidya</strong> to determine the ideal
            therapy for your body type and condition.
          </li>
          <li>
            <strong>Ayurvedic herbal preparations and sattvic diet</strong> must
            be followed before and after the treatment to support the detox
            process and recovery.
          </li>
          <li>
            Panchakarma requires
            <strong>commitment, time, and proper guidance</strong> — it is a
            healing journey, not a recreational activity.
          </li>
          <li>
            The serene, natural environment of
            <strong>Swargram Community</strong> enhances the detox process,
            offering peace, nourishment, and true restoration.
          </li>
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

export default FemaleDetox;
