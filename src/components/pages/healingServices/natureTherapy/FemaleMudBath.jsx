import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FemaleMudBath() {
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-item", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div>
      <h1 className="text-ayuTulsi font-semibold text-xl">
        स्वस्त्रीमृत्तिकास्नान Female Mud Bath
      </h1>

      <section
        ref={sectionRef}
        className="space-y-4 text-sm leading-6 mt-3 "
      >
        <p className="fade-item">
          At
          <strong>
            Swargram’s स्वस्त्री मृत्तिकास्नान (Female Mud Bath Therapy)
          </strong>{" "}
          center, we bring the ancient healing art of Ayurvedic Mud Therapy into
          the modern wellness space—designed specifically for women’s
          physiological and emotional needs. This isn’t just skin-deep care, but
          a complete system of detox, nourishment, and rejuvenation guided by
          expert Ayurveda Vaidyas.
        </p>

        <h3 className="text-lg font-semibold fade-item text-ayuTulsi">
          🌿 Why Mud Bath Therapy Matters for Women
        </h3>
        <p className="fade-item">
          Mud therapy is not a recreational experience—it is a nature-based
          Ayurvedic therapy that works deeply on both external beauty and
          internal balance. Our treatments are customized based on your
          <strong> prakriti (constitution)</strong> and health condition,
          ensuring safe, meaningful, and long-term benefits.
        </p>

        <h4 className="text-base font-semibold mt-3 fade-item text-ayuTulsi">
          🌱 Therapeutic Benefits of Female Mud Bath :
        </h4>

        <div className="space-y-2 mt-2">
          {[
            [
              "🧪 Detoxification",
              "Pulls toxins and impurities from the skin, leaving it clean, fresh, and radiant.",
            ],
            [
              "🌸 Skin Health",
              "Improves texture, reduces acne, and supports conditions like psoriasis and eczema.",
            ],
            [
              "💪 Muscle & Joint Relief",
              "The warmth of the mud eases body pain, cramps, and stiffness.",
            ],
            [
              "❤️ Enhanced Circulation",
              "Boosts blood flow, supports cell renewal, and brings a natural glow.",
            ],
            [
              "🛡️ Stronger Immunity",
              "Detoxification and circulation work together to enhance body defenses.",
            ],
            [
              "⏳ Anti-Aging Benefits",
              "Increases collagen production, firms skin, and reduces wrinkles.",
            ],
            [
              "🌿 Holistic Healing",
              "Offers calmness, clarity, and emotional reset through natural grounding.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="fade-item flex gap-2">
              <span className="font-semibold min-w-[338px]">{title}</span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        <h4 className="text-base font-semibold mt-4 fade-item text-ayuTulsi">
          ⚠️ The Importance of Ayurvedic Guidance
        </h4>
        <p className="fade-item">
          Only a trusted Ayurveda Vaidya can determine the ideal when, how, and
          where of this therapy for your unique condition. This includes a
          supportive herbal regimen and wholesome diet before, during, and after
          treatment to aid detox and nourishment from within.
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

export default FemaleMudBath;
