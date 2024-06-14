import { Routes,Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./pages/Homepage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import Pagenotfound from "./pages/Pagenotfound"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./components/routes/Private";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Orders from "./pages/admin/Orders";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Profile from "./pages/user/Profile";
import UserOrders from "./pages/user/UserOrders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchPage from "./pages/user/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<UserOrders />} /> 
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/products" element={<Products />} />
        </Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="*" element={<Pagenotfound/>}/>
      </Routes>
    </>
  )
}

export default App
