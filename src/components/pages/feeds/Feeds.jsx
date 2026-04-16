import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Share,
  BookmarkBorder,
  Bookmark,
  Verified,
  MoreHoriz,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

// Local WebP image imports
import mission1 from "../../assets/commune/missionSlider/mission-1.webp";
import mission2 from "../../assets/commune/missionSlider/mission-2.webp";
import mission3 from "../../assets/commune/missionSlider/mission-3.webp";
import mission4 from "../../assets/commune/missionSlider/mission-4.webp";
import mission5 from "../../assets/commune/missionSlider/mission-5.webp";
import mission6 from "../../assets/commune/missionSlider/mission-6.webp";
import mission7 from "../../assets/commune/missionSlider/mission-7.webp";
import mission8 from "../../assets/commune/missionSlider/mission-8.webp";
import mission9 from "../../assets/commune/missionSlider/mission-9.webp";
import mission10 from "../../assets/commune/missionSlider/mission-10.webp";
import mission11 from "../../assets/commune/missionSlider/mission-11.webp";
import farmMain from "../../assets/landing-page/aboutUs/organic-farm.webp";
import wellnessMain from "../../assets/landing-page/aboutUs/wellness-center.webp";
import villageMain from "../../assets/landing-page/topStories/Self-Dependence Village.webp";
import logoMain from "../../assets/landing-page/swagramaMain.webp";

const MOCK_POSTS = [
  { id: 1, author: "Dr. Rajesh Kulkarni", avatar: "https://i.pravatar.cc/150?u=in1", role: "Ayurveda Specialist", time: "2 hours ago", content: "Balancing the Pitta Dosha is crucial during these summer months. Simple Amla juice can be a life-saver for your digestive health. 🌿", image: mission1, likes: 124, isVerified: true },
  { id: 2, author: "Sridhar Patil", avatar: "https://i.pravatar.cc/150?u=in2", role: "Organic Farmer", time: "5 hours ago", content: "The monsoon harvest of our traditional rice varieties has exceeded expectations this year. Pure, pesticide-free grains for our community. 🌾", image: farmMain, likes: 82, isVerified: false },
  { id: 3, author: "Sunita Deshmukh", avatar: "https://i.pravatar.cc/150?u=in3", role: "Yoga Acharya", time: "Today at 06:30 AM", content: "A morning dedicated to Pranayama. Controlling the breath is the first step toward controlling the mind and finding inner peace. 🧘‍♀️", image: mission2, likes: 256, isVerified: true },
  { id: 4, author: "Amit Kumar", avatar: "https://i.pravatar.cc/150?u=in4", role: "Wellness Advocate", time: "Yesterday at 04:15 PM", content: "Nothing beats the freshness of cold-pressed kokum sharbat. Refreshing, natural, and local. 🥤🌅", image: mission3, likes: 110, isVerified: false },
  { id: 5, author: "Dr. Jyoti Pawar", avatar: "https://i.pravatar.cc/150?u=in5", role: "Health Researcher", time: "2 days ago", content: "Studying the effects of Brahmi on cognitive focus. The ancient texts were right. 🏺", image: mission4, likes: 198, isVerified: true },
  { id: 6, author: "Suresh Hegde", avatar: "https://i.pravatar.cc/150?u=in6", role: "Farm Manager", time: "3 days ago", content: "Sunset over the Gau Shala. Peaceful coexistence with our cattle. 🌄🐂", image: mission5, likes: 315, isVerified: false },
  { id: 7, author: "Lakshmi Narayan", avatar: "https://i.pravatar.cc/150?u=in7", role: "Community Member", time: "4 days ago", content: "Just picked these fresh turmeric roots from our backyard. Incomparable aroma. 🏺🌿", image: mission6, likes: 167, isVerified: false },
  { id: 8, author: "Vikram Singh", avatar: "https://i.pravatar.cc/150?u=in8", role: "Outdoor Specialist", time: "5 days ago", content: "Guided a group through the dense forest trail. Wisdom of the trees. 🌲", image: mission7, likes: 142, isVerified: true },
  { id: 9, author: "Kavita Rao", avatar: "https://i.pravatar.cc/150?u=in9", role: "Interior Stylist", time: "6 days ago", content: "Combining modern minimalism with traditional bamboo artifacts. Eco-friendly and aesthetic. 🧘", image: wellnessMain, likes: 289, isVerified: false },
  { id: 10, author: "Rohan Mehra", avatar: "https://i.pravatar.cc/150?u=in10", role: "Skilled Craftsman", time: "1 week ago", content: "Pottery connects you directly to the earth. 🏺✨", image: mission8, likes: 212, isVerified: true },
  { id: 11, author: "Anjali Sharma", avatar: "https://i.pravatar.cc/150?u=in11", role: "Lifestyle Blogger", time: "1 week ago", content: "Learning the art of village-style cooking using stone-grinders. Slow-cooked pulses. 🥣", image: villageMain, likes: 178, isVerified: false },
  { id: 12, author: "Pradeep Taware", avatar: "https://i.pravatar.cc/150?u=in12", role: "Village Elder", time: "2 weeks ago", content: "Reviving the ancient barter system. Strengthening social bonds. 🤝🌾", image: mission9, likes: 145, isVerified: true },
  { id: 13, author: "Manisha Suryavanshi", avatar: "https://i.pravatar.cc/150?u=in13", role: "Folk Artist", time: "2 weeks ago", content: "Storing seeds in traditional bins. Preserving our heritage. 🥨🌰", image: mission10, likes: 189, isVerified: false },
  { id: 14, author: "Santosh Mane", avatar: "https://i.pravatar.cc/150?u=in14", role: "Nature photographer", time: "3 weeks ago", content: "Mist rising from the Sahyadri valley early this morning. 🌫️🌳", image: mission11, likes: 342, isVerified: false },
  { id: 15, author: "Priyanka Joshi", avatar: "https://i.pravatar.cc/150?u=in15", role: "Community Organizer", time: "1 month ago", content: "Reflecting on our annual harvest feast. celebration through organic living. 🍱❤️", image: logoMain, likes: 412, isVerified: true }
];

function Feeds() {
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  const toggleLike = (id) =>
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleBookmark = (id) =>
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-8 lg:px-12 font-sans antialiased text-ayuDark overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Creative & Dynamic Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-2"
            >
              <div className="h-[2px] w-8 bg-ayuBrown" />
              <Typography variant="overline" className="text-ayuBrown font-black tracking-[0.4em] text-[10px]">
                SWAGRAMA VILLAGE JOURNAL
              </Typography>
            </motion.div>
            <Typography
              variant="h2"
              className="text-ayuDark font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-tight"
            >
              Living & <br/>
              <span className="text-ayuMid italic serif font-serif">Organic Wisdom</span>
            </Typography>
          </div>
          <div className="hidden md:block">
             <Typography className="text-ayuDark/40 font-bold text-[11px] uppercase tracking-widest border-l-2 border-ayuMid/20 pl-6 py-2">
                Curated insights from <br/> our dedicated communes
             </Typography>
          </div>
        </header>

        {/* Robust CSS columns-based Masonry (No horizontal/vertical empty gaps) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence>
            {MOCK_POSTS.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="break-inside-avoid mb-8"
              >
                <Card
                  elevation={0}
                  className="bg-white rounded-2xl border border-ayuHerbal/40 overflow-hidden group hover:border-ayuMid/10 hover:shadow-[0_20px_50px_-10px_rgba(74,124,44,0.08)] transition-all duration-500 flex flex-col"
                >
                  <CardHeader
                    avatar={
                      <div className="relative">
                        <Avatar
                          src={post.avatar}
                          sx={{ width: 40, height: 40 }}
                          className="border border-ayuHerbal/30"
                        />
                        {post.isVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-ayuMid/10">
                            <Verified sx={{ fontSize: 13 }} className="text-ayuMid block" />
                          </div>
                        )}
                      </div>
                    }
                    title={
                      <Typography className="font-bold text-ayuDark text-[14px] leading-tight mb-0.5">
                        {post.author}
                      </Typography>
                    }
                    subheader={
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                         <Typography className="text-ayuMid font-black text-[10px] uppercase tracking-wider">
                          {post.role}
                        </Typography>
                        <span className="text-ayuDark/20 text-[10px] hidden sm:inline">•</span>
                        <Typography className="text-ayuDark/40 font-bold text-[10px]">
                          {post.time}
                        </Typography>
                      </div>
                    }
                    action={
                      <IconButton size="small" className="text-ayuDark/10 hover:text-ayuMid mt-1">
                        <MoreHoriz fontSize="small" />
                      </IconButton>
                    }
                    className="p-6 pb-4"
                  />

                  <div className="px-6 pb-5">
                    <Typography
                      variant="body2"
                      className="text-ayuDark/80 font-medium leading-relaxed text-[13.5px]"
                    >
                      {post.content}
                    </Typography>
                  </div>

                  {post.image && (
                    <div className="px-5 mb-5 overflow-hidden">
                       <div className="relative rounded-xl overflow-hidden shadow-sm bg-ayuHerbal/5">
                        <CardMedia
                          component="img"
                          image={post.image}
                          alt={post.author}
                          className="w-full h-auto object-cover grayscale-[0.1] transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}

                  <Divider className="mx-6 opacity-40 border-ayuHerbal" />

                  <CardActions className="px-6 py-4 flex justify-between items-center bg-ayuHerbal/5">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5">
                        <IconButton
                          size="small"
                          onClick={() => toggleLike(post.id)}
                          className={`p-0 transition-transform active:scale-150 ${likedPosts[post.id] ? "text-ayuBrown" : "text-ayuDark/15 hover:text-ayuBrown/40"}`}
                        >
                          {likedPosts[post.id] ? (
                            <Favorite fontSize="small" />
                          ) : (
                            <FavoriteBorder fontSize="small" />
                          )}
                        </IconButton>
                        <Typography
                          className={`text-[11px] font-bold ${likedPosts[post.id] ? "text-ayuBrown" : "text-ayuDark/30"}`}
                        >
                          {likedPosts[post.id] ? post.likes + 1 : post.likes}
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Tooltip title="Bookmark">
                        <IconButton
                          size="small"
                          onClick={() => toggleBookmark(post.id)}
                          className={`transition-colors p-0 ${bookmarkedPosts[post.id] ? "text-ayuMid" : "text-ayuDark/15 hover:text-ayuMid/40"}`}
                        >
                          {bookmarkedPosts[post.id] ? (
                            <Bookmark fontSize="small" />
                          ) : (
                            <BookmarkBorder fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton
                          size="small"
                          className="text-ayuDark/15 hover:text-ayuMid transition-colors p-0"
                        >
                          <Share fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardActions>
                </Card>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>


      </div>
    </div>
  );
}

export default Feeds;
