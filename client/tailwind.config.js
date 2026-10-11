/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        blue100: "#E7EEFF", blue200: "#D2DFFC", blue300: "#A6BFFA", blue400: "#799FF7",
        blue500: "#4C7FF4", blue600: "#336DF2", blue700: "#1852D6", blue800: "#0E3FB0",
        blue900: "#022B87", blue950: "#001C59", grey100: "#EFEFF2", grey200: "#E6E7EB",
        grey300: "#CCD0D7", grey400: "#B3B8C4", grey500: "#9AA1B0", grey600: "#80899C",
        grey700: "#646C80", grey800: "#4B5160", grey900: "#323640", grey950: "#232630",
        purple100: "#ECE6FF", purple900: "#4512B4", yellow100: "#FFF3D4", yellow900: "#6E5000",
        green100: "#DFF9F6", green900: "#00596C", black: "#000000", white: "#FFFFFF",
        red: "#C82438", bg: "#F3F4F7", pink: "rgb(252 231 243)", lime: "rgb(236 252 203)",
        amber: "rgb(254 243 199)", brown: "rgb(154 52 18)", stone: "rgb(120 113 108)", cyan: "rgb(14 116 144)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
