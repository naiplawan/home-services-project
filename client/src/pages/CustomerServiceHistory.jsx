import Navbar from "../components/Navbar.jsx";
import Footer from "../components/HomePage/Footer.jsx"; 
import SideNavbar from "../components/CustomerPage/SideNavbar.jsx";
import Title from "../components/CustomerPage/Title.jsx";
import ListHistory from "../components/CustomerPage/ListHistory.jsx";

function CustomerServiceHistoryPage() {
  return (
    <>
      <Navbar />
      <Title title="ประวัติการซ่อม" />
      <div className="flex justify-between px-[15vw] py-[6vh] bg-[#f0f0f0]">
        <SideNavbar />
        <ListHistory />
      </div>
      <Footer />
    </>
  );
}

export default CustomerServiceHistoryPage;
