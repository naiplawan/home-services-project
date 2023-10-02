import Navbar from "../components/Navbar.jsx";
import Footer from "../components/HomePage/Footer.jsx"; 
import SideNavbar from "../components/CustomerPage/SideNavbar.jsx";
import Title from "../components/CustomerPage/Title.jsx";
import OrderHistory from "../components/CustomerPage/OrderHistory.jsx";

function CustomerOrderHistoryPage() {
  return (
    <>
      <Navbar />
      <Title title="ประวัติการซ่อม" />
      <div className="flex justify-between px-[15vw] pt-[5vh] pb-[33vh] bg-[#f0f0f0]">
        <SideNavbar />
        <OrderHistory />
      </div>
      <Footer />
    </>
  );
}

export default CustomerOrderHistoryPage;
