import Navbar from "../components/NavBar.jsx";
import Slogan from "/src/components/Homepage/Slogan.jsx";
import TopServices from "/src/components/HomePage/TopServices.jsx";
import ForJob from "/src/components/HomePage/ForJob.jsx";
import Footer from "/src/components/HomePage/Footer.jsx";
import LogoutMock from "../components/LogoutMock";

function Homepage() {
  return (
    <div className="prompt">
      <div>
        <Navbar />
        {/* <LogoutMock /> */}
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
