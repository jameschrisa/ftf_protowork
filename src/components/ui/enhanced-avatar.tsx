import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export type AvatarStyle = 
  | "lorelei" 
  | "bottts" 
  | "avataaars" 
  | "micah" 
  | "pixel-art" 
  | "identicon" 
  | "notionists" 
  | "open-peeps" 
  | "personas" 
  | "thumbs";

export interface EnhancedAvatarProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, 'style'> {
  name?: string;
  email?: string;
  avatarUrl?: string;
  status?: "online" | "offline" | "away" | "busy" | "none";
  avatarStyle?: AvatarStyle;
  seed?: string;
  animated?: boolean;
}

/**
 * Generate a DiceBear avatar URL
 * Using the DiceBear API directly instead of the library to avoid type issues
 */
const generateDiceBearAvatar = (
  seed: string,
  avatarStyle: AvatarStyle = "lorelei"
): string => {
  // Ensure the seed is URL-safe
  const safeSeed = encodeURIComponent(seed);
  return `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${safeSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
};

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  none: "hidden",
};

export const EnhancedAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  EnhancedAvatarProps
>(
  (
    {
      className,
      name,
      email,
      avatarUrl,
      status = "none",
      avatarStyle = "lorelei",
      seed,
      animated = true,
      ...props
    },
    ref
  ) => {
    // Generate a seed from name or email if not provided
    const finalSeed = seed || name || email || "avatar";
    
    // Use provided URL or generate a DiceBear avatar URL
    const finalAvatarUrl = avatarUrl || generateDiceBearAvatar(finalSeed, avatarStyle);

    // Generate initials from name
    const initials = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "??";

    const avatarVariants = {
      initial: { scale: 0.9, opacity: 0.8 },
      hover: { 
        scale: 1.05, 
        opacity: 1,
        boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
        transition: { duration: 0.3 }
      },
      tap: { scale: 0.95 },
    };

    // Pulse animation for status indicator
    const statusVariants = {
      online: {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };

    const AvatarWrapper = animated ? motion.div : React.Fragment;
    const wrapperProps = animated
      ? {
          initial: "initial",
          whileHover: "hover",
          whileTap: "tap",
          variants: avatarVariants,
          className: "relative",
        }
      : {};

    return (
      <AvatarWrapper {...wrapperProps}>
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            animated && "transition-all duration-300 shadow-sm hover:shadow-md",
            className
          )}
          {...props}
        >
          <AvatarPrimitive.Image
            src={finalAvatarUrl}
            alt={name || "Avatar"}
            className={cn("aspect-square h-full w-full", animated && "transition-opacity")}
          />
          <AvatarPrimitive.Fallback
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full",
              "bg-gradient-to-br from-primary/80 to-primary text-primary-foreground"
            )}
          >
            {initials}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        {status !== "none" && (
          <motion.span
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
              statusColors[status]
            )}
            variants={statusVariants}
            animate={status === "online" ? "online" : undefined}
          />
        )}
      </AvatarWrapper>
    );
  }
);

EnhancedAvatar.displayName = "EnhancedAvatar";
