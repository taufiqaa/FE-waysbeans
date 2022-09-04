import React from "react"
import NavbarIcon from "../../assets/NavBarIcon.svg";
import cartLogo from "../../assets/cart.svg"
import { Login, Register } from "./modal"
import Dropdown from "./dropdown"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { UserContext } from "../context/userContext"
import { useQuery } from 'react-query';
import { API } from '../config/api';

const photo = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"

export default function Header() {

  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)
  
  const [modalLogin, setModalLogin] = React.useState(false)
  const [modalRegister, setModalRegister] = React.useState(false)
  const [userDropdown, setUserDropdown] = React.useState(false)
  const [adminDropdown, setAdminDropdown] = React.useState(false)

  function switchModal() {
    if (modalLogin) {
      setModalLogin(false)
      setModalRegister(true)
    } else {
      setModalRegister(false)
      setModalLogin(true)
    }
  }

  function logOut() {
    setUserDropdown(false)
    setAdminDropdown(false)
    dispatch({ type: 'LOGOUT' })
  }

  const { data: cart } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts");
    return response.data.data;
  });

  React.useEffect(() => {
    if (state.isLogin === true) {
      setModalLogin(false)
      setModalRegister(false)
    }
  },[state])
  return (
    <header>
    <nav className="navbar">
      <img className="NavbarLogo" src={NavbarIcon} alt="logo"
      onClick={ () => navigate("/") }/>
         { state.isLogin ?
        <div className="loginCondition">
          { state.user.status === "customer" &&
          <div className="customerLogin">
            <img className="cartLogo" src={cartLogo}  alt="cart" onClick={()=>navigate("/cart")} />
            { (cart?.length >= 1) && <span>{cart?.length}</span> }
          </div>
           } 
         <img className="userPicture" src={photo} alt="user"
           onClick={() =>
            (state.user.status === "admin") ? setAdminDropdown(!adminDropdown) : setUserDropdown(!userDropdown)
           }
          />
        </div>
         :
        <div className="modalButton">
          <button className="LoginButton"
           onClick={ () => setModalLogin(true) }>Login</button>
          <button className="RegisterButton"
          onClick={ () => setModalRegister(true) }>Register</button>
        </div>
          } 
      </nav>

      <Login
      modalLogin={modalLogin}
      setModalLogin={setModalLogin}
      switchModal={switchModal}
      />

      <Register
      modalRegister={modalRegister}
      setModalRegister={setModalRegister}
      switchModal={switchModal}
      />

      <Dropdown
      adminDropdown={adminDropdown}
      userDropdown={userDropdown}
      logOut={logOut}
      />
    </header>
  )
}