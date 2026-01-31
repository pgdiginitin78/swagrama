import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FertilesoilTherapy() {
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
        स्वउर्वराचिकित्सा Fertilesoil Therapy
      </h1>
      <section ref={sectionRef} className="space-y-4 text-sm leading-6 mt-3 ">
        <p className="fade-item">
          <strong>स्वउर्वराचिकित्सा (Fertile Soil Therapy)</strong> at Swargram
          is a profound form of Ayurvedic Nature Therapy rooted in the
          principles of natural farming, grounding, and earthen healing. This
          therapy is not just about growing crops—it’s about growing health,
          vitality, and spiritual connection through direct interaction with
          rich, living soil.
        </p>

        <p className="fade-item">
          This therapy is performed strictly in chemical-free natural farming
          environments, under the supervision of expert Ayurveda Vaidyas who
          assess your <strong>prakriti (constitution)</strong>
          and health condition.
        </p>

        <h3 className="text-lg font-semibold fade-item text-ayuTulsi">
          🌿 What is Fertile Soil Therapy?
        </h3>

        <p className="fade-item">
          Engaging with nutrient-dense, microbe-rich soil activates detox,
          nourishes the body through sensory input, and supports mental balance
          through the power of grounding. This therapy is especially beneficial
          when paired with Ayurvedic diet, herbal support, and daily nature
          routines.
        </p>

        <h4 className="text-base font-semibold mt-3 fade-item text-ayuTulsi">
          🌱 Therapeutic Benefits of Fertile Soil Therapy:
        </h4>

        <div className="space-y-2 mt-2">
          {[
            [
              "🧪 Natural Detoxification",
              "Soil minerals draw out toxins, helping the body cleanse gently and naturally.",
            ],
            [
              "🌸 Skin Rejuvenation",
              "Rich soil textures nourish the skin, enhancing texture, hydration, and glow.",
            ],
            [
              "🧘 Grounding & Emotional Balance",
              "Barefoot contact with the earth reduces stress and calms the nervous system.",
            ],
            [
              "🦠 Microbial Exposure",
              "Healthy soil contains beneficial microbes that may strengthen the immune system.",
            ],
            [
              "❤️ Improved Circulation & Energy",
              "The warmth and touch of soil stimulate blood flow and vitality.",
            ],
            [
              "🌾 Connection with Life Energy",
              "Working with the soil reconnects us to nature’s rhythms and our role in the ecosystem.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="fade-item flex gap-2">
              <span className="font-semibold min-w-[250px]">{title} :</span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
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

export default FertilesoilTherapy;
