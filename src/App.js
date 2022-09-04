import React from "react"
import './components/App.css'
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from"./components/pages/home"
import DetailProduct from"./components/pages/detail-product"
import Cart from "./components/pages/cart"
import Profile from "./components/pages/profile"
import CoffeData from "./components/molecules/coffe-data"
import IncomeTransaction from "./components/pages/income-transaction"
import AddProduct from "./components/pages/product"
import UpdateProduct from './components/pages/update-product';
import { API, setAuthToken } from './components/config/api'
import ProductsList from './components/pages/product-list';
import { UserContext } from "./components/context/userContext"


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)
  
  React.useEffect(() => {
    if (state.isLogin === false) {
      navigate('/')
    } else {
      if (state.user.status === "admin") {
        navigate('/income')
      } else {
        navigate('/')
      }
    }
  }, [state])

  const checkUser = async () => {
    try {
      const res = await API.get('/check-auth')
      
      if (res.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = res.data.data
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    checkUser()
  }, [])

  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/detail-product/:id' element={<DetailProduct data={CoffeData}/>} />
    <Route path='/cart' element={<Cart />}/>
    <Route path='/profile' element={<Profile />} />
    <Route path='/income' element={<IncomeTransaction />} />
    <Route path='/add-product' element={<AddProduct />} />
    <Route path='/update-product/:id' element={<UpdateProduct />} />
    <Route path='/products-list' element={<ProductsList />} />
    
  </Routes>
  )
}
