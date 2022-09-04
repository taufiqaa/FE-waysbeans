import Header from "../molecules/header";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../components/context/userContext"
// import CoffeeData from "../molecules/coffe-data";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';

function DetailProduct() {
  const navigate = useNavigate()
  const [state] = useContext(UserContext)
  
  const params = useParams();
  const id = params.id;

  let { data: product } = useQuery('productCache', async () => {
    const res = await API.get(`/product/${id}`)
    // console.log(res);
    return res.data.data
  })

  let sub_amount = product?.price 

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({
        sub_amount: sub_amount,

        product_id: parseInt(id),
      });
      console.log("sub amount " + sub_amount);
      console.log("a",body)
     
      const response = await API.post("/cart", body, config);    
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate('/')
  });

  useEffect(() => {
    if (state.isLogin === false || state.user.status === "admin") {
      navigate('/')
    }
  }, [state])


  return (
    <>
      <Header />
      <div className="detail-product-section">
        <div className="picture-detail-menu">
          <img
            className="picture-detail"
            src={product?.image}
            alt="drink"
          ></img>
        </div>
        <div className="right-detail-product">
          <div className="flavour-price-detail">
            <div className="flavour-detail">
              <h6>{product?.title}</h6>
            </div>
            <div className="price-detail">
              <h6>Stock: {product?.stock}</h6>
            </div>
          </div>
          <div className="description-detail">
            <article>{product?.description}</article>
          </div>
          <div className="total-cart-detail">
            <div className="total-detail">
              <div>
                <h6>Total</h6>
              </div>
              <div>
                <h6>Rp {product?.price}</h6>
              </div>
            </div>
            <Button variant="danger" className="add-cart"
            style={{backgroundColor:`#613D2B`, border: 'none'}} onClick={(e) => handleSubmit.mutate(e)}>
              Add Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DetailProduct;
