import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

export interface AnimatedBackgroundProps {
  /**
   * The type of animation to use
   */
  type?: "particles" | "gradient" | "waves" | "mesh";
  /**
   * Whether to use a blur effect
   */
  blur?: boolean;
  /**
   * The opacity of the background (0-1)
   */
  opacity?: number;
  /**
   * Custom class name for the background container
   */
  className?: string;
  /**
   * The color scheme to use
   */
  colorScheme?: "blue" | "purple" | "green" | "orange" | "red" | "gray";
  /**
   * Whether to use a dark color scheme
   */
  dark?: boolean;
  /**
   * The children to render on top of the background
   */
  children?: React.ReactNode;
  /**
   * The background image URL (optional)
   */
  backgroundImage?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  type = "particles",
  blur = true,
  opacity = 0.8,
  className = "",
  colorScheme = "blue",
  dark = false,
  children,
  backgroundImage,
}) => {
  // Define color schemes
  const colorSchemes = {
    blue: {
      primary: dark ? "#1e40af" : "#3b82f6",
      secondary: dark ? "#1e3a8a" : "#60a5fa",
      tertiary: dark ? "#172554" : "#93c5fd",
    },
    purple: {
      primary: dark ? "#7e22ce" : "#8b5cf6",
      secondary: dark ? "#581c87" : "#a78bfa",
      tertiary: dark ? "#3b0764" : "#c4b5fd",
    },
    green: {
      primary: dark ? "#15803d" : "#22c55e",
      secondary: dark ? "#166534" : "#4ade80",
      tertiary: dark ? "#14532d" : "#86efac",
    },
    orange: {
      primary: dark ? "#c2410c" : "#f97316",
      secondary: dark ? "#9a3412" : "#fb923c",
      tertiary: dark ? "#7c2d12" : "#fdba74",
    },
    red: {
      primary: dark ? "#b91c1c" : "#ef4444",
      secondary: dark ? "#991b1b" : "#f87171",
      tertiary: dark ? "#7f1d1d" : "#fca5a5",
    },
    gray: {
      primary: dark ? "#374151" : "#6b7280",
      secondary: dark ? "#1f2937" : "#9ca3af",
      tertiary: dark ? "#111827" : "#d1d5db",
    },
  };

  const colors = colorSchemes[colorScheme];

  // State to track if particles failed to load
  const [particlesError, setParticlesError] = useState(false);

  // Particles initialization
  const particlesInit = useCallback(async (engine: any) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to initialize particles:", error);
      setParticlesError(true);
    }
  }, []);

  // Set particles error if type is particles but we're in a fallback situation
  React.useEffect(() => {
    if (type === "particles") {
      // Check if tsParticles is available
      if (typeof window !== "undefined" && !window.hasOwnProperty("tsParticles")) {
        console.warn("tsParticles not available, falling back to gradient");
        setParticlesError(true);
      }
    }
  }, [type]);

  // Simplified particles configuration to improve reliability
  const particlesConfig = {
    fpsLimit: 60,
    particles: {
      number: {
        value: 50, // Reduced for better performance
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: [colors.primary, colors.secondary, colors.tertiary],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: false, // More consistent
      },
      size: {
        value: 3,
        random: true,
      },
      links: {
        enable: true,
        distance: 150,
        color: colors.secondary,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5, // Slightly slower for better performance
        direction: "none",
        random: false, // More consistent
        straight: false,
        outModes: {
          default: "out",
        },
        bounce: false,
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
    fullScreen: {
      enable: false, // Important: disable fullscreen mode
    },
  };

  // Enhanced gradient animation variants
  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 15, // Slightly faster
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Wave animation variants
  const waveVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  // Render the appropriate background based on type
  const renderBackground = () => {
    switch (type) {
      case "particles":
        // If particles failed to load, fall back to gradient
        if (particlesError) {
          return (
            <motion.div
              className="absolute inset-0"
              variants={gradientVariants}
              animate="animate"
              style={{
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary}, ${colors.secondary})`,
                backgroundSize: "400% 400%",
              }}
            />
          );
        }
        
        return (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesConfig as any}
            className="absolute inset-0"
          />
        );
      case "gradient":
        return (
          <motion.div
            className="absolute inset-0"
            variants={gradientVariants}
            animate="animate"
            style={{
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary}, ${colors.secondary})`,
              backgroundSize: "400% 400%",
              opacity: backgroundImage ? 0.4 : 1, // Make gradient semi-transparent if there's a background image
            }}
          />
        );
      case "waves":
        return (
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            animate={waveVariants}
          >
            <svg
              className="absolute bottom-0 left-0 w-full h-64 transform translate-y-1/4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill={colors.primary}
                fillOpacity="0.5"
                d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
              <path
                fill={colors.secondary}
                fillOpacity="0.5"
                d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </motion.div>
        );
      case "mesh":
        return (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${colors.tertiary} 1px, transparent 1px), radial-gradient(${colors.secondary} 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              backgroundPosition: "0 0, 20px 20px",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0px 0px", "40px 40px"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: dark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
          opacity: backgroundImage ? opacity * 0.7 : opacity, // Reduce opacity when there's a background image
          backdropFilter: blur ? "blur(8px)" : undefined,
        }}
      />

      {/* Animated background */}
      {renderBackground()}

      {/* Content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
};
