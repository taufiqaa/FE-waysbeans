import Header from "../molecules/header";
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { API } from '../config/api';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"


export default function IncomeTransaction(){

  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)

  const [id, setId] = React.useState()
  const [user, setUser] = React.useState()
  const [product,setProduct] = React.useState([])
  const [transaction, setTransaction] = React.useState([])
  const [transactionPopUp, setTransactionPopUp] = React.useState(false);

  const getTransaction = async () => {
    try {
      const res = await API.get(`/transactions`);
      setTransaction(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getProduct = async () => {
  //   try {
  //     const res = await API.get(`/products`);
  //     setProduct(res.data.data.title);
  //     console.log("Product" + res)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getUser = async () => {
  //   try {
  //     const res = await API.get(`/user/${id}`);
  //     setUser(res.data.data.name);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    if (state.isLogin === false || state.user.status === "customer") {
      navigate('/')
    } else {
      getTransaction()
      // getUser()
      // getProduct()
    }
  },[])

    return(
        <>
        <Header />
        <section className="table">
        <h1>Income Transaction</h1>
        <Table bordered hover size="sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>Post Code</th>
          <th>Products Order</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transaction.map((data, index)=>(
        <tr>
          <td>{index+1}</td>
          <td>{data.user.name}</td>
          <td>{data.user.address}</td>
          <td>{data.user.post_code}</td>
          <td>{data.cart.map((data,index)=>(
            <h6 className="productIncome" key={index}>
            {data.product.title}, </h6>
          ))}</td>
          <td>{data.status}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    </section>
</>
    );
}