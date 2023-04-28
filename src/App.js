import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { ToastContainer } from "react-toastify";
import { Fragment } from "react";

const App = () => {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="auth" element={<Authentication/>}/>
          <Route path="checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
      <ToastContainer pauseOnHover autoClose={1000} className='toast-position'/>
    </Fragment>

  )

}

export default App;
