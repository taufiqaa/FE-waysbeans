import React from "react";
import { useNavigate } from "react-router-dom";
// import coffeeData from "./coffe-data";
import { useQuery } from "react-query";
import { API } from "../config/api";


export default function CoffeeList() {

  const navigate = useNavigate();

  const { data: products } = useQuery('productsCache', async () => {
    const res = await API.get('/products')
    return res.data.data
  })
 
  const sendToDetail = (id) => {
    navigate("/detail-product/" + id);
  };

  return (
    <section className="coffeeSection">
      <div className="drink-list">
        {products?.map((data, index) => (
          <div className="list-coffee">
            <div className="coffeImage">
              <img
                alt="data"
                src={data?.image}
                id="mainImage"
                onClick={() => sendToDetail(data?.id)}
              />
            </div>
            <div className="CoffeDetail">
              <div className="CoffeeTitle">
                <h6>{data.title}</h6>
              </div>
              <h2>{data.price}</h2>
              <h2>Stock : {data.stock}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
