import * as React from "react";
import { cn } from "../../lib/utils";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// Define simple fallback spinner animations inline to avoid import issues
const fallbackSpinnerCircular = {
  v: "5.7.8",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "Circle",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] },
      p: { a: 0, k: [50, 50, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [{
      ty: "gr",
      it: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } },
        { ty: "st", c: { a: 0, k: [0.2, 0.4, 1, 1] }, w: { a: 0, k: 8 }, d: [{ v: { a: 0, k: 50 } }, { v: { a: 0, k: 50 } }] },
        { ty: "tr", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } }
      ]
    }]
  }]
};

const fallbackSpinnerDots = {
  v: "5.7.8",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Dot 1",
      ks: {
        p: { a: 0, k: [30, 50, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100, 100] }, { t: 20, s: [150, 150, 100] }, { t: 40, s: [100, 100, 100] }] }
      },
      shapes: [{ ty: "el", s: { a: 0, k: [16, 16] }, p: { a: 0, k: [0, 0] } }]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Dot 2",
      ks: {
        p: { a: 0, k: [50, 50, 0] },
        s: { a: 1, k: [{ t: 10, s: [100, 100, 100] }, { t: 30, s: [150, 150, 100] }, { t: 50, s: [100, 100, 100] }] }
      },
      shapes: [{ ty: "el", s: { a: 0, k: [16, 16] }, p: { a: 0, k: [0, 0] } }]
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Dot 3",
      ks: {
        p: { a: 0, k: [70, 50, 0] },
        s: { a: 1, k: [{ t: 20, s: [100, 100, 100] }, { t: 40, s: [150, 150, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [{ ty: "el", s: { a: 0, k: [16, 16] }, p: { a: 0, k: [0, 0] } }]
    }
  ]
};

// Try to import the JSON files, but use fallbacks if they fail
let spinnerCircular, spinnerDots, spinnerPulse, spinnerBars;

try {
  // @ts-ignore - JSON imports
  spinnerCircular = require("./lottie/spinner-circular.json");
} catch (e) {
  console.warn("Failed to load spinner-circular.json, using fallback", e);
  spinnerCircular = fallbackSpinnerCircular;
}

try {
  // @ts-ignore - JSON imports
  spinnerDots = require("./lottie/spinner-dots.json");
} catch (e) {
  console.warn("Failed to load spinner-dots.json, using fallback", e);
  spinnerDots = fallbackSpinnerDots;
}

try {
  // @ts-ignore - JSON imports
  spinnerPulse = require("./lottie/spinner-pulse.json");
} catch (e) {
  console.warn("Failed to load spinner-pulse.json, using fallback", e);
  spinnerPulse = fallbackSpinnerCircular; // Use circular as fallback
}

try {
  // @ts-ignore - JSON imports
  spinnerBars = require("./lottie/spinner-bars.json");
} catch (e) {
  console.warn("Failed to load spinner-bars.json, using fallback", e);
  spinnerBars = fallbackSpinnerDots; // Use dots as fallback
}

export type SpinnerStyle = "circular" | "dots" | "pulse" | "bars";

export interface EnhancedSpinnerProps {
  /**
   * The style of the spinner animation
   */
  style?: SpinnerStyle;
  /**
   * The size of the spinner in pixels
   */
  size?: number;
  /**
   * Custom class name for the spinner container
   */
  className?: string;
  /**
   * Text to display below the spinner
   */
  text?: string;
  /**
   * Whether to show a pulsing effect
   */
  pulse?: boolean;
  /**
   * Custom Lottie animation data
   */
  customAnimation?: any;
  /**
   * Animation speed (1 is normal speed)
   */
  speed?: number;
  /**
   * Whether to show a backdrop behind the spinner
   */
  backdrop?: boolean;
}

export const EnhancedSpinner: React.FC<EnhancedSpinnerProps> = ({
  style = "circular",
  size = 48,
  className,
  text,
  pulse = false,
  customAnimation,
  speed = 1,
  backdrop = false,
}) => {
  // Select the appropriate animation based on style
  const getAnimationData = () => {
    if (customAnimation) return customAnimation;
    
    switch (style) {
      case "dots":
        return spinnerDots;
      case "pulse":
        return spinnerPulse;
      case "bars":
        return spinnerBars;
      case "circular":
      default:
        return spinnerCircular;
    }
  };

  const animationData = getAnimationData();

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {backdrop && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center">
            <motion.div
              animate={pulse ? { scale: [0.96, 1.04, 0.96] } : {}}
              transition={pulse ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
              style={{ width: size, height: size }}
            >
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: size, height: size }}
              />
            </motion.div>
            {text && (
              <p className="mt-4 text-sm text-center text-muted-foreground">{text}</p>
            )}
          </div>
        </div>
      )}
      
      {!backdrop && (
        <>
          <motion.div
            animate={pulse ? { scale: [0.96, 1.04, 0.96] } : {}}
            transition={pulse ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
            style={{ width: size, height: size }}
          >
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: size, height: size }}
            />
          </motion.div>
          {text && (
            <p className="mt-2 text-sm text-center text-muted-foreground">{text}</p>
          )}
        </>
      )}
    </div>
  );
};

/**
 * Enhanced Progress Bar component with animations
 */
export interface EnhancedProgressProps {
  /**
   * The current progress value (0-100)
   */
  value?: number;
  /**
   * Custom class name for the progress container
   */
  className?: string;
  /**
   * Whether to show a pulsing effect when not complete
   */
  pulse?: boolean;
  /**
   * Whether to show a shimmer effect
   */
  shimmer?: boolean;
  /**
   * Whether to show the percentage text
   */
  showPercentage?: boolean;
  /**
   * Custom color for the progress bar (tailwind class)
   */
  color?: string;
  /**
   * Text to display below the progress bar
   */
  text?: string;
  /**
   * Whether to show a gradient effect
   */
  gradient?: boolean;
}

export const EnhancedProgress: React.FC<EnhancedProgressProps> = ({
  value = 0,
  className,
  pulse = false,
  shimmer = false,
  showPercentage = false,
  color,
  text,
  gradient = false,
}) => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  const isComplete = clampedValue === 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
        <motion.div
          className={cn(
            "h-full rounded-full",
            gradient ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" : color || "bg-primary",
            shimmer && "after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer"
          )}
          style={{ width: `${clampedValue}%` }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${clampedValue}%`,
            ...(pulse && !isComplete ? { opacity: [0.7, 1, 0.7] } : {})
          }}
          transition={{ 
            width: { duration: 0.5, ease: "easeOut" },
            opacity: pulse ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : undefined
          }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        {text && <p className="text-xs text-muted-foreground">{text}</p>}
        {showPercentage && (
          <p className="text-xs font-medium">{Math.round(clampedValue)}%</p>
        )}
      </div>
    </div>
  );
};
