import { useEffect, useState } from "react";
import { PRODUCT_API } from "../Constant/apiConstant";
import axios from "axios";
// import "../CSS/ProductCards.css";
import { Link } from "react-router-dom";
// import star1 from "../Image/icons8-star-half-empty-48.png";
// import star2 from "../Image/icons8-star-48.png";
import useStore from "../Zustand/store";

const ProductCards = () => {
  const imageSize = { width: "150px", height: "150px" };
  const [products, setProducts] = useState([]);
  const { searchText } = useStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (searchText) {
      const normalizedSearchText = searchText.toLowerCase();
      const filteredData = products.filter((product) =>
        product.title.toLowerCase().includes(normalizedSearchText)
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(products);
    }
  }, [searchText, products]);

  const fetchData = async () => {
    try {
      const response = await axios.get(PRODUCT_API);
      setProducts(response.data);
      console.log(response.data)
      setFilteredProducts(response.data);
    } catch (error) {
      console.error(`Error in fetching product list`, error);
    }
  };

  return (
    <div className="w-full mt-2 border ">
      <h1 className="text-center">Our Product  </h1>
      <div className="flex flex-wrap justify-center px-4 py-14">
        {filteredProducts.length === 0 ? (
          <h1>No Products Found</h1>
        ) : (
          filteredProducts.map((product, index) => (
            <Link key={index} to={`/product/${product.id}`} className="mainCard">
              <div className="flex">
                <div>
                  <img src={product.image} alt={product.title} style={imageSize} />
                  <div className="product-info">
                    <h6>{product.title}</h6>
                    <h4>${product?.price}</h4>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCards;
