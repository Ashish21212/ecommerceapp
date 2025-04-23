import { Routes, Route } from "react-router-dom";

import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

import AdminLayout from "./components/admin-view/layout";
import AdminProducts from "./pages/admin-view/products";
import AdminDashBoard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";

import NotFound from "./pages/notFound";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";

import { checkAuth } from "./store/auth-slice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "./components/ui/skeleton";


const App = () => {


  const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(checkAuth())
      
  },[dispatch])

  if(isLoading){
    return(

      <Skeleton className="w-[800px] bg-black h-[600px]" />
    )


  }
  // console.log(isLoading,user)

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      
                        {/* *** routes for authentication */}
      <Routes>
        <Route path="/auth" element={
          <CheckAuth 
          isAuthenticated={isAuthenticated} 
          user={user}
          >
            <AuthLayout/>
          </CheckAuth>
          
           }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

                       {/* *** routes for AdminView */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
          </CheckAuth>
          
          }>
          <Route path="products" element={<AdminProducts />} />
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
                        
                        {/* *** routes for ShoppingView */}

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
          </CheckAuth>
          
          }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />

      </Routes>
    </div>
  );
};

export default App;
