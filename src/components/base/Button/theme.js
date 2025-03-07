const buttonTheme = {
  base: "inline-flex items-center justify-center font-satoshi tracking-normal leading-100 transition-colors duration-200 select-none",

  variants: {
    solid: {
      primary: {
        base: "bg-accent border border-accent text-white",
        hover: "hover:border-black hover:bg-black hover:text-white",
        disabled:
          "disabled:bg-greyborder disabled:border-greyborder disabled:text-white disabled:border-greyborder cursor-not-allowed",
        focus: "focus:border-4 focus:border-black focus:outline-none",
      },
      secondary: {
        base: "bg-grey border border-accent text-accent",
        hover: "hover:border-black hover:bg-grey hover:text-black",
        disabled:
          "disabled:border-greyborder disabled:bg-grey disabled:text-greyborder cursor-not-allowed",
        focus: "focus:border-4 focus:border-black focus:outline-none",
      },
      plain: {
        base: "bg-grey border-none text-accent",
        hover: "hover:bg-grey hover:text-black",
        disabled: "text-greyborder cursor-not-allowed",
        focus: "focus:border-4 focus:border-black focus:outline-none",
      },
      danger: {
        base: "bg-error border border-red-500 text-white",
        hover: "hover:bg-red-600 hover:border-red-600",
        disabled: "bg-red-300 border-red-300 cursor-not-allowed",
        focus:
          "focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 outline-none",
      },
      success: {
        base: "bg-green-500 border border-green-500 text-white",
        hover: "hover:bg-green-600 hover:border-green-600",
        disabled: "bg-green-300 border-green-300 cursor-not-allowed",
        focus:
          "focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 outline-none",
      },
    },
    outline: {
      primary: {
        base: "bg-transparent border border-accent text-accent",
        hover: "hover:bg-accent hover:text-white",
        disabled: "border-greyborder text-greyborder cursor-not-allowed",
        focus:
          "focus:ring-2 focus:ring-accent focus:ring-opacity-50 outline-none",
      },
    },
    ghost: {
      primary: {
        base: "bg-transparent text-accent",
        hover: "hover:bg-accent/10",
        disabled: "text-greyborder cursor-not-allowed",
        focus:
          "focus:ring-2 focus:ring-accent focus:ring-opacity-50 outline-none",
      },
    },
    link: {
      primary: {
        base: "bg-transparent text-accent underline p-0",
        hover: "hover:text-black",
        disabled: "text-greyborder no-underline cursor-not-allowed",
        focus:
          "focus:ring-2 focus:ring-accent focus:ring-opacity-50 outline-none",
      },
    },
  },

  sizes: {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-6 py-3 text-small",
    md: "px-12 py-4 text-base",
    lg: "px-16 py-5 text-large",
    xl: "px-8 py-3 text-xl",
  },

  iconSpacing: {
    xs: "gap-x-1",
    sm: "gap-x-2",
    md: "gap-x-2.5",
    lg: "gap-x-3",
    xl: "gap-x-3.5",
  },

  iconOnly: {
    xs: "p-1.5",
    sm: "p-2",
    md: "p-2.5",
    lg: "p-3",
    xl: "p-3.5",
  },
};
