import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import OPDBookingModal from "../opdClinic/OPDBookingModal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WindSunRejuvenation() {
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
        स्वातातपिकरसायन Wind Sun Rejuvenation
      </h1>
      <section ref={sectionRef} className="space-y-4 text-sm leading-6 mt-3 ">
        <p className="fade-item">
          <strong>स्वातातपिकरसायन</strong> is a unique Ayurvedic Nature Therapy
          practiced at Swargram that harnesses the healing power of the sunlight{" "}
          <strong>(Atapi)</strong> and fresh wind <strong>(Vata)</strong>
          to rejuvenate the body, balance the doshas, and elevate mental
          clarity. This therapy promotes natural immunity, emotional well-being,
          and energy balance when administered systematically and under expert
          guidance.
        </p>

        <p className="fade-item">
          This isn’t casual sunbathing—it’s a precisely guided therapeutic
          exposure, deeply rooted in Ayurvedic wisdom and tailored to each
          individual’s <strong>prakriti (constitution)</strong> and health
          conditions.
        </p>

        {/* Benefits */}
        <h3 className="text-lg font-semibold fade-item text-ayuTulsi">
          🌿 Core Benefits of Wind & Sun Rejuvenation Therapy:
        </h3>

        <div className="space-y-2 mt-2">
          {[
            [
              "☀️ Vitamin D Absorption",
              "Natural sunlight boosts Vitamin D levels, supporting bone health, immunity, and hormone balance.",
            ],
            [
              "😊 Elevated Mood & Mental Clarity",
              "Sunlight stimulates serotonin production, reducing stress and promoting a calm, positive mind.",
            ],
            [
              "🌙 Better Sleep",
              "Exposure to natural light resets circadian rhythm, enhancing sleep quality and restoring vitality.",
            ],
            [
              "🌸 Skin Health",
              "Controlled sun exposure supports skin renewal and radiance, while wind promotes detox through the skin.",
            ],
            [
              "💨 Improved Circulation & Energy",
              "Fresh air and sunlight increase oxygenation and blood flow, boosting energy and alertness.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="fade-item flex gap-2">
              <span className="font-semibold min-w-[250px]">{title}</span>
              <span><strong>:</strong>&nbsp;&nbsp;{desc}</span>
            </div>
          ))}
        </div>

        <h4 className="text-base font-semibold mt-4 fade-item text-ayuTulsi">
          🧠 Guided by Ayurveda, Not Guesswork
        </h4>
        <p className="fade-item">
          Wind & Sun exposure therapy is not a casual practice. It must be
          personalized and supervised by an experienced Ayurveda Vaidya who will
          prescribe:
        </p>

        <ul className="list-disc space-y-2 fade-item">
          <li>The right timing, duration, and posture</li>
          <li>
            A supportive routine of herbal supplements and Ayurvedic diet before
            and after therapy
          </li>
          <li>
            An appropriate balance of shade and exposure to prevent harm and
            maximize healing
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

export default WindSunRejuvenation;
