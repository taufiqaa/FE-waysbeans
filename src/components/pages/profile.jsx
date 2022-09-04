import { useState,useEffect  } from "react";
import Header from "../molecules/header";
import waysbeansLogo from "../../assets/NavBarIcon.svg";
import {API} from '../config/api'
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import dateFormat from 'dateformat'

export default function Profile() {

  const [state] = useContext(UserContext)


  const [transaction, setTransaction] = useState([])
  useEffect(()=>{
  const getTransaction = async()=>{
    try{
      const response = await API.get("/transactionId")
      setTransaction(response.data.data)
    }catch(error){
      console.error(error)
    }
  };  
     getTransaction()
  }, [setTransaction])

  return(
  <>
    <Header />
    <div className="transaction-section space-navbar">
      <div className="profile-container">
        <div className="profile-title">
          <h6>My Profile</h6>
        </div>
        <div className="detail-profile">
          <div className="picture-profile">
            <img
              className="picture-user"
              src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
            />
          </div>
          <div className="identity-profile">
            <div className="identity-name">
              <h6>Full Name</h6>
            </div>
            <div className="userName">
              <h6>{state.user.name}</h6>
            </div>
            <div className="identity-email">
              <h6>Email</h6>
            </div>
            <div className="userEmail">
              <h6>{state.user.email}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-container">
        <div className="transaction-title">
          <h6>My Transaction</h6>
        </div>
        {transaction.map((data,index)=>(
        <div className="detail-transaction">
            {data.cart.map((item, index)=>(
          <div className="box-order">
          <div className="left-container">
            <div className="main-order">
              <div className="picture-menu">
                <img
                  className="picture-menuPurchased"
                  src={item?.product?.image}
                  alt=""
                />
              </div>
              <div className="data-order">
                <div className="data-flavour">
                  <h6>{item?.product?.title}</h6>
                </div>
                <div className="orderTime">
                  <h6>{dateFormat(item?.updated_at, 'dddd, ')}{dateFormat(item?.updated_at, 'd mmmm yyyy')}</h6>
                </div>
                <div className="data-price">
                  <h6>{item?.product?.price}</h6>
                </div>
                <div className="data-quantity">
                  <h6>Qty : {item?.qty}</h6>
                </div>
                <div className="subTotal">
              <h6>Sub Total : {item?.sub_amount}</h6>
              </div>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="logo-transaction">
              <img className="logo-detail" src={waysbeansLogo} alt="logo" />
            </div>
            <div className="qr-transaction">
              <img
                className="qr-code"
                src="https://i.stack.imgur.com/XHWnX.png"
                alt=""
                />
            </div>
            <div className="status-order">
              <h6>{data.status}</h6>
            </div>
          </div>
        </div>
                ))}
        </div>
        ))}
      </div>
    </div>
  </>
  );
}
