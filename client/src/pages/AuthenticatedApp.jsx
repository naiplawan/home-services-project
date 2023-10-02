import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminCategoryPage from "./AdminCategoryPage.jsx";
import AdminServicePage from "./AdminServicePage.jsx";
import AdminCreateCategory from "./AdminCreateCategory.jsx";
import AdminDetailCategory from "./AdminDetailCategory.jsx";
import AdminEditServicePage from "./AdminEditServicePage.jsx";
import AdminDetailServicePage from "./AdminDetailServicePage.jsx";
import AdminEditCategory from "./AdminEditCategory.jsx";
import AdminCreateServicePage from "./AdminCreateServicePage.jsx";
import CustomerServiceListDisplay from "./CustomerServiceListDisplay.jsx";
import AllStepCheckOutForm from "./AllStepCheckOutForm.jsx";
import CustomerOrderListPage from "./CustomerOrderListPage.jsx";
import CustomerOrderHistoryPage from "./CustomerOrderHistoryPage.jsx";
import AdminCreatPromotionPage from "./AdminCreatePromoPage.jsx";
import AdminPromotionPage from "./AdminPromotionPage.jsx";
import AdminEditPromoPage from "./AdminEditPromoPage.jsx";
import AdminPromoDetailPage from "./AdminDetailPromoPage.jsx";
import PromotionMockUpPage from "./PromotionMockUpPage.jsx";
import ProfilePage from "./ProfilePage.jsx";

function AuthenticatedApp() {
  const loginRole = localStorage.getItem("role");

  return (
    <div className="App">
      {loginRole === "admin" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin-category" element={<AdminCategoryPage />} />
          <Route path="/admin-service" element={<AdminServicePage />} />
          <Route
            path="/admin-category-create"
            element={<AdminCreateCategory />}
          />
          <Route
            path="/admin-service-create"
            element={<AdminCreateServicePage />}
          />
          <Route
            path="/admin-service-edit/:serviceId"
            element={<AdminEditServicePage />}
          />
          <Route
            path="/admin-service-detail/:serviceId"
            element={<AdminDetailServicePage />}
          />
          <Route
            path="/admin-category-detail/:categoryId"
            element={<AdminDetailCategory />}
          />
          <Route
            path="/admin-category-edit/:categoryId"
            element={<AdminEditCategory />}
          />
          <Route path="" element={<NotFoundPage />} />
          <Route
            path="/admin-promotion-create"
            element={<AdminCreatPromotionPage />}
          />
          <Route path="/admin-promotion" element={<AdminPromotionPage />} />
          <Route
            path="/admin-promotion-edit/:promotionId"
            element={<AdminEditPromoPage />}
          />
          <Route
            path="/admin-promotion-detail/:promotionId"
            element={<AdminPromoDetailPage />}
          />
          <Route
            path="/services-list"
            element={<CustomerServiceListDisplay />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="" element={<NotFoundPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/services-list"
            element={<CustomerServiceListDisplay />}
          />
          <Route
            path="/checkout/:serviceId"
            element={<AllStepCheckOutForm />}
          />
          <Route
            path="/customer-ordered-list/:userId"
            element={<CustomerOrderListPage />}
          />

          <Route
            path="/customer-ordered-history/:userId"
            element={<CustomerOrderHistoryPage />}
          />
          <Route
            path="/customer-promotion"
            element={<PromotionMockUpPage/>}
          />
        </Routes>
      )}
    </div>
  );
}
export default AuthenticatedApp;
