"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "./contexts/authentication.jsx";
import { RouteParamsProvider } from "./routing/navigation.jsx";
import AdminCategoryPage from "./screens/AdminCategoryPage.jsx";
import AdminCreateCategory from "./screens/AdminCreateCategory.jsx";
import AdminCreateServicePage from "./screens/AdminCreateServicePage.jsx";
import AdminCreatPromotionPage from "./screens/AdminCreatePromoPage.jsx";
import AdminDashboard from "./screens/AdminDashboard.jsx";
import AdminDetailCategory from "./screens/AdminDetailCategory.jsx";
import AdminDetailServicePage from "./screens/AdminDetailServicePage.jsx";
import AdminEditCategory from "./screens/AdminEditCategory.jsx";
import AdminEditPromoPage from "./screens/AdminEditPromoPage.jsx";
import AdminEditServicePage from "./screens/AdminEditServicePage.jsx";
import AdminPromotionPage from "./screens/AdminPromotionPage.jsx";
import AdminPromoDetailPage from "./screens/AdminDetailPromoPage.jsx";
import AdminServicePage from "./screens/AdminServicePage.jsx";
import AllStepCheckOutForm from "./screens/AllStepCheckOutForm.jsx";
import CustomerOrderHistoryPage from "./screens/CustomerOrderHistoryPage.jsx";
import CustomerOrderListPage from "./screens/CustomerOrderListPage.jsx";
import CustomerServiceListDisplay from "./screens/CustomerServiceListDisplay.jsx";
import HomePage from "./screens/HomePage.jsx";
import LoginPage from "./screens/LoginPage.jsx";
import NotFoundPage from "./screens/NotFoundPage.jsx";
import ProfilePage from "./screens/ProfilePage.jsx";
import PromotionMockUpPage from "./screens/PromotionMockUpPage.jsx";
import RegisterPage from "./screens/RegisterPage.jsx";

const routes = [
  { path: "/", component: HomePage, access: "all" },
  { path: "/services-list", component: CustomerServiceListDisplay, access: "all" },
  { path: "/login", component: LoginPage, access: "public" },
  { path: "/register", component: RegisterPage, access: "public" },
  { path: "/profile", component: ProfilePage, access: "authenticated" },
  { path: "/admin", component: AdminDashboard, access: "admin" },
  { path: "/admin-category", component: AdminCategoryPage, access: "admin" },
  { path: "/admin-service", component: AdminServicePage, access: "admin" },
  { path: "/admin-category-create", component: AdminCreateCategory, access: "admin" },
  { path: "/admin-service-create", component: AdminCreateServicePage, access: "admin" },
  { path: "/admin-service-edit/:serviceId", component: AdminEditServicePage, access: "admin" },
  { path: "/admin-service-detail/:serviceId", component: AdminDetailServicePage, access: "admin" },
  { path: "/admin-category-detail/:categoryId", component: AdminDetailCategory, access: "admin" },
  { path: "/admin-category-edit/:categoryId", component: AdminEditCategory, access: "admin" },
  { path: "/admin-promotion-create", component: AdminCreatPromotionPage, access: "admin" },
  { path: "/admin-promotion", component: AdminPromotionPage, access: "admin" },
  { path: "/admin-promotion-edit/:promotionId", component: AdminEditPromoPage, access: "admin" },
  { path: "/admin-promotion-detail/:promotionId", component: AdminPromoDetailPage, access: "admin" },
  { path: "/checkout/:serviceId", component: AllStepCheckOutForm, access: "customer" },
  { path: "/customer-ordered-list/:userId", component: CustomerOrderListPage, access: "customer" },
  { path: "/customer-ordered-history/:userId", component: CustomerOrderHistoryPage, access: "customer" },
  { path: "/customer-promotion", component: PromotionMockUpPage, access: "customer" },
];

function matchRoute(pattern, pathname) {
  const expected = pattern.split("/").filter(Boolean);
  const actual = pathname.split("/").filter(Boolean);
  if (expected.length !== actual.length) return null;

  const params = {};
  for (let index = 0; index < expected.length; index += 1) {
    if (expected[index].startsWith(":")) {
      params[expected[index].slice(1)] = decodeURIComponent(actual[index]);
    } else if (expected[index] !== actual[index]) {
      return null;
    }
  }
  return params;
}

export default function NextRouteTree() {
  const pathname = usePathname() || "/";
  const { isAuthenticated } = useAuth();
  const role = isAuthenticated ? window.localStorage.getItem("role") : null;
  const route = routes.find((candidate) => {
    const allowed =
      candidate.access === "all" ||
      (candidate.access === "public" && !isAuthenticated) ||
      (candidate.access === "authenticated" && isAuthenticated) ||
      (candidate.access === "admin" && role === "admin") ||
      (candidate.access === "customer" && role === "customer");
    return allowed && matchRoute(candidate.path, pathname) !== null;
  });

  if (!route) return <NotFoundPage />;

  const Component = route.component;
  return (
    <RouteParamsProvider params={matchRoute(route.path, pathname)}>
      <Component />
    </RouteParamsProvider>
  );
}
