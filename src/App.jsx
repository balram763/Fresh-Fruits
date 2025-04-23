import React, { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ShoppingContext from "./providers/ShoppingContext";
import CardSection from "./Components/CardSection"; 
import Loading from "./Components/Loading";
import OrderPage from "./Components/OrderPage";
import AddressPage from "./Components/AddressPage";
import AdminDashboard from "./Components/AdminDeshBoard";
import AdminProductManage from "./Components/AdminProductManage";
import EditProduct from "./Components/EditProduct";
import ViewOrder from "./Components/ViewOrder";

const PageDetail = lazy(() => import("./Components/PageDetail"));
const AddToCard = lazy(() => import("./Components/AddToCard"));
const AddProduct = lazy(() => import("./Components/AddProduct"));
const Login = lazy(() => import("./Components/Login"));
const Register = lazy(() => import("./Components/Register"));
const Profile = lazy(() => import("./Components/Profile"));
const PageNotFound = lazy(()=> import("./Components/PageNotFound"))
const About = lazy(()=>import("./Components/About"))
const Privacy = lazy(()=>import("./Components/Privacy"))
const Faq = lazy(()=>import("./Components/Faq"))


const App = () => {
  const { setUser } = useContext(ShoppingContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setUser(JSON.parse(storedToken));
      } catch (error) {
        // console.error("Invalid token format:", error);
      }
    }
  }, [setUser]);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loading/>}>
        <Routes>
        <Route path="/" element={<CardSection />} /> 
        <Route path='/login' element={ <Login/> }/>
        <Route path='/user/profile' element={ <Profile/> }/>
        <Route path='/Register' element={ <Register/> }/>
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
