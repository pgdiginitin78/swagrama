import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function MaleMudBath() {
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
        स्वपुंस्शोधनचिकित्सा Male Detox Therapy
      </h1>

      <section
        ref={sectionRef}
        className="space-y-4 text-sm leading-6 mt-3"
      >
        <p className="fade-item">
          At <strong>Swargram</strong>,
          <strong>Mud Bath Therapy (स्वपुस्मृत्तिकास्नान)</strong> is more than
          a surface-level experience—it's a deep-rooted Ayurvedic Nature Therapy
          that detoxifies, nourishes, and rejuvenates the body and mind using
          the healing power of the earth.
        </p>

        <p className="fade-item">
          This therapy is carefully personalized by our expert Ayurveda Vaidyas,
          ensuring it aligns with your unique constitution (Prakriti) and health
          condition. Mud therapy is not a recreational spa treatment—it's a
          powerful practice of restoration and inner balance.
        </p>

        <h3 className="text-lg font-semibold fade-item text-ayuTulsi">
          🌿 Why Mud Therapy at Swargram?
        </h3>
        <p className="fade-item">
          Our approach combines Ayurveda, nature-based detox, herbal nutrition,
          and lifestyle rituals to activate your body’s self-healing abilities.
          The treatment includes Ayurvedic guidance, internal herbal
          supplements, and a wholesome sattvic diet before, during, and after
          therapy for optimal results.
        </p>

        <h4 className="text-base font-semibold mt-3 fade-item text-ayuTulsi">
          🌱 Key Benefits of Mud Bath Therapy :
        </h4>

        <div className="space-y-2 mt-2">
          {[
            [
              "Detoxification",
              "Draws out toxins and impurities from the skin, cleansing at a deep cellular level.",
            ],
            [
              "Skin Health",
              "Improves skin texture, reduces acne, and soothes conditions like eczema and psoriasis.",
            ],
            [
              "Pain Relief & Muscle Relaxation",
              "Alleviates joint pain, muscle stiffness, and improves flexibility.",
            ],
            [
              "Enhanced Blood Circulation",
              "Mineral-rich mud stimulates circulation and nourishes tissues.",
            ],
            [
              "Immune Boosting",
              "Strengthens the body’s natural defenses through detox and improved circulation.",
            ],
            [
              "Anti-Aging Effects",
              "Promotes collagen production, improves elasticity, and reduces signs of aging.",
            ],
            [
              "Emotional Reset",
              "Provides deep relaxation and mental clarity, reconnecting you with nature’s rhythm.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="fade-item flex gap-2">
              <span className="font-semibold min-w-[283px]">{title} </span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        <h4 className="text-base font-semibold mt-4 fade-item text-ayuMid">
          Not Just for Looks — For Lifelong Wellness
        </h4>
        <p className="fade-item">
          Mud therapy is not about momentary pleasure, but about achieving
          lasting well-being. It’s a therapy for those truly committed to
          restoring their health—guided only by a trusted Ayurveda Vaidya in a
          natural, healing setting like <strong>Swargram</strong>.
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

export default MaleMudBath;
