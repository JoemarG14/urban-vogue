import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Fragment, useEffect } from "react";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./store/user/user.action";
import { setCategories } from "./store/categories/categories.action";
import { userAuthStateListener, createUserFromAuth, getCollectionAndDocuments } from "./utils/firebase/firebase.utils";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscribe = userAuthStateListener((user) => {
          if(user) createUserFromAuth(user);
          dispatch(setUserInfo(user));
      });

      // useEffect with return will process the return method 
      // when component is unmounted.
      return unsubscribe;
  },[]);

  useEffect(() => {
      const getCategoriesMap = async () => {
          const categoryMap = await getCollectionAndDocuments();
          dispatch(setCategories(categoryMap))
      }

      getCategoriesMap();
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path="shop/*" element={<Shop/>}/>
          <Route path="auth" element={<Authentication/>}/>
          <Route path="checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
      <ToastContainer pauseOnHover autoClose={1000} className='toast-position'/>
    </Fragment>

  )

}

export default App;
