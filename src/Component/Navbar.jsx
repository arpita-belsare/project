// import {Link} from "react-router-dom";
// import useCartStore from "../Zustand/store";

// const Navbar = () => {

//   const cartItemsCount = useCartStore((state) => state.items.length)

//   return (
//     <div className="w-dvw	fixed  py-4 px-6 flex justify-between bg-slate-950	z-40	 ">
//       <h1 className="text-xl font-bold	mx-8">Shoping</h1>
//       <nav className="flex w-full pl-4 " > 
//         <ul className="flex w-full flex justify-end items-center">
//           {/* <h1 className="underline 3xl">helllo</h1> */}
//           <li className="mx-4 text-white text-xl"> 
//             <Link to="/">Home</Link>{" "}
//           </li>
//           <li className="mx-4 text-white text-xl"> 
//             <Link to="/about">About Us</Link>{" "}
//           </li>
//           <li className="mx-4 text-white	text-xl">
//             <Link to="/contactUs">Contact Us</Link>{" "}
//           </li>
//           <li className="mx-4 text-white text-xl">
//             <Link to="/cartPage">Cart ({cartItemsCount}) </Link>{" "}
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import useStore from "../Zustand/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCT_API } from "../Constant/apiConstant";

const Navbar = () => {
  const { searchText, setSearchText } = useStore();
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setOnFocused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PRODUCT_API);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error in fetching product list`, error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setOnFocused(true);
    setSearchText(text); // Update global search text
    const normalizedText = text.toLowerCase();
    const suggestedData = products.filter((product) =>
      product.title.toLowerCase().startsWith(normalizedText)
    );
    setSuggestions(suggestedData.slice(0, 5));
  };

  const handleSuggestionClick = (productTitle) => {
    setSearchText(productTitle); // Update global search text
    handleSearch(productTitle);
  };

  const handleToggleBlur = () => {
    setOnFocused(false);
  };

  return (
    <div className="w-dvw fixed top-0 py-4 px-6 flex justify-between bg-slate-950 z-40">
      <h1 className="text-4xl font-bold mx-8 text-rose-300">Shoping</h1>
      <div onClick={handleToggleBlur} className="border-2 w-1/2 h-12 rounded-md">
        <input
          type="text"
          className="h-full w-full outline-none px-2.5"
          value={searchText}
          placeholder="Search Products...."
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setOnFocused(true)}
        />
        {focused && suggestions.length > 0 && (
          <div className="suggestions" style={{ position: "absolute", zIndex: 10 }}>
            {suggestions.map((product, index) => (
              <div
                key={index}
                style={{ border: "1px solid grey", cursor: "pointer" }}
                onClick={() => handleSuggestionClick(product.title)}
              >
                {product.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <nav className="flex w-auto">
        <ul className="flex w-full justify-end items-center">
          <li className="mx-4 text-white text-xl font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-4 text-white text-xl font-bold">
            <Link to="/about">About Us</Link>
          </li>
          <li className="mx-4 text-white text-xl font-bold">
            <Link to="/contactUs">Contact Us</Link>
          </li>
          <li className="mx-4 text-white text-xl font-bold">
            <Link to="/cartPage">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
