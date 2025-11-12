// Theme configuration for consistent design system
export const theme = {
  colors: {
    // Primary colors
    primary: {
      50: "rgb(240, 251, 255)",
      100: "rgb(224, 247, 255)",
      200: "rgb(186, 230, 253)",
      300: "rgb(125, 211, 252)",
      400: "rgb(56, 189, 248)", // cyan-400
      500: "rgb(6, 182, 212)", // cyan-500 - main brand
      600: "rgb(8, 145, 178)", // cyan-600
      700: "rgb(14, 116, 144)",
      800: "rgb(22, 78, 99)",
      900: "rgb(12, 74, 110)",
    },

    // Secondary colors (indigo)
    secondary: {
      50: "rgb(238, 242, 255)",
      100: "rgb(224, 231, 255)",
      200: "rgb(199, 210, 254)",
      300: "rgb(165, 180, 252)",
      400: "rgb(129, 140, 248)", // indigo-400
      500: "rgb(99, 102, 241)", // indigo-500
      600: "rgb(79, 70, 229)", // indigo-600 - secondary brand
      700: "rgb(67, 56, 202)",
      800: "rgb(55, 48, 163)",
      900: "rgb(49, 46, 129)",
    },

    // Accent colors (teal)
    accent: {
      400: "rgb(45, 212, 191)", // teal-400
      500: "rgb(20, 184, 166)", // teal-500
    },

    // Background colors
    background: {
      primary: "rgb(2, 6, 23)", // slate-950 - darkest
      secondary: "rgb(15, 23, 42)", // slate-900
      tertiary: "rgb(30, 41, 59)", // slate-800
      quaternary: "rgb(51, 65, 85)", // slate-700
    },

    // Text colors
    text: {
      primary: "rgb(255, 255, 255)", // white
      secondary: "rgba(255, 255, 255, 0.7)", // white/70
      tertiary: "rgba(255, 255, 255, 0.6)", // white/60
      muted: "rgba(255, 255, 255, 0.4)", // white/40
    },

    // Border colors
    border: {
      primary: "rgba(51, 65, 85, 0.3)", // slate-700/30
      secondary: "rgba(71, 85, 105, 0.3)", // slate-600/30
      accent: "rgba(6, 182, 212, 0.3)", // cyan-500/30
    },

    // Gradient definitions
    gradients: {
      primary: "from-cyan-400 via-indigo-400 to-teal-400",
      primaryDark: "from-cyan-600/80 to-indigo-600/80",
      background: "from-slate-900 via-indigo-950 to-slate-900",
      backgroundAlt: "from-slate-900 to-slate-800",
      backgroundAlt2: "from-slate-800 to-slate-900",
    },
  },

  // Consistent spacing
  spacing: {
    section: "py-20",
    container: "px-6",
    cardPadding: "p-6",
    cardPaddingLg: "p-8",
  },

  // Consistent sizing
  sizing: {
    maxWidth: "max-w-6xl",
    borderRadius: "rounded-xl",
    borderRadiusLg: "rounded-2xl",
  },

  // Animation duration
  animation: {
    duration: "duration-300",
    durationSlow: "duration-500",
    durationFast: "duration-200",
  },

  // Backdrop blur
  backdrop: {
    blur: "backdrop-blur-sm",
  },
} as const;

// Helper functions for gradient classes
export const gradientText = (gradient: keyof typeof theme.colors.gradients) =>
  `bg-gradient-to-r ${theme.colors.gradients[gradient]} bg-clip-text text-transparent`;

export const gradientBg = (gradient: keyof typeof theme.colors.gradients) =>
  `bg-gradient-to-r ${theme.colors.gradients[gradient]}`;

// Common component styles
export const cardStyles = {
  base: `${theme.sizing.borderRadius} border border-slate-700/30 ${theme.backdrop.blur} transition-all ${theme.animation.duration}`,
  primary: `bg-slate-800/50 ${theme.sizing.borderRadius} border border-slate-700/30 ${theme.backdrop.blur} transition-all ${theme.animation.duration}`,
  secondary: `bg-slate-700/30 ${theme.sizing.borderRadius} border border-slate-700/30 ${theme.backdrop.blur} transition-all ${theme.animation.duration}`,
  hover: "hover:bg-slate-700/50 hover:border-cyan-500/30",
} as const;

export const buttonStyles = {
  primary: `bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25 text-white ${theme.animation.duration}`,
  secondary: `border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:border-cyan-400 hover:text-cyan-300 ${theme.animation.duration}`,
  ghost: `text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 ${theme.animation.duration}`,
} as const;

export const tagStyles = {
  base: `inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30`,
  text: `text-cyan-300 text-sm font-medium`,
} as const;
