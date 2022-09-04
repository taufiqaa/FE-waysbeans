import React from "react"
import Header from "../molecules/header"
import clip from "../../assets/clip.svg"
import { useState } from 'react';
import { API } from '../config/api';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';

export default function AddProduct() {

    const navigate = useNavigate()
    const [popUp, setPopUp] = React.useState(false);
    const [photoProduct, setPhotoProduct] = React.useState(<p>Photo Product</p>)
    const [preview, setPreview] = useState(null); //For image preview
    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
      title: '',
      price: '',
      image: '',
      stock: '',
      description: '',
    }); 
  
    // Handle change data on form
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      });
  
      // Create image url for preview
      if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setPhotoProduct(
          <p className="txt-black">{url}</p>
        )
      }
    };
  
    // Create function for handle insert product data with useMutation here ...
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };
  
        // Store data with FormData as object
        const formData = new FormData();
        formData.set('title', form.title);
        formData.set('price', form.price);
        formData.set('stock', form.stock);
        formData.set('description', form.description);
        formData.set('image', form.image[0], form.image[0].name);
  
        // Insert product data
        const response = await API.post('/product', formData, config);
        console.log(response);
  
        navigate('/add-product');
      } catch (error) {
        console.log(error);
      }
    });


  return (
    <>
    <Header />
        <section className="product-section space-navbar">
            <form
            onSubmit={ (e) => handleSubmit.mutate(e) }
            >
               <h2>Product</h2>
                <input className="titleProduct"
                 type="text"
                 id="title" name="title"
                 placeholder="Product's Name"
                 onChange={ handleChange }
                 required
                />
                <input className="stockProduct"
                 type="number"
                 id="stock" name="stock"
                 placeholder="Stock"
                 onChange={ handleChange }
                 required
                />
                  <input className="priceProduct"
                 type="number"
                 id="price" name="price"
                 placeholder="Price"
                 onChange={ handleChange }
                 required
                />
                <input className="descriptionProduct"
                 type="textarea"
                 id="description" name="description"
                 placeholder="Product's Description"
                 onChange={ handleChange }
                 required
                />
                <input
                type="file"
                name="image" id="photo-product"
                hidden
                onChange={ handleChange }
                required
                />
                <label className="productLabel" htmlFor="photo-product">
                  {photoProduct}
                  <img src={clip} alt="clip" className="clip" />
                </label>
                <div className="buttonDiv">
                  <button className="productButton" onClick={()=>setPopUp(true)}>Add Product</button>
                </div>
            </form>
            { preview && (
            <img className="input-product" src={preview} alt={preview} />
            )}
              {popUp && 
      <section className="popUpSection"
      onClick={ () => setPopUp(false) }
      >
    <div className="notification-background">
      <h5>Product Has Been Added Successfully</h5>
    </div>
      </section>
    }
        </section>
    </>
  )
}