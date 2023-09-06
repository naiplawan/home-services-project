import Navbar from "/src/components/Homepage/Navbar.jsx";
import Slogan from "/src/components/Homepage/Slogan.jsx";
import TopServices from "/src/components/HomePage/TopServices.jsx";
import ForJob from "/src/components/HomePage/ForJob.jsx";
import Footer from "/src/components/HomePage/Footer.jsx";


function Homepage() {
  return (
    <div className="prompt">
      <div className="">
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
