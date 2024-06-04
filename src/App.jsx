import React, { createContext, useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Register from './components/Register';
import { Toaster } from 'react-hot-toast';
import Movies from './components/Movies';
import Notfound from './components/Notfound';


// Create context for navbar reloading
const NavbarContext = createContext();

const App = () => {
  // State for navbar reloading
  const [reloadNavbar, setReloadNavbar] = useState(false);
  return (
    <NavbarContext.Provider value={{ reloadNavbar, setReloadNavbar }}>
      <>
        <Toaster />
        <Navbar />
        <Routes>
          <Route exact path='/' Component={Dashboard} />
          <Route exact path='/wishlist' Component={Wishlist} />
          <Route exact path='/login' Component={Login} />
          <Route exact path='/register' Component={Register} />
          <Route exact path='/movies/:wishlistId' Component={Movies} />
          <Route path='/*' Component={Notfound} />
          {/* <Route exact path='/repo-details/:username/:id' Component={Repo} />
          <Route exact path='/repo-stats/:username/:reponame/:repoId' Component={Repository} /> */}
        </Routes>
        <Footer />
      </>
    </NavbarContext.Provider>
  )
}

export default App
// Hook to use navbar context
export const useNavbarContext = () => useContext(NavbarContext);