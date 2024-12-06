import   { useEffect, useState } from "react";
import { PRODUCT_API } from "../Constant/apiConstant";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CSS/DetailsPage.css"
import useCartStore from "../Zustand/store";

const DetailsPage = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem)
  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`${PRODUCT_API}/${id}`); 
      setProduct(response?.data);
    } catch (error) {
      console.error(`Error in fetching single product`, error);
    }
  };

  const handleAddToCart = ()=>{
    addItem(product);
  }

  return (
    <div className="details-container">
      <h2>Product Details</h2>
      {product ? (
        <div>
          <img src={product.image} alt={product.title} />
         <div id="product-info">
         <h3> {product.title}</h3>
          <p> {product.description}</p>
          <p> {product.price} </p>
          <button  onClick={handleAddToCart} > Add to cart </button>
        </div>
         </div>
      ) : (
        <h1>Loading product details...</h1>
      )}
    </div>
  );
};

export default DetailsPage;