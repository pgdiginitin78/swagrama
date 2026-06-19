import { Card, Container } from "@mui/material";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import DoctorIcon from "../../../assets/communityHealers.svg";
import { cardVariants, containerVariants, healers } from "../HomePageConstants";

const CommunityHealers = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="py-5 px-4 sm:px-6 lg:px-8 2xl:px-0 ">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4"
          >
            <img src={DoctorIcon} alt="Doctor Icon" className="h-10 w-10" />
          </motion.div>

          <h1 className="font-bold text-gray-900 text-4xl  tracking-tight mb-4">
            Our Community Healers
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Dedicated practitioners bringing together Ayurveda, Yoga,
            Homoeopathy & Modern Medicine
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {healers.map((healer,index) => (
            <motion.div
              key={healer.id}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              onHoverStart={() => setHoveredId(healer.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative"
            >
              <Card
                className="relative h-[350px] 2xl:h-[450px] overflow-hidden group cursor-pointer"
                sx={{
                  borderRadius: "24px",
                  border: "none",
                  boxShadow:
                    hoveredId === healer.id
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      : "0 10px 20px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <motion.img
                  src={healer.image}
                  alt={healer.name}
                  className={`absolute inset-0 w-full h-full object-cover `}
                  animate={{
                    scale: hoveredId === healer.id ? 1.1 : 1,
                    filter:
                      hoveredId === healer.id
                        ? "brightness(0.9)"
                        : "brightness(1)",
                  }}
                  transition={{ duration: 0.6 }}
                />

          

         
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center">
                  <motion.h3
                    className="text-white text-lg font-bold mb-1 tracking-tight leading-tight"
                    animate={{ y: hoveredId === healer.id ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {healer.name}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 text-sm font-medium tracking-wide uppercase"
                    animate={{ y: hoveredId === healer.id ? -4 : 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {healer.specialty}
                  </motion.p>

                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: hoveredId === healer.id ? "40px" : "0px",
                      opacity: hoveredId === healer.id ? 1 : 0,
                    }}
                    className="h-1 bg-emerald-500 rounded-full mt-2"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};

export default memo(CommunityHealers);
