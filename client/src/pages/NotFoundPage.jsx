/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import "./App.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-center font-semibold  text-blue950">
        {" "}
        Sorry, Page Not Found.
      </h1>
      <h2
        className="text-center font-bold text-8xl text-white pt-5 tracking-widest"
        css={css`
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: #001c59;
          text-shadow: 3px 3px #001c59;
        `}
      >
        {" "}
        404
      </h2>
      <p className="text-center text-blue950 pt-5 pb-7">
        {" "}
        We can't find the page you are looking for.
      </p>
      <button
        className="border hover:opacity-70 border-blue950 px-5 py-2 rounded-lg text-blue950"
        onClick={() => navigate("/")}
      >
        <span className="text-lg ">👨‍🔧 GO HOME 👩‍🔧</span>
      </button>
    </div>
  );
}
export default NotFoundPage;