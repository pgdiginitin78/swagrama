import {
  Close,
  Favorite,
  FilterVintage,
  GridView,
  ViewInAr
} from "@mui/icons-material";
import {
  Backdrop,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Fab,
  IconButton,
  Slide
} from "@mui/material";
import {
  OrbitControls,
  PerspectiveCamera,
  Stars
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const maharashtrianWeddings = {
  weddings: [
    {
      id: "wed1",
      couple: "अनिरुद्ध & श्रद्धा",
      coupleSanskrit: "अनिरुद्धः श्रद्धा च",
      date: "मार्च 2024",
      venue: "पुणे",
      categories: [
        {
          id: "haldi",
          name: "हळदी",
          sanskrit: "हरिद्रा",
          color: "#fbbf24",
          photos: [
            {
              id: "h1",
              url: "https://www.bollywoodshaadis.com/img/article-2021410116461460374000.JPG",
              title: "हळदी विधी",
              sanskrit: "हरिद्रा-संस्कारः",
              desc: "महाराष्ट्रीयन हळदी विधी",
            },
            {
              id: "h2",
              url: "https://marathaheritage.com/wp-content/uploads/2024/07/haldi-blog-1024x628.jpg",
              title: "वधू तयारी",
              sanskrit: "कन्या-सज्जीकरणम्",
              desc: "नऊवारी साडीतील वधू",
            },
            {
              id: "h3",
              url: "https://images.timesnowhindi.com/photo/msid-153197475/153197475.jpg",
              title: "मेहंदी रचना",
              sanskrit: "मेहेन्दी-अलङ्कारः",
              desc: "भारतीय मेहंदी डिझाइन",
            },
          ],
        },
        {
          id: "ceremony",
          name: "विवाह",
          sanskrit: "विवाहः",
          color: "#ef4444",
          photos: [
            {
              id: "c1",
              url: "https://img.freepik.com/free-photo/amazing-look-traditional-ritual-with-fire_8353-10619.jpg?t=st=1768561801~exp=1768565401~hmac=7a228c0f45b7da49abc6f23f6e132a82d7199d9c1441a8ef6b3a29f1c071bb74&w=1480",
              title: "सप्तपदी",
              sanskrit: "सप्तपदी-गमनम्",
              desc: "सप्तपदी विवाह विधी",
            },
            {
              id: "c2",
              url: "https://t3.ftcdn.net/jpg/06/70/05/62/240_F_670056298_iXoXdsldwX0R21jTpxbBq0p7Xnyh3Gkg.jpg",
              title: "मंगलसूत्र",
              sanskrit: "मङ्गलसूत्र-धारणम्",
              desc: "मंगलसूत्र विधी",
            },
            {
              id: "c3",
              url: "https://i.pinimg.com/1200x/3d/d6/ac/3dd6accc0302ef879b9aee973907f3ee.jpg",
              title: "वरमाला",
              sanskrit: "वरमाला-आदानम्",
              desc: "वरमाला देवाणघेवाण",
            },
          ],
        },
        {
          id: "portraits",
          name: "जोडपे",
          sanskrit: "दम्पत्योः",
          color: "#84cc16",
          photos: [
            {
              id: "p1",
              url: "https://i.pinimg.com/736x/7d/2d/12/7d2d12169b96ab6901b90e871c07cbcf.jpg",
              title: "प्रेमळ क्षण",
              sanskrit: "प्रेम-क्षणः",
              desc: "महाराष्ट्रीयन विवाह जोडपे",
            },
            {
              id: "p2",
              url: "https://i.pinimg.com/474x/31/2d/1e/312d1eb27f5ee4d5b12ab5291ba8efcc.jpg",
              title: "पारंपरिक पोशाख",
              sanskrit: "पारम्परिक-वेषः",
              desc: "नऊवारी व पेशवाई पगडी",
            },
            {
              id: "p3",
              url: "https://i.pinimg.com/736x/c9/62/af/c962af1118ca04572f1ceb86e6265492.jpg",
              title: "आशीर्वाद",
              sanskrit: "आशीर्वादः",
              desc: "कुटुंबीयांचे आशीर्वाद",
            },
          ],
        },
      ],
    },
  ],
};


function PhotoCard3D({ photo, index, onClick }) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      photo.url,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        setTexture(tex);
      },
      undefined,
      (err) => console.log("Texture load error:", err)
    );
  }, [photo.url]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.3;
      meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1;

      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  if (!texture) return null;

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.2}
        roughness={0.3}
        side={THREE.DoubleSide}
      />
      {hovered && (
        <>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.2, 4.2]} />
            <meshStandardMaterial
              color="#84cc16"
              emissive="#84cc16"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </mesh>
          <pointLight
            position={[0, 0, 2]}
            intensity={2}
            color="#84cc16"
            distance={5}
          />
        </>
      )}
    </mesh>
  );
}

function Scene3D({ photos, onPhotoClick }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={10}
        maxDistance={25}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 5, 0]} intensity={1} color="#84cc16" />
      <pointLight position={[-5, 0, -5]} intensity={0.5} color="#fbbf24" />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <group ref={groupRef}>
        {photos.map((photo, index) => {
          const angle = (index / photos.length) * Math.PI * 2;
          const radius = 8;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <group
              key={photo.id}
              position={[x, 0, z]}
              rotation={[0, -angle + Math.PI / 2, 0]}
            >
              <PhotoCard3D
                photo={photo}
                index={index}
                onClick={() => onPhotoClick(photo)}
              />
            </group>
          );
        })}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <circleGeometry args={[50, 64]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

export default function ModernWeddingGallery() {
  const [view, setView] = useState("grid");
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const getAllPhotos = () => {
    const photos = [];
    maharashtrianWeddings.weddings.forEach((wedding) => {
      wedding.categories.forEach((category) => {
        category.photos.forEach((photo) => {
          photos.push({
            ...photo,
            wedding: wedding.couple,
            weddingSanskrit: wedding.coupleSanskrit,
            category: category.name,
            categorySanskrit: category.sanskrit,
            categoryColor: category.color,
          });
        });
      });
    });
    return photos;
  };

  const getFilteredPhotos = () => {
    let photos = [];
    const weddings = selectedWedding
      ? maharashtrianWeddings.weddings.filter((w) => w.id === selectedWedding)
      : maharashtrianWeddings.weddings;

    weddings.forEach((wedding) => {
      const categories = selectedCategory
        ? wedding.categories.filter((c) => c.id === selectedCategory)
        : wedding.categories;

      categories.forEach((category) => {
        category.photos.forEach((photo) => {
          photos.push({
            ...photo,
            wedding: wedding.couple,
            weddingSanskrit: wedding.coupleSanskrit,
            category: category.name,
            categorySanskrit: category.sanskrit,
            categoryColor: category.color,
          });
        });
      });
    });
    return photos;
  };

  const filteredPhotos = getFilteredPhotos();

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  useEffect(() => {
    if (view === "3d") {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-50">
      <motion.div
        style={{ opacity }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-lime-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <FilterVintage sx={{ fontSize: 40, color: "#84cc16" }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  महाराष्ट्रीय विवाह
                </h1>
                <p className="text-sm text-lime-600">Maharashtrian Weddings</p>
              </div>
            </motion.div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("grid")}
                className={`p-3 rounded-2xl transition-all ${
                  view === "grid"
                    ? "bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <GridView />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("3d")}
                className={`p-3 rounded-2xl transition-all ${
                  view === "3d"
                    ? "bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ViewInAr />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <Chip
            label="सर्व विवाह"
            onClick={() => {
              setSelectedWedding(null);
              setSelectedCategory(null);
            }}
            sx={{
              background: !selectedWedding
                ? "linear-gradient(135deg, #84cc16, #22c55e)"
                : "#fff",
              color: !selectedWedding ? "white" : "#666",
              fontWeight: 700,
              px: 2,
              py: 2.5,
              fontSize: 14,
              "&:hover": {
                background: "linear-gradient(135deg, #84cc16, #22c55e)",
                color: "white",
              },
            }}
          />
          {maharashtrianWeddings.weddings.map((wedding, i) => (
            <Chip
              key={wedding.id}
              label={wedding.couple}
              onClick={() => {
                setSelectedWedding(wedding.id);
                setSelectedCategory(null);
              }}
              sx={{
                background:
                  selectedWedding === wedding.id
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "#fff",
                color: selectedWedding === wedding.id ? "white" : "#666",
                fontWeight: 600,
                px: 2,
                py: 2.5,
                fontSize: 14,
                "&:hover": {
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                },
              }}
            />
          ))}
        </motion.div>

        {selectedWedding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {maharashtrianWeddings.weddings
              .find((w) => w.id === selectedWedding)
              ?.categories.map((cat) => (
                <Chip
                  key={cat.id}
                  label={cat.name}
                  onClick={() =>
                    setSelectedCategory(
                      cat.id === selectedCategory ? null : cat.id
                    )
                  }
                  sx={{
                    background:
                      selectedCategory === cat.id ? cat.color : "#fff",
                    color: selectedCategory === cat.id ? "white" : "#666",
                    fontWeight: 600,
                    fontSize: 13,
                    "&:hover": {
                      background: cat.color,
                      color: "white",
                    },
                  }}
                />
              ))}
          </motion.div>
        )}
      </div>

      {view === "3d" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-[600px] mx-4 mb-8 rounded-3xl overflow-hidden shadow-2xl relative"
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            border: "3px solid #84cc16",
          }}
        >
          {loading && (
            <Backdrop
              open
              sx={{
                position: "absolute",
                zIndex: 10,
                background: "rgba(0,0,0,0.8)",
              }}
            >
              <CircularProgress sx={{ color: "#84cc16" }} size={60} />
            </Backdrop>
          )}
          <Canvas shadows>
            <Suspense fallback={null}>
              <Scene3D
                photos={filteredPhotos}
                onPhotoClick={setSelectedPhoto}
              />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-lime-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
            ड्रॅग करा फिरवण्यासाठी • Drag to Rotate
          </div>
        </motion.div>
      )}

      {view === "grid" && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      "&:hover": {
                        boxShadow: `0 12px 40px ${photo.categoryColor}40`,
                      },
                      transition: "all 0.3s",
                    }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <motion.img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(photo.id);
                        }}
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: favorites.has(photo.id)
                            ? "#ef4444"
                            : "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(10px)",
                          "&:hover": {
                            background: "#84cc16",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <Favorite sx={{ color: "white", fontSize: 20 }} />
                      </IconButton>

                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Chip
                          label={photo.wedding}
                          size="small"
                          sx={{
                            background: "rgba(0,0,0,0.8)",
                            backdropFilter: "blur(10px)",
                            color: "#84cc16",
                            fontWeight: 700,
                            fontSize: 11,
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 mb-1 text-sm">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-lime-600 mb-1 italic">
                        {photo.sanskrit}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {photo.desc}
                      </p>
                      <Chip
                        label={photo.category}
                        size="small"
                        sx={{
                          background: photo.categoryColor,
                          color: "white",
                          fontSize: 10,
                          height: 22,
                          mt: 1.5,
                          fontWeight: 600,
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      <Dialog
        open={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        PaperProps={{
          sx: {
            borderRadius: 5,
            background: "linear-gradient(135deg, #fefce8, #ecfccb)",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          {selectedPhoto && (
            <>
              <IconButton
                onClick={() => setSelectedPhoto(null)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "rgba(0,0,0,0.8)",
                  color: "white",
                  zIndex: 10,
                  "&:hover": {
                    background: "#ef4444",
                    transform: "rotate(90deg)",
                  },
                }}
              >
                <Close />
              </IconButton>

              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full max-h-[50vh] object-contain bg-gradient-to-br from-lime-900 to-green-900"
              />

              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <Chip
                    label={selectedPhoto.category}
                    sx={{
                      background: selectedPhoto.categoryColor,
                      color: "white",
                      fontWeight: 700,
                    }}
                  />
                  <Chip
                    label={selectedPhoto.wedding}
                    sx={{ fontWeight: 600 }}
                  />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedPhoto.title}
                </h2>
                <p className="text-xl text-lime-600 mb-3 italic">
                  {selectedPhoto.sanskrit}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {selectedPhoto.desc}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Fab
          sx={{
            background: "linear-gradient(135deg, #84cc16, #22c55e)",
            color: "white",
            width: 64,
            height: 64,
            "&:hover": {
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              transform: "scale(1.1) rotate(10deg)",
            },
          }}
        >
          <Favorite sx={{ fontSize: 28 }} />
          {favorites.size > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {favorites.size}
            </span>
          )}
        </Fab>
      </motion.div>
    </div>
  );
}
