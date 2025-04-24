import React, { useContext, useEffect, lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import ShoppingContext from "./providers/ShoppingContext";
import CardSection from "./Components/CardSection";
import Loading from "./Components/Loading";

const PageDetail = lazy(() => import("./Components/PageDetail"));
const AddToCard = lazy(() => import("./Components/AddToCard"));
const AddProduct = lazy(() => import("./Components/AddProduct"));
const Login = lazy(() => import("./Components/Login"));
const Register = lazy(() => import("./Components/Register"));
const Profile = lazy(() => import("./Components/Profile"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));
const About = lazy(() => import("./Components/About"));
const Privacy = lazy(() => import("./Components/Privacy"));
const Faq = lazy(() => import("./Components/Faq"));
const OrderPage = lazy(() => import("./Components/OrderPage"));
const AddressPage = lazy(() => import("./Components/AddressPage"));
const AdminDashboard = lazy(() => import("./Components/AdminDeshBoard"));
const AdminProductManage = lazy(() => import("./Components/AdminProductManage"));
const EditProduct = lazy(() => import("./Components/EditProduct"));
const ViewOrder = lazy(() => import("./Components/ViewOrder"));

const App = () => {
  const { setUser } = useContext(ShoppingContext);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setUser(JSON.parse(storedToken));
      } catch (error) {
        toast.error("something went wrong");
      }
    }

    setInitialLoading(false);
  }, [setUser]);

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<CardSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddToCard" element={<AddToCard />} />
          <Route path="/admin/products/listproduct" element={<AddProduct />} />
          <Route path="/product/:id" element={<PageDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/FAQ" element={<Faq />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/AddressPage" element={<AddressPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductManage />} />
          <Route path="/admin/products/:id/edit" element={<EditProduct />} />
          <Route path="/admin/order/:id" element={<ViewOrder />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
