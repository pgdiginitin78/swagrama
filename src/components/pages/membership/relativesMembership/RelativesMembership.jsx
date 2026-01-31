import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import ShieldIcon from "@mui/icons-material/Shield";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import BarterMembershipForm from "../BarterMembershipForm";

gsap.registerPlugin(ScrollTrigger);

function RelativesMembership() {
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(".fade-item", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.15,
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="space-y-1 pb-3 text-sm leading-6 mt-2 px-4"
    >
      {[
        {
          type: "title",
          text: <>स्वसम्बन्धू (Relatives Form) </>,
        },
        {
          type: "heading",
          icon: <BookmarkAddedTwoToneIcon className="text-ayuSaffron" />,
          text: "Valid for 5 Years",
        },
        {
          type: "paragraphBold",
          text: "मित्र, नातेवाईक, कंपनी, संस्था, शाळा, कॉलेज, ट्रस्ट, पतसंस्था, बँक इत्यादि एकत्र येऊन सदस्यत्व घेऊ शकतात. सातत्याने एअर कंडिशन ऑफिसेसमध्ये स्क्रीन समोर काम करणारे असोत की फॅक्टरीमध्ये काम करणारे असोत. ज्यांचा निसर्गाशी संबंध तुटला आहे. आणि आजाराच्या वाटेवर ज्यांचा प्रवास सुरू व्हायला पाहतो आहे. अशा सर्वांसाठी एक आरोगयपूर्ण थांबा म्हणजे ही मेंबरशिप आहे. समविचारी ग्रुपने एकत्र येऊन प्रत्येकाच्या आरोग्यासोबत संस्थेच्या उन्नतीसाठी टाकलेले एक पाऊल.",
        },
        {
          type: "list",
          items: [
            "Group Membership.",
            "More than 2 members compulsory.",
            "Get 20% Discount on all goods, products, Instruments & Services.",
            "स्वमहार्थकValuableMembership.",
            "Eligible for स्वग्रामपत्रCommunityCard physical card.",
            "Eligible for all primary online services & facilities.",
            "Premium membership & Privilege Services.",
            "Eligible for barter system also. Buy & Sale your farm produces also.",
            "Permissible to use all facility of bookings with coupons & get discounts.",
            "Choose group membership with following categories:  स्वसम्बन्धू Relatives  स्वमैत्र Friends  स्वसंस्था Institute  स्वसाहचर्य Company.",
          ],
        },
        {
          type: "heading",
          icon: <ShieldIcon className="text-ayuMysticBlue" />,
          text: "Make Your Joint Family :",
        },
        {
          type: "paragraphBold",
          text: "प्रत्येकजण निसर्गाशी जवळीक साधणारा निसर्गप्रेमी आहे. लहानपण शुद्ध निसर्ग, अन्नपाणी आणि दिन-ऋतुचर्येत त्याने घालविल्याने त्यालाही निसर्गाच्या सान्निध्यात जावे, एकत्रित कुटुंबात राहावे, विहीरीतील पाणी प्यावे, रानमेवा खावा असे वाटते. आपल्या कुटुंबीयांनी सुद्धा निसर्ग, एकत्रित कुटुंब पद्धती आणि आयुर्वेदीय नैसर्गिक जीवनशैलीचा अनुभव घ्यावा असे त्याला वाटत असते. त्याच्या स्वप्नातील आयुर्वेदिक गाव, घर, चिकित्सालय, आतुरालय, वनोषधि जंगल, गोशाला, औषधिकरण इत्यादि सर्वकाही त्याला अनुभवायचे असते. हजारो वर्षे शेकडो पिढ्यांनी 100 वर्षे जगण्यासाठी हवी असणारी नैसर्गिक आयुर्वेदीय जीवनशैली जगायची असते. जेणेकरून आपल्याप्रति सर्वांचा दृढ विश्वास निर्माण होईल. आजकाल मोठाली शेती असूनही एक पीक पद्धतीमुळे स्वतःला हवी असणारी सर्वप्रकारची वर्षभरची शुद्ध, विष-भेसळमुक्त अन्नधान्य, घाण्याचे तेल, देशी गुळ, तुप, वनोषधी, पंचगव्य इत्यादि शेतकऱ्याकडे उपलब्ध नाही तर इतरांच्याकडे कसे उपलब्ध होणार? कोणाचे माहेर तर कोणाचे मामाचे गांव तर शहरातील जणांचे स्वतःचे गांव तर बहुतांशी खेड्यात राहणारांचे सुद्धा गाव हरविले आहे. चला हे सगळंच जसेच्या तसे तुम्हाला स्वग्रामCommunity मध्ये मिळेल. सहभागी व्हा देवाणघेवाण करण्यासाठी. अष्टविध नाडी परीक्षा आणि वैद्य सल्ल्याने स्वतःचे कुटुंब नेहमी आरोग्यपूर्ण ठेवण्याची संधी. तुमच्या आतमध्ये लपलेल्या कला आणि ज्ञानाला जागृत करणारे स्वगुरुकुल इथे उपलब्ध आहे. की ज्यामध्ये 100 वर्षे जगण्यासाठी पूरक अशा जीवनशैलीला पूर्ण करणारे 10 क्षेत्रातील 20 कोर्स आहेत. ते चार महीने स्वग्राममध्ये चालतात. सातत्याने सहभागी होऊन विश्वातील तज्ञ गुरुंच्या सान्निध्यात राहून स्वतःच एकदिवस गुरु बनण्याच्या पात्रतेचा बनणार असाल तर स्वग्राम पुरेसे आहे. स्वतःच्या मुलांना पुढील पिढ्यांसाठी तुमच्यातील आदर्श दाखविण्यासाठी नामी संधी. पैसे कमवण्याच्या उच्च अतिउच्च शिक्षणासोबत आयुष्य जगण्याचे स्वगुरुकुलही आजच्या काळाची गरज. हो हो, पुढच्या पिढ्यांना शेतकरी, वैद्य, गोपालक, बलुतेदार आणि निसर्गप्रेमी व्हावेसे नक्कीच वाटणार! हे सदस्यत्व एकटे घ्या किंवा कुटुंबासोबत घ्या.",
        },
      ].map((block, index) => (
        <div key={index} className="fade-item">
          {block.type === "title" && (
            <h2 className="text-xl font-semibold text-ayuTulsi flex items-center gap-2">
              {block.text}
            </h2>
          )}

          {block.type === "heading" && (
            <h3 className="text-lg font-semibold text-ayuTulsi flex items-center gap-2">
              <span className="">{block.icon && block.icon}</span> {block.text}
            </h3>
          )}

          {block.type === "paragraph" && (
            <p className="text-gray-500">{block.text}</p>
          )}

          {block.type === "paragraphBold" && (
            <p className="font-medium text-ayuTulsi">{block.text}</p>
          )}

          {block.type === "list" && (
            <ul className="ml-1  text-gray-500">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div className="flex justify-end my-2">
        <CommonButton
          type="button"
          label="Add Member"
          className="border border-ayuDark text-ayuDark hover:bg-ayuDark hover:text-white"
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <BarterMembershipForm
          open={openModal}
          handleClose={() => setOpenModal(false)}
          text={
            <>
              You will get 20% off on all bookings. <br />
              *Upgrade your membership for extra discounts, click on सदस्यत्व
              Membership
            </>
          }
        />
      )}
    </section>
  );
}

export default RelativesMembership;
