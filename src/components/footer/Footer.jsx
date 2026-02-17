import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  YouTube
} from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SwagramaLogo from "../assets/landing-page/swagramaLogo.png";

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        .pulse-animate {
          animation: pulse 2s ease-in-out infinite;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: white;
          border-radius: 2px;
        }

        .footer-link {
          position: relative;
          padding-left: 0;
          transition: padding-left 0.3s ease;
        }

        .footer-link::before {
          content: '→';
          position: absolute;
          left: -20px;
          opacity: 0;
          color: white;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          padding-left: 20px;
        }

        .footer-link:hover::before {
          opacity: 1;
          left: 0;
        }
      `}</style>

      <footer
        ref={footerRef}
        className="relative overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-lime-900"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b6f47] via-[#c9a86a] to-[#8b6f47]" />
        <div className="relative z-10 w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-white/60 to-white/30 p-6 md:p-8 rounded-2xl backdrop-blur-md border-2 border-[#8b6f47]/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-400">
                <img
                  src={SwagramaLogo}
                  alt="Swagrama Logo"
                  className="h-28 md:h-36 w-auto mx-auto drop-shadow-lg"
                />
              </div>
              {/* <div>
                <h5 className="font-['Cinzel'] text-white text-sm font-semibold mb-2">
                  Download App
                </h5>
                <a
                  href="https://play.google.com/store/apps/details?id=com.innover.swagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/20 text-white hover:bg-[#8b6f47] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm text-xs pulse-animate"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                  </svg>
                  <span className="font-medium">Play Store</span>
                </a>
              </div> */}
            </div>
            <div>
              <h4 className="font-['Cinzel'] text-white text-base font-bold mb-3 relative pb-2 footer-heading">
                Explore
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/aboutUs" },
                  { label: "Refund Policy", href: "/" },
                  { label: "Privacy Policy", href: "/" },
                  { label: "Terms & Conditions", href: "/" },
                  {
                    label: "गाईत्वग्राम Cow Village",
                    href: "https://gaitvafarms.com/dashboard",
                  },
                ].map((link, index) => (
                  <Link
                    to={link.href}
                    key={index}
                    className="text-white/90 hover:text-white transition-all duration-300 footer-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-['Cinzel'] text-white text-base font-bold mb-3 relative pb-2 footer-heading">
                Contact
              </h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex gap-2 items-start text-white/90">
                  <WhatsAppIcon className="flex-shrink-0 text-white mt-0.5 text-base" />
                  <div>
                    <p className="font-medium text-xs mb-0.5">
                      WhatsApp / Helpline <span className="font-normal"></span>
                    </p>
                    <p className="text-xs">+91 8048794650</p>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-white/90">
                  <Email className="flex-shrink-0 text-white mt-0.5 text-base" />
                  <a
                    href="mailto:swagrama.lavale@gmail.com"
                    className="hover:underline text-xs break-all"
                  >
                    swagrama.lavale@gmail.com
                  </a>
                </div>

                <div className="flex gap-2 items-start text-white/90">
                  <LocationOn className="flex-shrink-0 text-white mt-0.5 text-base" />
                  <div>
                    <p className="font-medium text-xs mb-1">
                      Community Village
                    </p>
                    <p className="text-xs leading-relaxed">
                      SwaGrama Ayurveda Yoga Nature Agro Tourism,Near Symbiosis
                      University Women's Medical College, Next to Lupin Company,
                      Symbiosis - Lavale Road, Near GaitvaGrama. Lavale – 412115
                      Tal - Mulshi Pune Maharashtra India
                    </p>
                    <a
                      href="https://maps.app.goo.gl/gUrwu5xSRZxVbyZw5#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c9a86a] hover:text-[#d4b87d] hover:underline text-[10px] mt-0.5 inline-block"
                    >
                      📍 View on Maps
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 items-start text-white/90">
                  <LocationOn className="flex-shrink-0 text-white mt-0.5 text-base" />
                  <div>
                    <p className="font-medium text-xs mb-1">Office</p>
                    <a
                      href="https://www.google.com/maps/place/JnanaYogAyu+PVT.+LTD.,+Vd.+Santosh+Suryawanshi+JNANAYOGAYU+PVT.+LTD.+Ayurveda,+Yoga,+Homoeopathy+clinic+81%2F635,+Nandraj+Sankul,+1A-2,+Mani+Road,+Famous+Chowk,+New+Sangavi,+Pune,+Maharashtra+411027/data=!4m2!3m1!1s0x3bc2b9dff887ceab:0xbebf26c29918dafe?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjI2LjQYACDXggMqkAEsOTQyNjc3MjksOTQyNzUzMTcsOTQyMjMyOTksOTQyMTY0MTMsOTQyMTI0OTYsOTQyNzQ4ODIsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsNDcwODQzOTMsOTQyMTMyMDAsOTQyNTgzMjVCAklO&skid=cba071a2-179f-45ca-a3e8-40b9b459df7f&g_st=awb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-xs leading-relaxed"
                    >
                      JnanaYogAyu, 81/635, Nandraj Sankul, 1 A - 2, Main Road,
                      Famous Chowk, New Sangavi, Pune, Maharashtra 411027
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-['Cinzel'] text-white text-base font-bold mb-3 relative pb-2 footer-heading">
                Connect With Us
              </h4>
              <div className="flex gap-2.5 mb-4">
                <a
                  href="https://www.instagram.com/swagramacommunity/?igsh=am9scG90bXd1ZW0y#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-[#8b6f47] hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="text-white text-lg" />
                </a>
                <a
                  href="https://www.facebook.com/swagramacommunity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-[#8b6f47] hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="text-white text-lg" />
                </a>
                <a
                  href="https://www.youtube.com/@swagramacommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-[#8b6f47] hover:scale-110 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <YouTube className="text-white text-lg" />
                </a>
              </div>
              <div className="w-full h-[140px] rounded-lg overflow-hidden border border-white/20">
                <iframe
                  src="https://www.google.com/maps?q=Swagram%20Car%20Parking%20Lavale%20Maharashtra&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/GPQ9%2BJW3+Swagram+Car+Parking,+Lavale,+Maharashtra+412115/data=!4m2!3m1!1s0x3bc2bd000a2c0069:0x10c6818ae0fd474e?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjM5LjcYACCenQoqkAEsOTQyNjc3MjcsOTQyOTIxOTEsOTQyODQ0OTAsOTQyMjMyOTksOTQyMTY0MTMsOTQyODA1NzYsOTQyMTI0OTYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsNDcwODQzOTMsOTQyMTMyMDBCAklO&skid=087f7e10-b47a-456a-88bb-41de9d77bc78&g_st=awb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a86a] hover:text-[#d4b87d] hover:underline text-xs mt-2 inline-block"
              >
                📍 View Parking Location
              </a>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-white/20 text-white/80 text-xs">
            <p>&copy; 2026 Swagrama Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
