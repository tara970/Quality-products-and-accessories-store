import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../style/categoryProducts.css";

function CategoryProducts() {
 
   const {categoryName} = useParams();
   const [products, setProducts] = useState([]);

   useEffect(()=>{
       axios.get('https://fakestoreapi.com/products').then((res)=>{
           const uniqueProducts = res.data.filter((p)=>
              p.category === categoryName
           );
           setProducts(uniqueProducts);
       })
   },[categoryName])
 
    return (
    <div className='category-products-container'>
        {
            products.map((p)=>(
                 <div key={p.id}>
                     <img src={p.image} alt="" />
                       <h3>{p.category}</h3>
                       <Link to={`/product/category/${p.id}`}><h>{p.title}</h></Link>
                       <p>{p.description}</p>
                       <h4>{p.price}</h4>
                 </div>
            ))
        }
    </div>
  )
}

export default CategoryProducts