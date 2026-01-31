import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BathingSweater() {
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
      <h1 className="text-ayuOrange font-semibold text-xl">
        स्वअवगाहस्वेदक Bathing Sweater Therapy
      </h1>
      <section ref={sectionRef}  className="space-y-3 text-sm leading-6 mt-3">
        <p>
          <strong>Avagaha Swedana (स्वाअवगाहस्वेदक)</strong> is a traditional
          sub-type of Panchakarma therapy in Ayurveda, designed to deeply relax,
          detoxify, and revitalize the body through a warm, medicated bath.
          Performed after an <strong>Abhyanga (herbal oil massage)</strong>,
          this therapy involves sitting in a specially designed tub filled with
          warm herbal decoctions, medicated milk, medicated oils, or therapeutic
          water.
        </p>
        <h3 className="text-lg font-semibold mt-2 text-ayuMid">🌿 How It Works</h3>
        <p>
          The warm medicated liquid penetrates deep into the tissues, loosening
          toxins, enhancing circulation, and calming the nervous system. Based
          on your <strong>Prakriti (constitution)</strong>
          and specific health conditions, your Ayurveda Vaidya will prescribe
          the right formulation and schedule for therapy.
        </p>

        {/* Key Benefits */}
        <h4 className="text-base font-semibold mt-3 text-ayuMid">
          🌱 Key Benefits of Avagaha Swedana :
        </h4>

        <div className="space-y-2 mt-2">
          {[
            [
              "💆‍♂️ Deep Relaxation & Stress Relief",
              "Soothes the nervous system, eases tension, and reduces anxiety.",
            ],
            [
              "🦴 Pain & Inflammation Relief",
              "Ideal for joint pain, arthritis, backaches, and muscle stiffness.",
            ],
            [
              "❤️ Enhanced Circulation",
              "Warmth improves blood flow and tissue oxygenation.",
            ],
            [
              "🧪 Detoxification",
              "Supports elimination of toxins through sweat and deep tissue cleansing.",
            ],
            [
              "🌸 Skin Rejuvenation",
              "Improves skin tone, elasticity, and glow.",
            ],
            [
              "🚽 Urinary & Renal Health",
              "Assists in relieving painful urination and supports kidney function.",
            ],
            [
              "⚖️ Vata Dosha Balance",
              "Effective in pacifying aggravated Vata, the root of many chronic conditions.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-2">
              <span className="font-semibold min-w-[250px]">{title} </span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        {/* Why Supervision Matters */}
        <h4 className="text-base font-semibold">
          ⚠️ Why Expert Supervision Matters
        </h4>

        <p>
          Avagaha Swedana is not a recreational bath — it’s a therapeutic
          process. Only an experienced
          <strong> Ayurveda Vaidya</strong> can guide you on when, how, and
          which formulation suits your condition. Supporting the therapy with
          Ayurvedic herbal medicine and a <strong>sattvic diet</strong>
          before and after treatment is essential for safe and successful
          detoxification.
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

export default BathingSweater;
