import React, { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../MembershipConstants";

const MembershipIntro = () => {
  return (
    <div className="py-8 px-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="my-5 px-4 md:px-12"
      >
        <div className="relative bg-gradient-to-br from-lime-100 to-green-100 backdrop-blur-xl rounded-2xl p-5 border border-lime-300 shadow-md overflow-hidden">
          <div className="absolute -top-8 -right-8 w-44 h-44 bg-gradient-to-br from-lime-300 via-green-300 to-lime-300 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-200 to-lime-200 rounded-full blur-2xl opacity-30 pointer-events-none" />

          <div className="relative">
            <div className="flex items-start gap-3 mb-3">
              <div className="mt-1 w-1.5 shrink-0 self-stretch bg-gradient-to-b from-lime-400 to-green-600 rounded-full" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-green-800 leading-snug">
                रोगातून आरोग्याकडे – स्वग्रामचा नैसर्गिक प्रवास
              </h3>
            </div>

            <h4 className="text-base sm:text-lg font-semibold text-green-700 mb-3 pl-4 border-l-2 border-lime-400">
              सोपी आणि व्यवहार्य वैद्यकीय सेवा
            </h4>

            <div className="space-y-3 text-xs sm:text-sm md:text-base text-green-900 leading-relaxed">
              <p>
                जन्मतः प्रत्येक मनुष्य&nbsp;
                <span className="font-semibold bg-lime-200 px-1 rounded">
                  निसर्गाशी जवळीक साधणारा आणि निसर्गमैत्री असणारा
                </span>
                &nbsp;असतो. शुद्ध निसर्ग, नैसर्गिक अन्न-पाणी आणि
                दिनचर्या-ऋतुचर्या यांच्या सहवासात राहण्याची त्याची नैसर्गिक ओढ
                असते.
              </p>
              <p>
                माणसाला&nbsp;
                <span className="font-semibold bg-lime-200 px-1 rounded">
                  एकत्र कुटुंबात राहणे, विहिरीचे पाणी पिणे, नैसर्गिक अन्न सेवन
                  करणे&nbsp;
                </span>
                आणि आयुर्वेदीय व नैसर्गिक जीवनशैलीचा अनुभव घेणे आवडते. अशा
                जीवनपद्धतीमध्ये&nbsp;
                <span className="font-semibold bg-lime-200 px-1 rounded">
                  आयुर्वेदीय गाव, घर, चिकित्सालय, आतुरालय, वनौषधि वन, गोशाला,
                  औषधिकरण
                </span>
                &nbsp;यांसारख्या व्यवस्थांचा समावेश असतो.
              </p>
              <p>
                हजारो वर्षांपासून आपल्या पिढ्यांनी&nbsp;
                <span className="font-semibold bg-lime-200 px-1 rounded">
                  १०० वर्षे निरोगी आयुष्य जगण्यासाठी आवश्यक असलेली आयुर्वेदीय
                  व नैसर्गिक जीवनशैली
                </span>
                &nbsp;जपली आहे. स्वग्राम या परंपरेला पुन्हा एकदा व्यवहारात
                आणण्याचा प्रयत्न करत आहे.
              </p>
              <p>
                आज अनेकांना&nbsp;
                <span className="font-semibold bg-lime-200 px-1 rounded">
                  नैसर्गिक जीवनशैली, एकत्र कुटुंबपद्धती और आयुर्वेदीय
                  आरोग्यव्यवस्था
                </span>
                &nbsp;अनुभवण्याची इच्छा आहे. हे सर्व अनुभव&nbsp;
                <span className="font-semibold bg-lime-200 px-1 rounded">
                  स्वग्राममध्ये प्रत्यक्ष स्वरूपात उपलब्ध
                </span>
                &nbsp;आहे. येथे समाजाला विश्वास देणारे आणि आरोग्यपूर्ण जीवनाची
                दिशा देणारे वातावरण निर्माण केले आहे.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
        className="px-4 md:px-12"
      >
        <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-xl rounded-2xl p-5 border border-yellow-300 shadow-md overflow-hidden">
          <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full blur-2xl opacity-30 pointer-events-none" />

          <div className="relative space-y-4 text-xs sm:text-sm md:text-base text-amber-900 leading-relaxed">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-amber-800">
                विशेष संधी
              </h2>
            </div>

            <div className="space-y-2 pl-2">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0 mt-0.5">
                  ➤
                </span>
                <p>
                  <span className="font-semibold">नाडी परीक्षा</span> आणि
                  वैद्य सल्ल्याद्वारे संपूर्ण कुटुंबाचे आरोग्य जपण्याची संधी
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0 mt-0.5">
                  ➤
                </span>
                <p>आयुर्वेदीय आणि नैसर्गिक जीवनशैलीचा प्रत्यक्ष अनुभव</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0 mt-0.5">
                  ➤
                </span>
                <p>शरीर, मन आणि निसर्ग यांचा संतुलित अभ्यास</p>
              </div>
            </div>

            <div className="bg-amber-100 border border-amber-200 rounded-xl p-4 space-y-2">
              <p>
                येथे&nbsp;
                <span className="font-semibold text-amber-700">
                  १० क्षेत्रांमधील २० अभ्यासक्रम
                </span>
                &nbsp;उपलब्ध आहेत, जे&nbsp;
                <span className="font-semibold text-amber-700">
                  ४ महिन्यांच्या कालावधीत
                </span>
                &nbsp;शिकवले जातात. या अभ्यासक्रमांद्वारे १०० वर्षे निरोगी
                आयुष्य जगण्यासाठी आवश्यक असलेली जीवनशैली समजून घेता येते.
              </p>
              <p>
                या प्रवासात सहभागी होताना तुम्हाला&nbsp;
                <span className="font-semibold text-amber-700">
                  अनुभवी गुरूंच्या मार्गदर्शनाखाली
                </span>
                &nbsp;शिकण्याची आणि पुढे स्वतःही ज्ञान देण्याच्या पातळीपर्यंत
                पोहोचण्याची संधी मिळू शकते.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
        className="px-4 md:px-12 mt-6"
      >
        <div className="relative bg-gradient-to-br from-green-50 to-lime-50 backdrop-blur-xl rounded-2xl p-5 border border-green-300 shadow-md overflow-hidden">
          <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-gradient-to-br from-green-300 to-lime-300 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-lime-200 to-green-300 rounded-full blur-2xl opacity-30 pointer-events-none" />

          <div className="relative space-y-4 text-xs sm:text-sm md:text-base text-green-900 leading-relaxed">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1.5 h-8 bg-gradient-to-b from-green-400 to-lime-600 rounded-full shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-green-800">
                कुटुंबासाठी आदर्श जीवनशैली
              </h2>
            </div>

            <p>
              स्वग्राम हा केवळ आरोग्याचा केंद्र नाही, तर&nbsp;
              <span className="font-semibold">
                पुढील पिढ्यांसाठी आदर्श जीवनपद्धती घडविण्याचा एक प्रयोग
              </span>
              &nbsp;आहे. येथे कुटुंबासोबत राहून नैसर्गिक, संतुलित आणि आनंदी
              जीवन जगण्याचा अनुभव घेता येतो.
            </p>

            <div className="flex items-start gap-2 bg-green-100 border border-green-200 rounded-xl px-4 py-3">
              <span className="text-green-500 font-bold text-lg shrink-0">
                ☆
              </span>
              <p className="font-semibold">
                निसर्गप्रेमी, आरोग्यसजग आणि समाजाभिमुख जीवन जगू इच्छिणाऱ्या
                प्रत्येकासाठी स्वग्राम हे एक प्रेरणादायी स्थान आहे.
              </p>
            </div>

            <div className="space-y-3">
              <p>
                एक व्यक्तीला एक <strong>कुटुंब</strong> आवश्यक असते. प्रत्येक
                कुटुंबाला <strong>एकत्र कुटुंब पद्धतीची</strong> गरज असते. अशा
                अनेक एकत्र कुटुंबांनी आपापल्या गरजा पूर्ण करण्यासाठी जेव्हा
                एकत्र येतात, तेव्हा त्यातून एक समाज निर्माण होतो. आणि असा समाज
                जेव्हा एका सामूहिक उद्देशाने एकत्र येतो, तेव्हा त्या
                समुदायातून एक ग्राम — <strong>स्वग्राम</strong> निर्माण होते.
              </p>
              <p>
                स्वग्राम ही अशी संकल्पना आहे की जिथे प्रत्येकाला&nbsp;
                <strong>आपुलकीची जागा, माहेरपणाची ऊब</strong>&nbsp;आणि&nbsp;
                <strong>सुट्टीसाठी आपलेसे घर</strong>&nbsp;मिळते. येथे
                तरुणांना जगण्याची प्रेरणा मिळते आणि ज्येष्ठांना शांत,
                आरोग्यपूर्ण जीवन जगण्याचा आधार मिळतो.
              </p>
              <p>
                कामाच्या धकाधकीने थकलेल्या मनाला आणि शरीराला&nbsp;
                <strong>स्वग्राम विश्रांती, ऊर्जा</strong>&nbsp;आणि{" "}
                <strong>आरोग्य</strong>&nbsp;प्रदान करते. येथे
                निसर्गाच्या&nbsp;सान्निध्यात राहून{" "}
                <strong>उन्हे, वारा</strong>&nbsp;<strong>आणि पावसाचा</strong>
                &nbsp;अनुभव घेत आरोग्य प्राप्त करण्याची संधी मिळते.
              </p>
              <p>
                गावातील जीवनात अनेक नैसर्गिक आणि आनंददायी अनुभव असतात.&nbsp;
                <strong>
                  विहिरीचे पाणी पिणे, झाडांवर चढणे, शेतात काम करणे, बीज
                  संवर्धन करणे
                </strong>
                , आणि निसर्गाशी पुन्हा एकदा नाते जोडणे.
              </p>
              <p>
                अशा प्रकारे अनेक कुटुंबांना&nbsp;
                <strong>
                  एकत्र आणणारे, निसर्गाशी जोडणारे आणि आरोग्यपूर्ण जीवन
                  जगण्याची प्रेरणा देणारे गाव म्हणजे स्वग्राम.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(MembershipIntro);
