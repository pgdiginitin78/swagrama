import React, { useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";

function LocalDetox() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h1 className="text-ayuOrange font-semibold text-xl">
        स्वस्थानिकशोधनचिकित्सा Local Detox Therapy
      </h1>
      <section className="space-y-4 text-sm leading-6 mt-3">
        <p>
          At
          <strong>
            Swargram’s Local Detox Therapy (स्वस्थानिकशोधनचिकित्सा) center
          </strong>
          , we specialize in <strong>Upakarma</strong>, or focused Ayurvedic
          therapies designed to purify specific areas of the body, restore
          balance, and rejuvenate health. Unlike generalized detox, these local
          treatments target imbalances in a personalized way, guided by the
          expert hands of a <strong>qualified Ayurveda Vaidya</strong>.
        </p>

        <h3 className="text-lg font-semibold mt-2 text-ayuOrange">
          🌀 What is Upakarma (Local Detox Therapy)?
        </h3>
        <p>
          Upakarma involves ritual-based, localized treatments that align with
          your unique constitution <strong>(Prakriti)</strong> and specific
          imbalances. These therapies are not spa treatments for temporary
          pleasure — they are <strong>scientifically rooted protocols</strong>
          intended for long-term healing, wellness, and harmony.
        </p>

        <h4 className="text-base font-semibold mt-3 text-ayuTulsi">
          🌿 Benefits of Local Detox Therapy :
        </h4>

        <div className="space-y-2 mt-2">
          {[
            [
              "🧪 Targeted Detoxification",
              "Cleanses specific organs or systems to improve digestion, energy, and vitality.",
            ],
            [
              "⚖️ Dosha Balancing",
              "Personalized therapies help realign Vata, Pitta, and Kapha to prevent disease.",
            ],
            [
              "🧘 Stress Relief & Mental Clarity",
              "Herbal oil therapies, meditation, and mindfulness promote calmness and focus.",
            ],
            [
              "🛡️ Immune Support",
              "Strengthens the body’s defense systems using plant-based formulations and treatments.",
            ],
            [
              "✨ Skin Health & Rejuvenation",
              "Improves circulation, detoxifies tissues, and slows visible aging signs.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-2">
              <span className="font-semibold min-w-[260px]">{title} </span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        {/* Supervision Importance */}
        <h4 className="text-base font-semibold mt-4 text-ayuOrange">
          🩺 Why Supervision Matters :
        </h4>

        <ul className="list-disc  space-y-2">
          <li>
            Panchakarma and Upakarma should only be administered under the
            supervision of a<strong> trusted and experienced Vaidya</strong>.
          </li>
          <li>
            A specific <strong>Ayurvedic herbal regimen and diet</strong> must
            be followed before and after therapy to prepare and nourish the
            body.
          </li>
          <li>
            Panchakarma is a <strong>commitment, not a casual retreat</strong>;
            it requires intention, care, and time for complete and satisfying
            results.
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

export default LocalDetox;
