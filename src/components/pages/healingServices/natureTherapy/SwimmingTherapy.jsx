import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SwimmingTherapy() {
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
        स्वजलतरणचिकित्सा Swimming Therapy
      </h1>
      <section ref={sectionRef} className="space-y-4 text-sm leading-6 mt-3 ">
        <p className="fade-item">
          <strong>स्वजलतरणचिकित्सा (Swimming Therapy)</strong>, also known as
          aquatic therapy, is a gentle yet powerful Ayurvedic nature-based
          treatment that utilizes the healing properties of water to restore
          physical strength, reduce pain, and improve overall well-being.
        </p>

        <p className="fade-item">
          Guided by experienced Ayurveda Vaidyas, swimming therapy at Swargram
          is prescribed according to your unique{" "}
          <strong>Prakriti (body constitution)</strong> and current health
          condition. It's not a casual swim—it’s a therapeutic journey for those
          truly committed to long-term health and inner balance.
        </p>

        <h3 className="text-lg font-semibold fade-item text-ayuTulsi">
          🌿 Healing Benefits of Swimming Therapy :
        </h3>

        <div className="space-y-2 mt-2">
          {[
            [
              "🌊 Reduced Joint Stress",
              "Water supports up to 90% of body weight, easing pressure on joints and bones.",
            ],
            [
              "🤸‍♂️ Improved Mobility & Flexibility",
              "Warm water relaxes the muscles, allowing greater range of motion and comfort in movement.",
            ],
            [
              "💪 Muscle Strengthening & Endurance",
              "Natural resistance in water builds strength without impact or strain.",
            ],
            [
              "❤️ Cardiovascular Fitness",
              "Enhances heart function while being gentle on the entire body.",
            ],
            [
              "⚖️ Better Balance & Coordination",
              "Water-based exercises improve stability and control, even post-injury.",
            ],
            [
              "💆‍♂️ Pain Relief & Mental Calm",
              "Hydrotherapy alleviates pain and reduces stress, ideal for chronic discomfort and fatigue.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="fade-item flex gap-2">
              <span className="font-semibold min-w-[360px]">{title} </span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        <h4 className="text-base font-semibold mt-4 fade-item text-ayuTulsi">
          🧘 More Than a Physical Treatment
        </h4>
        <p className="fade-item">
          This is not a leisure activity—it’s a part of a complete Ayurvedic
          Nature Therapy protocol, which includes:
        </p>

        <ul className="list-disc space-y-2 fade-item">
          <li>Personalized guidance from a qualified Ayurveda Vaidya</li>
          <li>A supporting regimen of Ayurvedic herbal medicines</li>
          <li>A wholesome, detox-supportive diet before and after therapy</li>
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

export default SwimmingTherapy;
