
import Navbar from "../../components/Navbar";
import Slogan from "/src/components/Homepage/Slogan.jsx";
import TopServices from "/src/components/HomePage/TopServices.jsx";
import ForJob from "/src/components/HomePage/ForJob.jsx";
import Footer from "/src/components/HomePage/Footer.jsx";
// import LogoutMock from "../components/LogoutMock.jsx";


function Homepage() {
  return (
    <div className="prompt">
      <div className="components">
        <Navbar />
        <LogoutMock />
        <Slogan />
        <LogoutMock />
        <TopServices />
        <ForJob />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
