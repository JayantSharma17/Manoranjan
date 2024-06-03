import React, { useEffect, useState } from 'react'
import './CSS/Navbar.css'
import logo from '../assets/film.png';
import user from '../assets/user.png';
import menu from '../assets/menu.png';
import { Link, useNavigate } from 'react-router-dom';
import { useNavbarContext } from '../App';
import { message } from '../Global';


const Navbar = () => {
  const [login, setLogin] = useState(false);
  // const { setReloadNavbar } = useNavbarContext(); // Access the context
  const navigate = useNavigate();
  const { reloadNavbar } = useNavbarContext(); // Access the context
  useEffect(() => {
    verify();
  }, [reloadNavbar])

  const verify = async () => {
    if (localStorage.getItem("token") === null) {
      setLogin(false);
    }
    else {
      setLogin(true)
    }
  }

  const [show, setShow] = useState(false);

    const openMenu = () => {
        const menu = document.getElementById("mobileNav");
        if (show === false) {
            // menu.style.display='flex';
            menu.classList.add('show');
        }
        else {
            // menu.style.display='none';
            menu.classList.remove('show');
        }
        setShow(!show);
    }
  return (
    <>
      <nav>
        <div id='logo'>
          <img src={logo} alt="" />
          <p>Manoranjan</p>

        </div>

        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/wishlist">WishList</Link></li>
          <li><Link to="footer">Connect</Link></li>
        </ul>

        <div id='profileButton'>
          {/* <img src={user} alt="" /> */}
          {login === false ? <button onClick={() => { navigate('/login') }}>Login</button> :
            <button onClick={() => { localStorage.clear(); setLogin(false); message('Logout successfully'); navigate('/login') }}>Logout</button>}
        </div>

        <button onClick={openMenu} id='menuButton'>
          <img src={menu} alt="" />
        </button>
      </nav>

      <div id='mobileNav'>
        <ul>
          {/* <div style={{ height: '1px', width: '100vw', backgroundColor: 'gray' }}></div> */}

          <Link onClick={openMenu} to="/"><li>Dashboard</li></Link>
          <div style={{ height: '1px', width: '100vw', backgroundColor: 'gray' }}></div>
          <Link onClick={openMenu} to="/wishlist"><li>WishList</li></Link>
          <div style={{ height: '1px', width: '100vw', backgroundColor: 'gray' }}></div>

          <Link onClick={openMenu} to="footer"><li>Connect</li></Link>
          <div style={{ height: '1px', width: '100vw', backgroundColor: 'gray' }}></div>

          <li>{login === false ? <button onClick={() => { navigate('/login') }}>Login</button> :
            <button onClick={() => {openMenu(); localStorage.clear(); setLogin(false); message('Logout successfully'); navigate('/login') }}>Logout</button>}</li>

        </ul>
      </div>
    </>
  )
}

export default Navbar