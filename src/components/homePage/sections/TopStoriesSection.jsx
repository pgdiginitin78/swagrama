import React, { memo } from "react";
import { motion } from "framer-motion";
import SwagarmaMainImg from "../../assets/landing-page/swagramaMain.webp";
import StoryImg from "../../assets/landing-page/topStories/Self-Dependence Village.webp";

const TopStoriesSection = ({ setModal1, setModal2 }) => {
  const stories = [
    {
      img: SwagarmaMainImg,
      title: "स्वग्राम Community Self-Dependent Village Intro",
      text: "स्वग्राम Community is Ayurveda, Yoga, Nature, Agro, Tourism, Natural Lifestyle & Biodiversity hub. Ayurveda & Yoga Natural agriculture...",
      action: () => setModal1(true),
    },
    {
      img: StoryImg,
      title: "स्वग्राम Community Self-Dependent Village Pillars",
      text: "स्वग्राम Community is status of a complete science of life with solid philosophy & research-backed methodology...",
      action: () => setModal2(true),
    },
  ];

  return (
    <section className="py-12 sm:py-10 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-500 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-green-900 mb-8 sm:mb-12"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Top Stories
          <motion.span
            className="block h-1 w-24 sm:w-32 bg-gradient-to-r from-green-600 to-lime-500 mt-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-green-100"
            >
              <div className="w-full h-[260px] 2xl:h-[460px] overflow-hidden rounded-t-3xl">
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-green-900 mb-3">
                  {story.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
                  {story.text}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    onClick={story.action}
                    className="bg-gradient-to-r from-green-700 to-lime-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-[9px] font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Reading →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(TopStoriesSection);
