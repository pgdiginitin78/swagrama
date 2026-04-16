import React, { memo } from "react";
import { Modal, Box, Typography, Chip, Divider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import SchoolIcon from "@mui/icons-material/School";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ParkIcon from "@mui/icons-material/Park";
import ScienceIcon from "@mui/icons-material/Science";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SpaIcon from "@mui/icons-material/Spa";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "90%", md: "760px", lg: "900px" },
  maxHeight: { xs: "92dvh", sm: "90vh" },
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  outline: "none",
};

const TopStoriesModals = ({ modal1, setModal1, modal2, setModal2 }) => {
  return (
    <>
      {modal1 && (
        <AnimatePresence>
          <Modal
            open={modal1}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                },
              },
            }}
          >
            <Box sx={modalBoxStyle}>
              <Box
                sx={{
                  background: "linear-gradient(to right, #15803d, #65a30d)",
                  px: { xs: 2 },
                  py: { xs: 2 },
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center gap-2 ">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    स्वग्राम Community Self-Dependent Village Intro
                  </Typography>
                  <CancelButtonModal onClick={() => setModal1(false)} />
                </div>
              </Box>
              <Box
                sx={{
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 2.5, sm: 3 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  color: "text.secondary",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    color: "#14532d",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                  }}
                >
                  <strong>Swagram Community</strong> is a hub dedicated to&nbsp;
                  <strong>
                    Ayurveda, Yoga, Nature, Agro-tourism, Natural Living, and
                    Biodiversity.
                  </strong>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                  }}
                >
                  Rooted in ancient wisdom, Ayurveda, Yoga, and Natural
                  Agriculture together represent one of the world’s earliest and
                  most holistic approaches to a natural lifestyle. This
                  integrated knowledge system promotes healthy living,
                  environmental balance, and the potential for a long and
                  fulfilling life.
                </Typography>
                <Box
                  sx={{
                    borderLeft: "4px solid #15803d",
                    bgcolor: "#f7fee7",
                    borderRadius: 2,
                    px: { xs: 2, sm: 2.5 },
                    py: 2,
                    fontStyle: "italic",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                    color: "text.primary",
                  }}
                >
                  Developed and refined over more than{" "}
                  <strong>5,000 years</strong>, it combines traditional wisdom
                  with applied science and practical techniques that can be
                  integrated into everyday life. It also includes natural
                  healing practices that support well-being while maintaining
                  harmony with nature.
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                  }}
                >
                  Swagram seeks to preserve and promote this timeless knowledge
                  by making it accessible, practical, and relevant for modern
                  living.
                </Typography>
              </Box>
            </Box>
          </Modal>
        </AnimatePresence>
      )}

      {modal2 && (
        <AnimatePresence>
          <Modal
            open={modal2}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                },
              },
            }}
          >
            <Box sx={modalBoxStyle}>
              <Box
                sx={{
                  background: "linear-gradient(to right, #15803d, #65a30d)",
                  px: { xs: 2 },
                  py: { xs: 2 },
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center gap-2 ">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    स्वग्राम — Community Self-Dependent Village Pillars
                  </Typography>
                  <CancelButtonModal onClick={() => setModal2(false)} />
                </div>
              </Box>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="overflow-y-auto flex-1 px-3 sm:px-5 py-4 flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="bg-gradient-to-r from-green-50 to-lime-50 border border-green-200 rounded-xl px-4 py-3"
                  >
                    <Typography
                      variant="body2"
                      className="!text-green-900 !text-xs sm:!text-sm !leading-relaxed"
                    >
                      <span className="font-bold">Swagram Community</span>{" "}
                      represents an integrated{" "}
                      <span className="font-bold">science of life</span>,
                      combining traditional wisdom with practical systems to
                      create a sustainable and self-reliant village ecosystem.
                      Its vision is to{" "}
                      <span className="font-bold">prevent</span>,{" "}
                      <span className="font-bold">care</span>, and{" "}
                      <span className="font-bold">cure</span>, while preserving
                      biodiversity and ensuring the well-being of society.
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-emerald-600 to-green-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <SchoolIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          01
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Swagurukul Commune
                          </Typography>
                          <Chip
                            label="Holistic Living & Knowledge"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-emerald-100 !text-emerald-800 !border-0"
                          />
                        </div>
                        <div className="mb-2 bg-white/70 border border-emerald-200 rounded-lg px-3 py-2">
                          <Typography
                            variant="caption"
                            className="!text-emerald-800 !font-semibold !italic !block !text-xs sm:!text-sm"
                          >
                            "स्वस्थस्य स्वास्थ्य रक्षणम् — रक्षणम्"
                          </Typography>
                          <Typography
                            variant="caption"
                            className="!text-emerald-700 !text-[10px] sm:!text-xs !mt-0.5 !block"
                          >
                            Protecting and strengthening the health of the
                            healthy.
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          This pillar promotes a well-consecrated lifestyle{" "}
                          <span className="font-semibold">
                            (सुसंस्कृतिजीवनविधान)
                          </span>{" "}
                          through traditional knowledge, ethical living, and
                          natural lifestyle practices that nurture balanced and
                          conscious communities.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.17,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-lime-200 bg-lime-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-lime-600 to-green-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <AgricultureIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          02
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Natural Agriculture & Local Economy
                          </Typography>
                          <Chip
                            label="Biodiversity & Self-Reliance"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-lime-100 !text-lime-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          Swagram promotes natural farming and
                          biodiversity-based agriculture as the foundation of
                          self-reliance. This includes indigenous crops, herbal
                          cultivation, and community exchange systems such as
                          barter{" "}
                          <span className="font-semibold">(सुविनिमय)</span> to
                          support local livelihoods and sustainable food
                          systems.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.24,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-teal-200 bg-teal-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-teal-600 to-emerald-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <LocalHospitalIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          03
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Integrated Natural Healthcare
                          </Typography>
                          <Chip
                            label="Swa Aturalaya System"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-teal-100 !text-teal-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed mb-2"
                        >
                          The Swa Aturalaya healthcare system focuses on
                          preventive and holistic healing through:
                        </Typography>
                        <div className="flex flex-col gap-1 mb-2 pl-1">
                          {["Ayurveda", "Yoga", "Nature-based therapies"].map(
                            (item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2"
                              >
                                <FiberManualRecordIcon className="!text-teal-600 !text-[8px]" />
                                <Typography
                                  variant="body2"
                                  className="!text-green-800 !text-xs sm:!text-sm !font-medium"
                                >
                                  {item}
                                </Typography>
                              </div>
                            ),
                          )}
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          When required, Allopathy and Homoeopathy are also
                          integrated for comprehensive care.
                        </Typography>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {[
                            "Ayurveda",
                            "Yoga",
                            "Nature Therapy",
                            "Allopathy",
                            "Homoeopathy",
                          ].map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              className="!text-[10px] !h-5 !font-medium !bg-teal-100 !text-teal-800 !border-0"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.31,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-green-200 bg-green-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-green-700 to-teal-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <ParkIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          04
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Biodiversity & Environmental Balance
                          </Typography>
                          <Chip
                            label="Ecosystem & Heritage Protection"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-green-100 !text-green-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          Swagram works to protect medicinal plants, local
                          crops, and natural ecosystems, supporting India's rich
                          biodiversity and promoting sustainable agro-tourism
                          and herbal heritage.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.38,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-lime-200 bg-lime-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-lime-700 to-emerald-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <ScienceIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          05
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Research, Innovation & Community Development
                          </Typography>
                          <Chip
                            label="Knowledge Exchange & Enterprise"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-lime-100 !text-lime-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          Swagram encourages research, knowledge exchange, and
                          community-based enterprise to strengthen traditional
                          systems like Ayurveda, Yoga, and Natural Agriculture
                          for global health and sustainability.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="bg-gradient-to-r from-green-800 to-lime-700 rounded-xl px-4 py-4"
                  >
                    <Typography
                      variant="overline"
                      className="!text-white/80 !font-bold !text-[10px] sm:!text-xs !tracking-widest !block !text-center !mb-3"
                    >
                      Foundational Philosophy
                    </Typography>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                      {[
                        {
                          icon: (
                            <SelfImprovementIcon className="!text-white !text-xl sm:!text-2xl" />
                          ),
                          label: "Yoga",
                          desc: "Purifies the mind",
                        },
                        {
                          icon: (
                            <MenuBookIcon className="!text-white !text-xl sm:!text-2xl" />
                          ),
                          label: "Sanskrit",
                          desc: "Refines knowledge and expression",
                        },
                        {
                          icon: (
                            <SpaIcon className="!text-white !text-xl sm:!text-2xl" />
                          ),
                          label: "Ayurveda",
                          desc: "Heals and balances the body",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.6 + i * 0.07,
                          }}
                          className="bg-white/15 border border-white/20 rounded-lg px-2 py-3 flex flex-col items-center gap-1 text-center"
                        >
                          {item.icon}
                          <Typography
                            variant="caption"
                            className="!text-white !font-bold !text-[11px] sm:!text-xs !leading-tight"
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="!text-green-100 !text-[9px] sm:!text-[10px] !leading-snug"
                          >
                            {item.desc}
                          </Typography>
                        </motion.div>
                      ))}
                    </div>

                    <Divider className="!border-white/20 !mb-3" />

                    <Typography
                      variant="caption"
                      className="!text-green-100 !text-[10px] sm:!text-xs !text-center !block !italic !leading-relaxed"
                    >
                      Together, they guide a natural, balanced, and sustainable
                      way of life.
                    </Typography>
                  </motion.div>
                </div>
              </motion.div>
            </Box>
          </Modal>
        </AnimatePresence>
      )}
    </>
  );
};

export default memo(TopStoriesModals);
