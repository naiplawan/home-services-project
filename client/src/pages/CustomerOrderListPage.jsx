import Navbar from "../components/Navbar.jsx";
import Footer from "../components/HomePage/Footer.jsx"; 
import SideNavbar from "../components/CustomerPage/SideNavbar.jsx";
import Title from "../components/CustomerPage/Title.jsx";
import OrderList from "../components/CustomerPage/OrderList.jsx";

function CustomerOrderListPage() {
  return (
    <>
      <Navbar />
      <Title title="รายการคำสั่งซ่อม" />
      <div className="h-[100%] flex justify-between px-[15vw] pt-[5vh] pb-[33vh] bg-[#f0f0f0]">
        <SideNavbar />
        <OrderList />
      </div>
      <Footer />
    </>
  );
}

export default CustomerOrderListPage;
