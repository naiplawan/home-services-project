import "../src/styles/index.css";
import localFont from "next/font/local";
import PropTypes from "prop-types";

const prompt = localFont({
  src: [
    { path: "../public/Prompt Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/Prompt-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-prompt",
  display: "swap",
});

/* eslint-disable react-refresh/only-export-components */

export const metadata = {
  title: "Home Services",
  description: "บริการดูแลและซ่อมแซมบ้านโดยทีมช่างมืออาชีพ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} min-h-screen font-prompt`}>{children}</body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node.isRequired };
