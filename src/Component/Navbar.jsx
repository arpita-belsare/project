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
  const items = useStore(state => state.items)
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
    <div className="w-dvw	bg-zinc-100 fixed top-0 py-3 px-8 flex justify-between bg-slate-100 z-40 items-center">
      <Link to="/"><h1 className="text-4xl font-bold mx-8 text-rose-300">Shoping</h1> </Link>
      <div onClick={handleToggleBlur} className="	w-1/2 h-10">
      <div className="h-10 border-2 border-gray-300 border-2 flex border-gray-300" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mx-3 my-2 ">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8
           12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 
          40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        <input
          type="text"
          value={searchText}
          placeholder="Search Products...."
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setOnFocused(true)}
          className="w-full outline-none px-2 bg-zinc-100	"
        />
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 mx-3 my-2">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8
           12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 
          40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> */}
          </div>
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
      <nav className="flex w-auto mr-18">
        <ul className="flex w-full justify-end items-center">
          <li className="mx-4 text-purple-800 text-xs 	">
            <Link to="/seller"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-5 w-5 mx-6 my-2">
            <path d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z"/></svg>Become a seller</Link>
          </li>
          <li className="mx-4 text-purple-800	text-xs">
            <Link to="/services"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-5 mx-2 my-2 ">
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM105.8 229.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L216 328.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM160 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>Servies</Link>
          </li>
          <li className="mx-4 text-purple-800		 text-xs ">
            <Link to="/profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 mx-2 my-2">
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>Profile</Link>
          </li>
          <li className="mx-4 text-purple-800	 text-xs ">
            <Link to="/cartPage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4 my-2 ">
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>Cart ({items.length})
              {/* ({cartItems.length}) */}
              </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;















