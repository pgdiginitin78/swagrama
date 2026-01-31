/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ayuDark: "#263d21",
        ayuMid: "#4a7c2c",
        ayuLight: "#8fbc8f",
        ayuBrown: "#882E2E",
        ayuTulsi: "#3f6b4f",
        ayuTulsiDark: "#263d21",
        ayuHerbal: "#e8f3e8",
        ayuSaffron: "#f4b860",
        ayuMysticBlue: "#4F5FFF",
        ayuOrange: "#d4731c",
        ayuLightBlue: "#4a90a4",
        gold:"#FFD700",

        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#3b82f6",
        background: "#ffffff",
        foreground: "#0f172a",

        primary: {
          DEFAULT: "#0f172a",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        
        sidebar: {
          DEFAULT: "#f8fafc",
          foreground: "#0f172a",
          primary: "#0f172a",
          "primary-foreground": "#f8fafc",
          accent: "#f1f5f9",
          "accent-foreground": "#0f172a",
          border: "#e5e7eb",
          ring: "#3b82f6",
        },
        forest: {
          DEFAULT: "#1a4d2e", 
          light: "#2d6a4f", 
        },
        lime: {
          DEFAULT: "#b8e986", 
          light: "#d4f1c5", 
        },
        earth: {
          DEFAULT: "#8b4513", 
          light: "#a0522d", 
        },
        cream: {
          DEFAULT: "#faf8f3",
          dark: "#f5f1e8",
        },
      },
      backgroundImage: {
        "gradient-forest": "linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%)",
        "gradient-earth": "linear-gradient(135deg, #8b4513 0%, #a0522d 100%)",
        "gradient-lime": "linear-gradient(135deg, #b8e986 0%, #d4f1c5 100%)",
        footerBg:
          "linear-gradient(135deg, #f0e6d2 0%, #e8dcc4 25%, #d4c5a9 50%, #e8dcc4 75%, #f0e6d2 100%)",
      },
      boxShadow: {
        nature: "0 10px 40px -10px rgba(26, 77, 46, 0.3)",
        earth: "0 10px 40px -10px rgba(139, 69, 19, 0.3)",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
