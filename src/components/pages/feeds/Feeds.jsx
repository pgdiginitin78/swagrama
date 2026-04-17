import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  Share,
  Verified,
} from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import mission1 from "../../assets/commune/missionSlider/mission-1.webp";
import mission10 from "../../assets/commune/missionSlider/mission-10.webp";
import mission11 from "../../assets/commune/missionSlider/mission-11.webp";
import mission2 from "../../assets/commune/missionSlider/mission-2.webp";
import mission3 from "../../assets/commune/missionSlider/mission-3.webp";
import mission4 from "../../assets/commune/missionSlider/mission-4.webp";
import mission5 from "../../assets/commune/missionSlider/mission-5.webp";
import mission6 from "../../assets/commune/missionSlider/mission-6.webp";
import mission7 from "../../assets/commune/missionSlider/mission-7.webp";
import mission8 from "../../assets/commune/missionSlider/mission-8.webp";
import mission9 from "../../assets/commune/missionSlider/mission-9.webp";
import farmMain from "../../assets/landing-page/aboutUs/organic-farm.webp";
import wellnessMain from "../../assets/landing-page/aboutUs/wellness-center.webp";
import logoMain from "../../assets/landing-page/swagramaMain.webp";
import villageMain from "../../assets/landing-page/topStories/Self-Dependence Village.webp";

const MOCK_POSTS = [
  {
    id: 1,
    author: "Dr. Rajesh Kulkarni",
    avatar: "https://i.pravatar.cc/150?u=in1",
    role: "Ayurveda Specialist",
    time: "2h ago",
    content:
      "Balancing the Pitta Dosha is crucial during these summer months. Simple Amla juice can be a life-saver for your digestive health.",
    image: mission1,
    likes: 124,
    isVerified: true,
  },
  {
    id: 2,
    author: "Sridhar Patil",
    avatar: "https://i.pravatar.cc/150?u=in2",
    role: "Organic Farmer",
    time: "5h ago",
    content:
      "The monsoon harvest of our traditional rice varieties has exceeded expectations this year. Pure, pesticide-free grains for our community.",
    image: farmMain,
    likes: 82,
    isVerified: false,
  },
  {
    id: 3,
    author: "Sunita Deshmukh",
    avatar: "https://i.pravatar.cc/150?u=in3",
    role: "Yoga Acharya",
    time: "06:30 AM",
    content:
      "A morning dedicated to Pranayama. Controlling the breath is the first step toward controlling the mind and finding inner peace.",
    image: mission2,
    likes: 256,
    isVerified: true,
  },
  {
    id: 4,
    author: "Amit Kumar",
    avatar: "https://i.pravatar.cc/150?u=in4",
    role: "Wellness Advocate",
    time: "Yesterday",
    content:
      "Nothing beats the freshness of cold-pressed kokum sharbat. Refreshing, natural, and local.",
    image: mission3,
    likes: 110,
    isVerified: false,
  },
  {
    id: 5,
    author: "Dr. Jyoti Pawar",
    avatar: "https://i.pravatar.cc/150?u=in5",
    role: "Health Researcher",
    time: "2d ago",
    content:
      "Studying the effects of Brahmi on cognitive focus. The ancient texts were right.",
    image: mission4,
    likes: 198,
    isVerified: true,
  },
  {
    id: 6,
    author: "Suresh Hegde",
    avatar: "https://i.pravatar.cc/150?u=in6",
    role: "Farm Manager",
    time: "3d ago",
    content: "Sunset over the Gau Shala. Peaceful coexistence with our cattle.",
    image: mission5,
    likes: 315,
    isVerified: false,
  },
  {
    id: 7,
    author: "Lakshmi Narayan",
    avatar: "https://i.pravatar.cc/150?u=in7",
    role: "Community Member",
    time: "4d ago",
    content:
      "Just picked these fresh turmeric roots from our backyard. Incomparable aroma.",
    image: mission6,
    likes: 167,
    isVerified: false,
  },
  {
    id: 8,
    author: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?u=in8",
    role: "Outdoor Specialist",
    time: "5d ago",
    content:
      "Guided a group through the dense forest trail. Wisdom of the trees.",
    image: mission7,
    likes: 142,
    isVerified: true,
  },
  {
    id: 9,
    author: "Kavita Rao",
    avatar: "https://i.pravatar.cc/150?u=in9",
    role: "Interior Stylist",
    time: "6d ago",
    content:
      "Combining modern minimalism with traditional bamboo artifacts. Eco-friendly and aesthetic.",
    image: wellnessMain,
    likes: 289,
    isVerified: false,
  },
  {
    id: 10,
    author: "Rohan Mehra",
    avatar: "https://i.pravatar.cc/150?u=in10",
    role: "Skilled Craftsman",
    time: "1w ago",
    content: "Pottery connects you directly to the earth.",
    image: mission8,
    likes: 212,
    isVerified: true,
  },
  {
    id: 11,
    author: "Anjali Sharma",
    avatar: "https://i.pravatar.cc/150?u=in11",
    role: "Lifestyle Blogger",
    time: "1w ago",
    content:
      "Learning the art of village-style cooking using stone-grinders. Slow-cooked pulses. ",
    image: villageMain,
    likes: 178,
    isVerified: false,
  },
  {
    id: 12,
    author: "Pradeep Taware",
    avatar: "https://i.pravatar.cc/150?u=in12",
    role: "Village Elder",
    time: "2w ago",
    content: "Reviving the ancient barter system. Strengthening social bonds. ",
    image: mission9,
    likes: 145,
    isVerified: true,
  },
  {
    id: 13,
    author: "Manisha Suryavanshi",
    avatar: "https://i.pravatar.cc/150?u=in13",
    role: "Folk Artist",
    time: "2w ago",
    content: "Storing seeds in traditional bins. Preserving our heritage.",
    image: mission10,
    likes: 189,
    isVerified: false,
  },
  {
    id: 14,
    author: "Santosh Mane",
    avatar: "https://i.pravatar.cc/150?u=in14",
    role: "Nature Photographer",
    time: "3w ago",
    content: "Mist rising from the Sahyadri valley early this morning. ",
    image: mission11,
    likes: 342,
    isVerified: false,
  },
  {
    id: 15,
    author: "Priyanka Joshi",
    avatar: "https://i.pravatar.cc/150?u=in15",
    role: "Community Organizer",
    time: "1mo ago",
    content:
      "Reflecting on our annual harvest feast. Celebration through organic living. ",
    image: logoMain,
    likes: 412,
    isVerified: true,
  },
];

function FeedCard({ post, liked, bookmarked, onLike, onBookmark }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-4"
    >
      <div className="bg-white border border-stone-200/80 rounded-xl overflow-hidden group hover:border-stone-300 hover:shadow-sm transition-all duration-300">
        {post.image && (
          <div className="overflow-hidden bg-stone-100">
            <img
              src={post.image}
              alt={post.author}
              className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="px-4 pt-3.5 pb-1">
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <Avatar
                  src={post.avatar}
                  sx={{ width: 30, height: 30 }}
                  className="ring-1 ring-stone-200"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-stone-800 leading-tight truncate">
                  {post.author}
                </p>
                <p className="text-[10.5px] text-stone-400 font-medium truncate">
                  {post.role} · {post.time}
                </p>
              </div>
            </div>
            <IconButton
              size="small"
              className="text-stone-300 hover:text-stone-500 shrink-0 -mt-0.5 -mr-1"
              sx={{ padding: "4px" }}
            >
              <MoreHoriz sx={{ fontSize: 16 }} />
            </IconButton>
          </div>

          <p className="text-[12.5px] text-stone-600 leading-relaxed font-normal">
            {post.content}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function Feeds() {
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  const toggleLike = (id) =>
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleBookmark = (id) =>
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-10 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-end justify-between border-b border-stone-200 pb-5">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] text-stone-400 uppercase mb-1">
              Swagrama Village Journal
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight leading-tight">
              Living &{" "}
              <em className="font-serif font-normal not-italic text-emerald-700">
                Organic Wisdom
              </em>
            </h1>
          </div>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence>
            {MOCK_POSTS.map((post) => (
              <FeedCard
                key={post.id}
                post={post}
                liked={!!likedPosts[post.id]}
                bookmarked={!!bookmarkedPosts[post.id]}
                onLike={() => toggleLike(post.id)}
                onBookmark={() => toggleBookmark(post.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Feeds;
