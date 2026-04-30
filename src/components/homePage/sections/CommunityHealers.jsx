import { MedicalServices } from "@mui/icons-material";
import { Card, Container } from "@mui/material";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import { cardVariants, containerVariants, healers } from "../HomePageConstants";
import DoctorIcon from "../../../assets/communityHealers.svg";


const CommunityHealers = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen py-5 px-4 sm:px-6 lg:px-8">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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

          <h1 className="font-bold text-gray-800 text-3xl">
            Our Community Healers
          </h1>

          <p className="text-[#6B7280] mt-2 max-w-2xl mx-auto text-base text-center">
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
          {healers.map((healer) => (
            <motion.div
              key={healer.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onHoverStart={() => setHoveredId(healer.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Card
                className="h-full overflow-hidden border"
                sx={{
                  borderRadius: 3,
                  boxShadow:
                    hoveredId === healer.id
                      ? "0 20px 40px rgba(0,0,0,0.15)"
                      : "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.3s ease",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "1px solid brown",
                }}
              >
                <div className="relative">
                  <div className="relative h-56 2xl:h-72">
                    <motion.img
                      src={healer.image}
                      alt={healer.name}
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" /> */}
                  </div>

                  <div className="mt-5 pb-4 px-6 text-center">
                    <p className="font-bold text-gray-800 mb-2 whitespace-nowrap">
                      {healer.name}
                    </p>
                    <p className="text-gray-600 font-medium">
                      {healer.specialty}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredId === healer.id ? "60px" : "40px",
                      }}
                      transition={{ duration: 0.3 }}
                      className="mx-auto mt-4 h-1 rounded-full"
                      style={{ backgroundColor: healer.color }}
                    />
                  </div>
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
