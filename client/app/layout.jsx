import "../src/styles/index.css";
import "../src/styles/App.css";
import PropTypes from "prop-types";

/* eslint-disable react-refresh/only-export-components */

export const metadata = {
  title: "Home Services",
  description: "บริการดูแลและซ่อมแซมบ้านโดยทีมช่างมืออาชีพ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node.isRequired };
