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
      <div className="flex flex-col gap-6 bg-[#f0f0f0] px-4 py-8 md:flex-row md:justify-between md:px-[8vw] md:pt-[5vh] md:pb-[20vh] xl:px-[15vw] xl:pb-[33vh]">
        <SideNavbar />
        <OrderHistory />
      </div>
      <Footer />
    </>
  );
}

export default CustomerOrderHistoryPage;
