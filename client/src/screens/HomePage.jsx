import Navbar from "../components/Navbar.jsx";
import Slogan from "../components/HomePage/Slogan.jsx";
import TopServices from "../components/HomePage/TopServices.jsx";
import ForJob from "../components/HomePage/ForJob.jsx";
import Footer from "../components/HomePage/Footer.jsx";


function Homepage() {
  return (
    <div className="prompt">
      <div>
        <Navbar />
        <Slogan />
        <TopServices />
        <ForJob />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
