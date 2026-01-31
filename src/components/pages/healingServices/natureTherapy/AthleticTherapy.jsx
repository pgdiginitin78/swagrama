import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AthleticTherapy() {
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
        स्वमल्लचिकित्सा Athletic Therapy
      </h1>
      <section ref={sectionRef} className="space-y-4 text-sm leading-6 mt-3 ">
 
          <p className="fade-item">
            <strong>स्वमल्लचिकित्सा (Athletic Therapy)</strong> at Swargram is a
            holistic blend of Ayurvedic principles and therapeutic movement,
            designed not only for athletes but for anyone seeking to recover
            from injuries, enhance performance, prevent future setbacks, and
            build overall strength and mobility.
          </p>

          <p className="fade-item">
            This isn’t just rehabilitation—it’s a proactive, personalized care
            model rooted in your
            <strong> prakriti (body constitution)</strong> and guided by expert
            Ayurveda Vaidyas.
          </p>

          <h3 className="text-lg font-semibold fade-item text-ayuTulsi">
            💪 Key Benefits of Ayurvedic Athletic Therapy:
          </h3>

          <div className="space-y-2 mt-2">
            {[
              [
                "🏃 Injury Prevention",
                "Identify and correct muscle imbalances, improper movement patterns, and overuse risks before they lead to injury.",
              ],
              [
                "🔄 Enhanced Recovery",
                "Use of manual therapy, restorative stretches, and therapeutic routines to speed up healing and regain function.",
              ],
              [
                "⚙️ Optimized Performance",
                "Realign joints, improve posture, and strengthen muscles to help you move with more power and precision.",
              ],
              [
                "🛑 Pain Management",
                "Target root causes of pain with a personalized plan combining Ayurvedic herbs, therapies, and movement.",
              ],
              [
                "🧘 Improved Flexibility & Mobility",
                "Restore natural range of motion, prevent stiffness, and enhance everyday functionality.",
              ],
              [
                "❌ Surgery Avoidance",
                "In certain cases, therapy may reduce or eliminate the need for surgery in injuries like ligament damage or rotator cuff strains.",
              ],
            ].map(([title, desc], i) => (
              <div key={i} className="fade-item flex gap-2">
                <span className="font-semibold min-w-[240px]">{title} </span>
                <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
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

export default AthleticTherapy;
