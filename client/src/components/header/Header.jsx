import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentWrapper from "../contentWrapper/ContentWrapper";
import {SlMenu} from 'react-icons/sl';
import {VscChromeClose} from 'react-icons/vsc';
import logo from '../../assets/logo.png';
import './style.css';
import { UserContext } from '../context/UserContext';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Header = () => {
  const location = useLocation();
  const[loggedIn, setLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const {setUserInfo} = useContext(UserContext);
  const token = localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isCreatePage = location.pathname === '/create';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${baseUrl}/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const user = await response.json();
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

  fetchData();
  },[token]);

  const handleClick = ()=>{
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserInfo(null);
  }

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""}`}>
        <ContentWrapper>

           <div onClick={()=>navigate('/')} className='logo'> 
             <img src={logo} alt=''/>
           </div>

           <div className='menuItems'>
            {!loggedIn && (
            <>
            {!isLoginPage && (<button onClick={() => handleNavigate('/login')} className='itemBtn'>
               Login
            </button>)}
            {!isRegisterPage && (<button onClick={() => handleNavigate('/register')} className='itemBtn'>
                Register
            </button>)}
            </>
            )}
            {loggedIn && (
             <>
            {!isCreatePage && (<button className='createPost' onClick={() => handleNavigate('/create')}>Create new post</button>)}
            <button onClick={handleClick} className='itemBtn'> 
                Logout
            </button>
            </> 
            )}
           </div>

           <div className='mobileMenuItems'>
            {mobileMenu ? (<VscChromeClose onClick={()=>setMobileMenu(!mobileMenu)}/>) : (<SlMenu onClick={()=>setMobileMenu(!mobileMenu)}/>)}
           </div>
        </ContentWrapper>
    </header>
  )
}

export default Header;
