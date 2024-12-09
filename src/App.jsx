import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from './pages/Login';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from "./pages/AppLAyout";
// import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CityContext";
import { UserAuthenticationcontext } from "./Contexts/UserAuthenticationContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  return (
    <CitiesProvider>
    <UserAuthenticationcontext>  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="app" element={
        <ProtectedRoute>
          <AppLayout/>
          </ProtectedRoute>}>
         <Route index element={<Navigate replace to='cities'/>}/>
         <Route path="cities" element={<CityList />}/>
         <Route path="cities/:id" element={<City/>}/>
         <Route path="form" element={<Form/>}/>
         <Route path="countries" element={<CountryList  />}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </UserAuthenticationcontext>
    </CitiesProvider>
        )
}
export default App
