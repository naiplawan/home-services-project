import Navbar from "../components/Navbar.jsx";
import Footer from "../components/HomePage/Footer.jsx"; 
import SideNavbar from "../components/CustomerPage/SideNavbar.jsx";
import Title from "../components/CustomerPage/Title.jsx";
import RepairList from "../components/CustomerPage/RepairList.jsx";

function CustomerServiceListPage() {
  return (
    <>
      <Navbar />
      <Title title="รายการคำสั่งซ่อม" />
      <div className="flex justify-between px-[15vw] py-[2vw] bg-[#f0f0f0]">
        <SideNavbar />
        <RepairList />
      </div>
      <Footer />
    </>
  );
}

export default CustomerServiceListPage;
