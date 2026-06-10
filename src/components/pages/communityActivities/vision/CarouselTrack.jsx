import { useEffect, useRef } from "react";

const CarouselSlider = ({ images }) => {
  const outerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const track = document.createElement("div");
    track.style.cssText = "display:flex;flex-wrap:nowrap;width:max-content;";

    const allImages = [...images, ...images];
    allImages.forEach((src, i) => {
      const wrap = document.createElement("div");
      wrap.style.cssText =
        "flex-shrink:0;margin-right:16px;border-radius:12px;overflow:hidden;width:280px;height:200px;border:1px solid rgba(139,195,74,0.3);box-shadow:0 2px 8px rgba(0,0,0,0.08);";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;display:block;";
      wrap.appendChild(img);
      track.appendChild(wrap);
    });

    outer.appendChild(track);

    let x = 0;
    let rafId;
    const itemWidth = 280 + 16;
    const resetAt = -(itemWidth * images.length);

    const animate = () => {
      x -= 0.6;
      if (x <= resetAt) x = 0;
      track.style.transform = `translateX(${Math.round(x)}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      outer.removeChild(track);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "24px 0",
        background: "linear-gradient(to bottom, #e8f5e9, #c8e6c9)",
        borderBottom: "1px solid rgba(139,195,74,0.2)",
      }}
      ref={outerRef}
    />
  );
};

export default CarouselSlider;
